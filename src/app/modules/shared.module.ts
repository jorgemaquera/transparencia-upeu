import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RzAlgoliaFunctionsModule } from '@gabrielcosi/rz-algolia-functions';
import { environment } from 'src/environments/environment';

import { RzCell } from '../directives/rz-cell.directive';
import { RzRow } from '../directives/rz-row.directive';
import { RzComponentsModule } from './rz-components.module';

@NgModule({
  declarations: [RzCell, RzRow],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RzComponentsModule,
    RzAlgoliaFunctionsModule.forRoot({
      apiId: environment.algolia.appId,
      apiKey: environment.algolia.apiKey,
    }),
  ],
  exports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RzComponentsModule,
    RzAlgoliaFunctionsModule,
    RzCell,
    RzRow,
  ],
})
export class SharedModule {}
