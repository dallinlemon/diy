import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Category from 'shared/models/category.model';
import mockRecords from 'src/app/mock-data/arrays/records';
import Record from 'shared/models/record.model';
import { CurrencyPipe } from '@angular/common';
import { Action, ActionReducer, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootStoreInjection } from 'src/app/types/store.types';
import { CategoryState } from 'src/app/store/actions/categories.actions';

@Component({
  selector: 'category-view',
  templateUrl: './category-view.html',
  styleUrls: ['./category-view.css']
})
export class CategoryView implements OnInit {
  @Input() public category: Category | null = null;
  @Output('recalculate') RecalculateEvent: EventEmitter<any> = new EventEmitter<any>();
  records: Record[] = [];
  assigned: number = 5;
  activity: number = 0;
  available: number = 0;
  formattedAmount: any = 0;
  categoryState$: Observable<CategoryState>

  constructor(
    private currencyPipe: CurrencyPipe,
    private store: Store<RootStoreInjection>
    ) {
      this.categoryState$ = store.select('categoriesReducer');
      this.categoryState$.subscribe(this.onCategoryChanged);
  }

  ngOnInit(): void {
    if (this.category) {
      this.records = mockRecords.filter((record: any) => record.category_id === this.category?.id);

      this.activity = this.records.reduce((total, currentRecord) => {
        return total + currentRecord.amount;
      }, 0);
      this.assigned = this.category.assigned;
      this.updateAvailable();
    }
  }

  updateAvailable(){
    this.available = this.assigned - this.activity;
    console.log('available', this.available);
  }

  updateAssigned(event: any){
    console.log('called with', event.target.value);
    let input = event.target.value.substring(1, event.target.value.length - 1);
    input = input.replace(/,/g, '');
    this.assigned = Number.parseFloat(input);
    this.updateAvailable();
    this.triggerRecalculate();
  }
  triggerRecalculate() {
    this.RecalculateEvent.emit();
  }
  onCategoryChanged(categories: CategoryState) {
    console.log('Category saved', categories);
  }
}
