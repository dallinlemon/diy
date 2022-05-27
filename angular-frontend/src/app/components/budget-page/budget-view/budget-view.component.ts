import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import categories from 'src/app/mock-data/arrays/categories';
import groups from 'src/app/mock-data/arrays/groups';
import { setCategories } from 'src/app/store/actions/categories.actions';
import { setGroups } from 'src/app/store/actions/groups.actions';
import { setRecords } from 'src/app/store/actions/records.actions';
import { RootStoreInjection } from 'src/app/types/store.types';
import mockRecords from 'src/app/mock-data/arrays/records';

@Component({
  selector: 'app-budget-view',
  templateUrl: './budget-view.component.html',
  styleUrls: ['./budget-view.component.css']
})
export class BudgetViewComponent implements OnInit {

  constructor(private store: Store<RootStoreInjection>) { }

  ngOnInit(): void {
    this.store.dispatch(setCategories({ categories: categories }));
    this.store.dispatch(setGroups({ groups: groups }));
    this.store.dispatch(setRecords({ records: mockRecords }));
  }

}
