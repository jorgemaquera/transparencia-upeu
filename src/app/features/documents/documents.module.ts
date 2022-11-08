import { NgModule } from '@angular/core';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from 'src/app/pages/documents/documents.component';
import { AddDocumentComponent } from 'src/app/pages/add-document/add-document.component';
import { SharedModule } from 'src/app/modules/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [DocumentsComponent, AddDocumentComponent],
  imports: [
    DocumentsRoutingModule,
    SharedModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
  ],
})
export class DocumentsModule {}
