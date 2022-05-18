import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetViewComponent } from './components/budget-view/budget-view.component';
import { ReadCsvComponent } from './components/read-csv-component/read-csv.component';
import { TopBarComponent } from './components/top-bar-component/top-bar.component';

const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: 'home', component: TopBarComponent, pathMatch: 'full' },
  { path: 'budget', component: BudgetViewComponent, pathMatch: 'full' },
  { path: 'upload', component: ReadCsvComponent , pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
