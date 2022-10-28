import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './pages/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocumentsComponent } from './pages/documents/documents.component';
import { MatSliderModule } from '@angular/material/slider';
import { LoginComponent } from './pages/login/login.component';
import { AddDocumentComponent } from './pages/add-document/add-document.component';
import { MaterialModule } from './modules/material.module';
import { HeaderComponent } from './layout/header/header.component';
import { DefaultComponent } from './layout/default/default.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentsComponent,
    SearchComponent,
    LoginComponent,
    AddDocumentComponent,
    HeaderComponent,
    DefaultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
