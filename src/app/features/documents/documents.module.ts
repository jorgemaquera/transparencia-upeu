import { NgModule } from '@angular/core';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from 'src/app/pages/documents/documents.component';
import { AddDocumentComponent } from 'src/app/pages/add-document/add-document.component';
import { SharedModule } from 'src/app/modules/shared.module';

@NgModule({
  declarations: [DocumentsComponent, AddDocumentComponent],
  imports: [DocumentsRoutingModule, SharedModule],
})
export class DocumentsModule {}
