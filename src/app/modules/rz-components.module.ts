import { NgModule } from '@angular/core';

import {
  RzAlertModule,
  RzCardFormModule,
  RzChipsSelectModule,
  RzConfirmModalModule,
  RzDataTableModule,
  RzDataTableFirestoreModule,
  RzDataTableAlgoliaModule,
  RzDatepickerModule,
  RzFancyRadioModule,
  RzFiltersModule,
  RzFormModalModule,
  RzGlobalLoaderModalModule,
  RzNavMenuModule,
  RzSelectModule,
  RzSnackBarModule,
  RzTopTabsModule,
  RzUploaderModule,
  RzVerticalTabsModule,
} from '@gabrielcosi/rz-components';

@NgModule({
  imports: [
    RzAlertModule,
    RzCardFormModule,
    RzChipsSelectModule,
    RzConfirmModalModule,
    RzDataTableModule,
    RzDataTableFirestoreModule,
    RzDataTableAlgoliaModule,
    RzDatepickerModule,
    RzFancyRadioModule,
    RzFiltersModule,
    RzFormModalModule,
    RzGlobalLoaderModalModule,
    RzNavMenuModule,
    RzSelectModule,
    RzSnackBarModule,
    RzTopTabsModule,
    RzUploaderModule,
    RzVerticalTabsModule,
  ],
  declarations: [],
  exports: [
    RzAlertModule,
    RzCardFormModule,
    RzChipsSelectModule,
    RzConfirmModalModule,
    RzDataTableModule,
    RzDataTableFirestoreModule,
    RzDataTableAlgoliaModule,
    RzDatepickerModule,

    RzFancyRadioModule,
    RzFiltersModule,
    RzFormModalModule,
    RzGlobalLoaderModalModule,
    RzNavMenuModule,

    RzSelectModule,
    RzSnackBarModule,
    RzTopTabsModule,
    RzUploaderModule,
    RzVerticalTabsModule,
  ],
  entryComponents: [],
  providers: [],
})
export class RzComponentsModule {}
