import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDocumentComponent } from './add-document/add-document.component';
import { DocumentsComponent } from './documents/documents.component';
import { SearchComponent } from './search/search.component';

export const pagesRoutes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'documents',
    component: DocumentsComponent,
  },
  {
    path: 'documents/add',
    component: AddDocumentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
