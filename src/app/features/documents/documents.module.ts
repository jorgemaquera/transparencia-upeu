import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from 'src/app/pages/documents/documents.component';
import { AddDocumentComponent } from 'src/app/pages/add-document/add-document.component';
import { MaterialModule } from 'src/app/modules/material.module';

@NgModule({
  declarations: [DocumentsComponent, AddDocumentComponent],
  imports: [CommonModule, DocumentsRoutingModule, MaterialModule],
})
export class DocumentsModule {}
