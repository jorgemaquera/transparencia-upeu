import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDocumentComponent } from 'src/app/pages/documents/add-document/add-document.component';
import { DocumentsComponent } from 'src/app/pages/documents/documents.component';
import { AuthGuard } from '../auth/auth.guard';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'documents/add',
    component: AddDocumentComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
