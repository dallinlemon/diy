import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CategoryState } from 'src/app/store/actions/categories.actions';
import { BaseComponent } from 'src/app/components/base-component.ts/base-component';
import { RecordStoreService } from 'src/app/services/store/record-store.service';
import { CategoriesStoreService } from 'src/app/services/store/category-store.service';
import { BudgetMenuStoreService } from 'src/app/services/store/budget-menu.service';
import { MonthSelectionStoreService } from 'src/app/services/store/month-selection-store.service';
import { MonthSelectionState } from 'src/app/store/actions/month-selection.actions';
import { RecordState } from 'src/app/store/actions/records.actions';
import { AssignedColors, Messages } from 'src/app/constants/budget-top-bar.constants';

@Component({
  selector: 'budget-top-bar',
  templateUrl: './budget-top-bar.html',
  styleUrls: ['./budget-top-bar.css']
})
export class BudgetTopBarView extends BaseComponent implements OnInit {
  public currentMonth: Date;
  public totalAvailable: number = 0;
  public message: Messages = Messages.BalancedBudget;
  public switchIcon: boolean = true;
  public totalAssigned: number = 0;
  public totalActivity: number = 0;
  public backgroundColor: string = '';
  constructor(
    private currencyPipe: CurrencyPipe,
    private recordStoreService: RecordStoreService,
    private categoriesStoreService: CategoriesStoreService,
    private budgetMenuStoreService: BudgetMenuStoreService,
    private monthSelectionStoreService: MonthSelectionStoreService,
    ) {
      super();
  }

  ngOnInit(): void {
    this.monthSelectionStoreService.monthSelection$.subscribe((monthState: MonthSelectionState) => {
      this.logger.trace(`${BudgetTopBarView.name}`, 'monthSelectionStoreService', 'subscription was called');
      this.currentMonth = monthState.selectedDate;
      this.getActivity();
      this.getAssigned();
      this.calculateTotalAvailable();
    });
    this.recordStoreService.records$.subscribe((categoryState: RecordState) => {
      this.getActivity();
      this.calculateTotalAvailable();
    });
    this.categoriesStoreService.categories$.subscribe((categoryState: CategoryState) => {
      this.getAssigned();
      this.calculateTotalAvailable();
    });
  }

  public calculateTotalAvailable() {
    this.totalAvailable = this.totalAssigned - this.totalActivity;
    this.switchIcon = this.totalAvailable >= 0;
    this.setBackgroundColor();
  }

  public getAssigned(): void {
    this.totalAssigned = this.categoriesStoreService.categories.reduce((acc, category) => {
      return acc + this.categoriesStoreService.getAssigned(category.id);
    }, 0);
  }

  public getActivity(): void {
    this.totalActivity = this.recordStoreService.getTotalMonthlyActivity();
  }

  public setBackgroundColor(): void {
    if(this.totalAvailable < 0) {
      this.backgroundColor = AssignedColors.Red;
    } else if(this.totalAvailable === 0) {
      this.backgroundColor = AssignedColors.Grey;
    } else {
      this.backgroundColor = AssignedColors.Green;
    }
  }

}
