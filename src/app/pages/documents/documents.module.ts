import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { MaterialModule } from '../../modules/material.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DocumentsComponent } from './documents.component';
import { AddDocumentComponent } from './add-document/add-document.component';
@NgModule({
  imports: [
    MaterialModule,
    SharedModule,
    LayoutModule,
    ComponentsModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
  ],
  declarations: [DocumentsComponent, AddDocumentComponent],
  exports: [],

  providers: [],
})
export class DocumentsModule {}
