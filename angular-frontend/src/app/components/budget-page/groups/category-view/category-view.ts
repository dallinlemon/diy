import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Category from 'shared/models/category.model';
import Record from 'shared/models/record.model';
import { CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { RootStoreInjection } from 'src/app/types/store.types';
import { CategoryState } from 'src/app/store/actions/categories.actions';
import { BaseComponent } from 'src/app/components/base-component.ts/base-component';
import { RecordStoreService } from 'src/app/services/store/record-store.service';
import { CategoriesStoreService } from 'src/app/services/store/category-store.service';

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
  assigned: number = 0;
  activity: number = 0;
  available: number = 0;
  formattedAmount: any = 0;
  categoryState$: Observable<CategoryState>

  constructor(
    private currencyPipe: CurrencyPipe,
    private store: Store<RootStoreInjection>,
    private recordStoreService: RecordStoreService,
    private categoryStoreService: CategoriesStoreService,
    ) {
      super();
      this.categoryState$ = store.select('categoriesReducer');
      this.categoryState$.subscribe((categoryState: CategoryState) => {

      });
  }

  ngOnInit(): void {
    if (this.category) {
      this.records = this.recordStoreService.records.filter((record: any) => record.category_id === this.category?.id);
      this.activity = this.records.reduce((total, currentRecord) => {
        return total + currentRecord.amount;
      }, 0);
      this.assigned = this.category.assigned;
      this.updateAvailable();
      this.parentToggledSubscription = this.parentToggled.subscribe((checked: boolean) => {
        this.logger.trace(`${CategoryView.name} ${this.category.id}`, 'parentToggled', 'subscription was called');
        this.checked = checked;
      });
    }
  }

  updateAvailable(){
    this.available = this.assigned - this.activity;
    // console.log('available updated', this.available);
  }

  updateAssigned(event: any){
    this.logger.trace(`${CategoryView.name} ${this.category.id}`, 'updateAssigned', `was called with value ${event.target.value}`);
    let input = event.target.value.substring(1, event.target.value.length - 1);
    input = input.replace(/,/g, '');
    this.assigned = Number.parseFloat(input);
    this.categoryStoreService.updateCategories({...this.category, assigned: this.assigned} as Category);
    this.updateAvailable();
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
}
