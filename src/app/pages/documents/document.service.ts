import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { DocumentData } from 'src/app/pages/documents/documents';
import {
  getDownloadURL,
  percentage,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private collectionPath = '/documents';

  documentsRef: AngularFirestoreCollection<DocumentData>;

  constructor(
    private db: AngularFirestore,
    private functions: Functions,
    private storage: Storage
  ) {
    this.documentsRef = db.collection(this.collectionPath);
  }

  async add(id: string, document: DocumentData): Promise<void> {
    return await this.documentsRef.doc(id).set(document);
  }

  async update(id: string, document: DocumentData): Promise<void> {
    return await this.documentsRef.doc(id).update(document);
  }

  async delete(id: string): Promise<void> {
    return await this.documentsRef.doc(id).delete();
  }

  async notifyInterestedParties(
    to: string[],
    name: string,
    creationDate: moment.Moment
  ) {
    const notify = httpsCallable(this.functions, 'notifyInterestedParties');
    return await notify({ to, name, creationDate: creationDate.toJSON() });
  }

  firestoreAutoId = (): string => {
    const CHARS =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let autoId = '';

    for (let i = 0; i < 20; i++) {
      autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    return autoId;
  };

  async uploadFile(file: any, id: string) {
    const storageRef = ref(this.storage, `documents/${id}.pdf`);

    await uploadBytes(storageRef, file);

    return {
      downloadURL: await getDownloadURL(storageRef),
      filename: file.name,
      path: `documents/${id}.pdf`,
    };
  }
}
