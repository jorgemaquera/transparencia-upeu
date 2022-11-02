import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { SearchComponent } from './pages/search/search.component';

import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [{ path: '', component: SearchComponent }],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'documents',
    component: DefaultComponent,
    loadChildren: () =>
      import('./features/documents/documents.module').then(
        m => m.DocumentsModule
      ),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
