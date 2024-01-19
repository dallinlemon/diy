import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BaseComponent } from 'src/app/components/base-component.ts/base-component';
import { RecordStoreService } from 'src/app/services/store/record-store.service';
import { CategoriesStoreService } from 'src/app/services/store/category-store.service';
import { BudgetMenuStoreService } from 'src/app/services/store/budget-menu.service';
import { MonthSelectionStoreService } from 'src/app/services/store/month-selection-store.service';
import { AssignedColors, Messages } from 'src/app/constants/budget-top-bar.constants';
import Record from 'src/app/models/record.model';
import Category from 'src/app/models/category.model';

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
    this.monthSelectionStoreService.monthSelection$.subscribe((month: Date) => {
      this.logger.trace(`${BudgetTopBarView.name}`, 'monthSelectionStoreService', 'subscription was called');
      this.currentMonth = month;
      this.getActivity();
      this.getAssigned();
      this.calculateTotalAvailable();
    });
    this.recordStoreService.records$.subscribe((_records: Record[]) => {
      this.getActivity();
      this.calculateTotalAvailable();
    });
    this.categoriesStoreService.categories$.subscribe((_categories: Category[]) => {
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
