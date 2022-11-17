import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { DocumentsData } from 'src/app/pages/documents/documents';

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

  async add(id: string, document: DocumentsData): Promise<any> {
    return await this.documentsRef.doc(id).set(document);
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
