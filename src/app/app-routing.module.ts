import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: '',
    component: DefaultComponent,
    // children: defaultRoutes,
    loadChildren: () =>
      import('./pages/pages-routing.module').then(m => m.PagesRoutingModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
