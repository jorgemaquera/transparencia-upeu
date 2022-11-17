import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { LayoutModule } from '../layout/layout.module';
import { MaterialModule } from '../modules/material.module';
import { SharedModule } from '../modules/shared.module';
import { DocumentsFiltersComponent } from './documents-filters/documents-filters.component';
import { DocumentsTableComponent } from './documents-table/documents-table.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    MatTableModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    MatSortModule,
  ],
  declarations: [
    LoginFormComponent,
    DocumentsTableComponent,
    DocumentsFiltersComponent,
  ],
  exports: [
    LoginFormComponent,
    DocumentsTableComponent,
    DocumentsFiltersComponent,
  ],
  entryComponents: [],
  providers: [],
})
export class ComponentsModule {}
