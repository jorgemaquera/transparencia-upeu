import { https, firestore } from 'firebase-functions';

import { sendMail } from './functions/send-mail';
import { addData, updateData, deleteData } from './functions/index-documents';

export const notifyInterestedParties = https.onCall((data: any, context: any) =>
  sendMail(data, context)
);

export const addDocument = firestore
  .document('documents/{fileId}')
  .onCreate(snapshot => addData(snapshot));

export const updateDocument = firestore
  .document('documents/{fileId}')
  .onUpdate(change => updateData(change));

export const deleteDocument = firestore
  .document('documents/{fileId}')
  .onDelete(snapshot => deleteData(snapshot));
