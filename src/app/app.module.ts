import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadFileComponentComponent } from './components/read-file-component/read-file-component.component';
import { ReadCsvComponentComponent } from './components/read-csv-component/read-csv-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadFileComponentComponent,
    ReadCsvComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
