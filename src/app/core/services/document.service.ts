import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { DocumentsData } from '../interfaces/documents_data.interface';
import { Observable } from 'rxjs';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private collectionPath = '/documents';

  documentsRef: AngularFirestoreCollection<DocumentsData>;

  constructor(private db: AngularFirestore, private functions: Functions) {
    this.documentsRef = db.collection(this.collectionPath);
  }

  getAll(): Observable<DocumentsData[]> {
    this.documentsRef.ref.where('deprecated', '==', false);
    return this.documentsRef
      .snapshotChanges()
      .pipe(map(e => e.map(d => d.payload.doc.data())));
  }

  async add(document: DocumentsData): Promise<any> {
    return await this.documentsRef.add(document);
  }

  async notifyInterestedParties(
    to: string[],
    name: string,
    creationDate: moment.Moment
  ) {
    const notify = httpsCallable(this.functions, 'notifyInterestedParties');
    return await notify({ to, name, creationDate: creationDate.toJSON() });
  }
}
