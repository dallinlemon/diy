import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BudgetMenuStoreService } from 'src/app/services/store/budget-menu.service';
import { CategoriesStoreService } from 'src/app/services/store/category-store.service';
import { RecordStoreService } from 'src/app/services/store/record-store.service';
import { BudgetMenu, BudgetMenuState } from 'src/app/store/actions/budget-menu.actions';
import { RootStoreInjection } from 'src/app/types/store.types';

@Component({
  selector: 'budget-side-view',
  templateUrl: './budget-side-view.html',
  styleUrls: ['./budget-side-view.css']
})
export class BudgetSideView implements OnInit {
  menu: BudgetMenu;
  constructor(
    private store: Store<RootStoreInjection>,
    private budgetMenuStoreService: BudgetMenuStoreService,
    private recordStoreService: RecordStoreService,
  ) {
    this.budgetMenuStoreService.menu$.subscribe((menuState: BudgetMenuState) => {
      this.menu = {...menuState?.menu};
    });
  }

  ngOnInit(): void {
  }

}
