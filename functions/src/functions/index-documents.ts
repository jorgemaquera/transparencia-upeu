import * as util from 'util';
import { Change, firestore } from 'firebase-functions';
import algoliasearch from 'algoliasearch';
import { isValidTimeStamp } from '../helpers';
import { storage } from '../admin';

const APP_ID = 'KNPR9UGH8Z';
const ADMIN_KEY = 'c3a19d766a7718e56717476e580caa4f';
const INDEX = 'prod_documents';
const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex(INDEX);

export async function addData(snapshot: firestore.QueryDocumentSnapshot) {
  try {
    const data = snapshot.data();
    const id = snapshot.id;
    const objectID = id;

    await index.saveObject({ ...groupObject(data), objectID, id });
  } catch (e) {
    console.error(util.format(e));
  }
}

export async function updateData(
  change: Change<firestore.QueryDocumentSnapshot>
) {
  try {
    const newData = change.after.data();
    const id = change.after.id;
    const objectID = id;

    await index.saveObject({ ...groupObject(newData), objectID, id });
  } catch (e) {
    console.error(util.format(e));
  }
}

export async function deleteData(snapshot: firestore.QueryDocumentSnapshot) {
  try {
    const objectID = snapshot.id;
    const bucket = storage().bucket();
    const filePath = `documents/${objectID}.pdf`;

    await bucket.file(filePath).delete();
    await index.deleteObject(objectID);
  } catch (e) {
    console.error(util.format(e));
  }
}

const groupObject = (serviceObj: any) => {
  //convert dates properties
  const keys = Object.keys(serviceObj);
  keys.map(key => {
    if (serviceObj[key] instanceof Date) {
      const time = serviceObj[key].getTime();
      serviceObj[key] = time;
    } else if (isValidTimeStamp(serviceObj[key])) {
      serviceObj[key] = serviceObj[key].toDate().getTime();
    }
  });

  return serviceObj;
};
