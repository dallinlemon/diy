import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import categories from 'src/app/mock-data/arrays/categories';
import { CategoryState, setCategories } from 'src/app/store/actions/categories.actions';
import { GroupState } from 'src/app/store/actions/groups.actions';
import { RootStoreInjection } from 'src/app/types/store.types';
import mockGroups from '../../../models/groups';

@Component({
  selector: 'budget-main-view',
  templateUrl: './budget-main-view.html',
  styleUrls: ['./budget-main-view.css'],
})
export class BudgetMainView implements OnInit {
  public groups: any[];
  groups$: Observable<GroupState>

  constructor(private store: Store<RootStoreInjection>) {
    this.groups$ = store.select('groupsReducer');
    this.groups = mockGroups.filter(group => group.budget_id === 1);
    this.groups$.subscribe(this.onGroupSaved);
  }

  ngOnInit(): void {
    console.log(this.groups);
  }

  testRedux() {
    this.store.dispatch(setCategories({ categories: categories }));
  }

  onGroupSaved(groups: GroupState) {
    console.log('group saved', groups);
  }

}
