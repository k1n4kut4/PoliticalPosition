import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule  } from './app-material.module';
import { FlexModule } from '@angular/flex-layout';

/** components */ 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { QuestionComponent } from './components/question/question.component';
import { ResultsComponent } from './components/results/results.component';
import { HomeComponent } from './components/home/home.component';

/** services */ 
import { DataService } from './services/data.service';
//import { LocalStorageService, StorageService } from "./services/storage.service"; 

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    ResultsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FlexModule
  ],
  providers: [
    DataService, 
    //LocalStorageService,
    //{ provide: StorageService, useClass: LocalStorageService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
