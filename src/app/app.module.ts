import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import { HttpClientModule, HttpClient} from '@angular/common/http';

import {MainService} from './service/main.service';
import { MainInterfaceComponent } from './main-interface/main-interface.component'

@NgModule({
  declarations: [
    AppComponent,
    MainInterfaceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [HttpClient, MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
