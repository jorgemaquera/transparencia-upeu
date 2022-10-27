import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDocumentComponent } from './add-document/add-document.component';
import { SearchComponent } from './components/search/search.component';
import { DocumentsComponent } from './documents/documents.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'documents',
    component: DocumentsComponent,
  },
  {
    path: 'add-document',
    component: AddDocumentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
