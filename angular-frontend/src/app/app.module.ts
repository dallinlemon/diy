import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadFileComponent } from './components/read-file-component/read-file.component';
import { ReadCsvComponent } from './components/read-csv-component/read-csv.component';
import { DisplayCsvItemComponent } from './components/display-csv-item/display-csv-item.component';
import { TopBarComponent } from './components/top-bar-component/top-bar.component';
import { SideBarComponent } from './components/side-bar-component/side-bar.component';
import { BudgetViewComponent } from './components/budget-page/budget-view/budget-view.component';
import { BudgetMainView } from './components/budget-page/budget-main-view/budget-main-view';
import { BudgetSideView } from './components/budget-side-view/budget-side-view';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupView } from './components/budget-page/groups/group-view/group-view';
import { Arrow } from './components/arrow/arrow.component';
import { CategoryView } from './components/budget-page/groups/category-view/category-view';
import { CurrencyPipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { rootStore } from './store/store';
import { CategoryAvailableMenu } from './components/budget-side-view/category-avaiable-menu/category-available-menu';

@NgModule({
  declarations: [
    AppComponent,
    ReadFileComponent,
    ReadCsvComponent,
    DisplayCsvItemComponent,
    TopBarComponent,
    SideBarComponent,
    BudgetViewComponent,
    BudgetMainView,
    BudgetSideView,
    GroupView,
    Arrow,
    CategoryView,
    CategoryAvailableMenu
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(rootStore)
  ],
  providers: [
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
