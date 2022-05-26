import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { GroupState, setGroups } from 'src/app/store/actions/groups.actions';
import { RootStoreInjection } from 'src/app/types/store.types';
import { GroupStoreService } from 'src/app/services/store/group-store.service';
import groups from 'src/app/mock-data/arrays/groups';
import Group from 'shared/models/group.model';
@Component({
  selector: 'budget-main-view',
  templateUrl: './budget-main-view.html',
  styleUrls: ['./budget-main-view.css'],
})
export class BudgetMainView implements OnInit {
  public groups: Group[];

  constructor(
    private store: Store<RootStoreInjection>,
    private GroupStoreService: GroupStoreService,
    private cdr: ChangeDetectorRef,
  ) {
    // this.groups = this.GroupStoreService.groups;
    this.groups = groups;
  }

  ngOnInit(): void {
    this.GroupStoreService.groups$.subscribe((groupState: GroupState) => {
    this.groups = groupState.groups.filter(group => group.budget_id === 1);
    // this.cdr.detectChanges();
    console.log('group saved from service', this.groups);
  });
    console.log(this.groups);
  }

}
