import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Category from '../../../models/category.model';
import Record from '../../../models/record.model';
import { CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { RootStoreInjection } from 'src/app/types/store.types';
import { CategoryState } from 'src/app/store/actions/categories.actions';
import { BaseComponent } from 'src/app/components/base-component.ts/base-component';
import { RecordStoreService } from 'src/app/services/store/record-store.service';
import { CategoriesStoreService } from 'src/app/services/store/category-store.service';
import { BudgetMenuStoreService } from 'src/app/services/store/budget-menu.service';
import { BudgetMenuTypes } from 'src/app/types/budget-menu-types.enum';
import { MonthSelectionStoreService } from 'src/app/services/store/month-selection-store.service';
import { MonthSelectionState } from 'src/app/store/actions/month-selection.actions';
import { RecordState } from 'src/app/store/actions/records.actions';

@Component({
  selector: 'category-view',
  templateUrl: './category-view.html',
  styleUrls: ['./category-view.css']
})
export class CategoryView extends BaseComponent implements OnInit {
  @Input() public category: Category;
  @Input() parentToggled: Observable<boolean>;
  @Output('recalculate') RecalculateEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output('childToggled') childToggledEvent: EventEmitter<void> = new EventEmitter<void>();
  private parentToggledSubscription: Subscription;
  checked:boolean;
  records: Record[] = [];
  assigned: number;
  activity: number = 0;
  available: number = 0;
  formattedAmount: any = 0;
  records$: Observable<RecordState>

  constructor(
    private currencyPipe: CurrencyPipe,
    private store: Store<RootStoreInjection>,
    private recordStoreService: RecordStoreService,
    private categoryStoreService: CategoriesStoreService,
    private budgetMenuStoreService: BudgetMenuStoreService,
    private monthSelectionStoreService: MonthSelectionStoreService,
    ) {
      super();
  }

  ngOnInit(): void {
    if (this.category) {
      this.categoryStoreService.categories$.subscribe((categoriesState: CategoryState) => {
        this.updateAssignedDisplay();
      });
      this.updateAvailable();
      this.parentToggledSubscription = this.parentToggled.subscribe((checked: boolean) => {
        this.logger.trace(`${CategoryView.name} ${this.category.id}`, 'parentToggled', 'subscription was called');
        this.checked = checked;
      });
      this.monthSelectionStoreService.monthSelection$.subscribe((monthState: MonthSelectionState) => {
        this.logger.trace(`${CategoryView.name} ${this.category.id}`, 'monthSelectionStoreService', 'subscription was called');
        this.updateAssignedDisplay();
        this.updateActivity();
      });
      this.records$ = this.store.select('recordsReducer');
      this.records$.subscribe((categoryState: RecordState) => {
        this.records = this.categoryStoreService.getMonthsRecords(this.category.id);
        this.updateActivity();
      });
    }
  }

  updateActivity() {
    this.logger.trace(`${CategoryView.name} ${this.category.id}`, 'updateActivity', 'event was called');
    this.activity = this.categoryStoreService.getMonthsRecords(this.category.id).reduce((total, currentRecord) => {
      return total + currentRecord.amount;
    }, 0);
    this.updateAvailable();
  }

  updateAvailable(){
    this.available = this.assigned - this.activity;
    // console.log('available updated', this.available);
  }
  updateAssignedDisplay() {
    try {
      this.assigned = this.categoryStoreService.getAssigned(this.category.id);
      this.updateAvailable();
    } catch (error) {
      this.logger.error(CategoryView.name, `${this.category.id}`, `updateAssignedDisplay ${this.category.id}`, error);
    }
  }
  onAssignedChanged(event: any){
    this.logger.trace(`${CategoryView.name} ${this.category.id}`, 'updateAssigned', `was called with value ${event.target.value}`);
    const input = event.target.value.replace(/[^0-9.]/g, '');
    const assigned = Number.parseFloat(input);
    this.categoryStoreService.setAssigned(this.category.id, assigned);
  }
  triggerRecalculate() {
    this.RecalculateEvent.emit();
  }

  checkboxClicked(_event: any){
    this.logger.trace(`${CategoryView.name} ${this.category.id}`, 'checkboxClicked', `was called when value was ${this.checked}`);
    this.checked = !this.checked;
    this.childToggledEvent.emit();
    // this.GroupStoreService.checkGroup(this.group.id, this.checked);
  }

  categoryNameChanged(event: any) {
    this.logger.trace(`${CategoryView.name} ${this.category.id}`, 'categoryNameChanged', `was called with value ${event.target.value}`);

    const temp = new Category(this.category.id, this.category.group_id, this.category.name, this.category.assigned, this.category.created_at, this.category.notes);
    temp.getAssigned(new Date);
    this.categoryStoreService.updateCategories({
      ...this.category,
      name: event.target.value
    } as Category);
  }

  availablePressed(event: any) {
    this.logger.trace(`${CategoryView.name} ${this.category.id}`, 'availablePressed', `was called with value`);
    // const input = event.target.value.replace(/[^0-9.]/g, '');
    this.budgetMenuStoreService.setMenu({
      ...this.budgetMenuStoreService.menu,
      type: BudgetMenuTypes.CATEGORY_AVAILABLE,
      id: this.category.id
    });
  }
}
