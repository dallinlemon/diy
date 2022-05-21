import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadFileComponent } from './components/read-file-component/read-file.component';
import { ReadCsvComponent } from './components/read-csv-component/read-csv.component';
import { DisplayCsvItemComponent } from './components/display-csv-item/display-csv-item.component';
import { TopBarComponent } from './components/top-bar-component/top-bar.component';
import { SideBarComponent } from './components/side-bar-component/side-bar.component';
import { BudgetViewComponent } from './components/budget-view/budget-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadFileComponent,
    ReadCsvComponent,
    DisplayCsvItemComponent,
    TopBarComponent,
    SideBarComponent,
    BudgetViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
