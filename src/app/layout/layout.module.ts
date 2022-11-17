import { NgModule } from '@angular/core';
import { MaterialModule } from '../modules/material.module';
import { SharedModule } from '../modules/shared.module';

import { DefaultComponent } from './default/default.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DefaultComponent, HeaderComponent],
  imports: [MaterialModule, SharedModule, RouterModule],
  exports: [DefaultComponent, HeaderComponent],
})
export class LayoutModule {}
