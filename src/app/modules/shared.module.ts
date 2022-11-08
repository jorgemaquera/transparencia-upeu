import { NgModule } from '@angular/core';
import { DocumentsTableComponent } from 'src/app/components/documents/documents-table/documents-table.component';
import { DocumentsFiltersComponent } from 'src/app/components/documents/documents-filters/documents-filters.component';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DocumentsTableComponent, DocumentsFiltersComponent],
  imports: [CommonModule, MaterialModule],
  exports: [
    DocumentsTableComponent,
    DocumentsFiltersComponent,
    CommonModule,
    MaterialModule,
  ],
})
export class SharedModule {}
