import { NgModule } from '@angular/core';
import { SharedModule } from '../modules/shared.module';
import { MaterialModule } from '../modules/material.module';

// modules
import { ComponentsModule } from '../components/components.module';
import { LayoutModule } from '@angular/cdk/layout';
import { DocumentsModule } from './documents/documents.module';
import { SearchModule } from './search/search.module';

@NgModule({
  imports: [
    MaterialModule,
    SharedModule,
    LayoutModule,
    ComponentsModule,
    DocumentsModule,
    SearchModule,
  ],
  declarations: [],
  exports: [DocumentsModule, SearchModule],
  entryComponents: [],
  providers: [],
})
export class PagesModule {}
