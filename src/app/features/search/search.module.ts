import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/modules/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from 'src/app/pages/search/search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [SearchRoutingModule, SharedModule],
})
export class SearchModule {}
