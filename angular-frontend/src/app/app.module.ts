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
import { GroupView } from './components/budget-page/group-view/group-view';
import { Arrow } from './components/arrow/arrow.component';
import { CategoryView } from './components/budget-page/category-view/category-view';
import { CurrencyPipe } from '@angular/common';
import { rootStore } from './store/store';
import { CategoryAvailableMenu } from './components/budget-side-view/category-available-menu/category-available-menu';
import { MonthSelectorMainComponent } from './components/budget-page/month-selector/month-selector-main/month-selector-main';
import { AddGroupPopup } from './components/add-group-popup/add-group-popup';
import { FormsModule } from '@angular/forms';
import { CategoryMenu } from './components/budget-side-view/category-menu/category-menu';
import { BudgetTopBarView } from './components/budget-page/budget-top-bar/budget-top-bar';
import { AddCategoryPopup } from './components/add-category-popup/add-category-popup';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';

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
    CategoryAvailableMenu,
    CategoryMenu,
    MonthSelectorMainComponent,
    AddGroupPopup,
    BudgetTopBarView,
    AddCategoryPopup,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
  ],
  providers: [
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
