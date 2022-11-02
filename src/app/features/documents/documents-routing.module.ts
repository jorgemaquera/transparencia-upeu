import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDocumentComponent } from 'src/app/pages/add-document/add-document.component';
import { DocumentsComponent } from 'src/app/pages/documents/documents.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentsComponent,
  },
  {
    path: 'add',
    component: AddDocumentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsRoutingModule {}
