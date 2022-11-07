import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './pages/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { HeaderComponent } from './layout/header/header.component';
import { DefaultComponent } from './layout/default/default.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth, AuthModule } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { DocumentsModule } from './features/documents/documents.module';
import { DocumentsTableComponent } from './components/documents/documents-table/documents-table.component';
import { DocumentsFiltersComponent } from './components/documents/documents-filters/documents-filters.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    DefaultComponent,
    DocumentsTableComponent,
    DocumentsFiltersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AuthModule,
    DocumentsModule,
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
