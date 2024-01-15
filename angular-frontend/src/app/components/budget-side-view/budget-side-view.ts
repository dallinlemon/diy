import { Component, OnInit } from '@angular/core';
import { BudgetMenuStoreService } from 'src/app/services/store/budget-menu.service';
import { CategoriesStoreService } from 'src/app/services/store/category-store.service';
import { RecordStoreService } from 'src/app/services/store/record-store.service';
import { BudgetMenu, BudgetMenuState } from 'src/app/store/actions/budget-menu.actions';
import { BudgetMenuTypes } from 'src/app/types/budget-menu-types.enum';
import { RootStoreInjection } from 'src/app/types/store.types';
import { BaseComponent } from '../base-component.ts/base-component';

@Component({
  selector: 'budget-side-view',
  templateUrl: './budget-side-view.html',
  styleUrls: ['./budget-side-view.css']
})
export class BudgetSideView extends BaseComponent implements OnInit {
  menu: BudgetMenu;
  menuNames = BudgetMenuTypes;
  constructor(
    private budgetMenuStoreService: BudgetMenuStoreService,
    private recordStoreService: RecordStoreService,
  ) {
    super();
    this.budgetMenuStoreService.menu$.subscribe((menuState: BudgetMenuState) => {
      this.menu = {...menuState?.menu};
    });
  }

  ngOnInit(): void {
    this.logger.trace(BudgetSideView.name, 'onInit', "Was called");
  }

}
