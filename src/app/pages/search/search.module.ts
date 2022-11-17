import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/modules/shared.module';
import { SearchComponent } from 'src/app/pages/search/search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [SharedModule, ComponentsModule, MaterialModule],
})
export class SearchModule {}
