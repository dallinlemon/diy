import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { GroupState, setGroups } from 'src/app/store/actions/groups.actions';
import { RootStoreInjection } from 'src/app/types/store.types';
import { GroupStoreService } from 'src/app/services/store/group-store.service';
import Group from '../../../models/group.model';
import { BaseComponent } from '../../base-component.ts/base-component';
@Component({
  selector: 'budget-main-view',
  templateUrl: './budget-main-view.html',
  styleUrls: ['./budget-main-view.css'],
})
export class BudgetMainView extends BaseComponent implements OnInit {
  public groups: Group[];

  constructor(
    private store: Store<RootStoreInjection>,
    private groupStoreService: GroupStoreService,
    private cdr: ChangeDetectorRef,
  ) {
    super();
    this.groups = this.groupStoreService.groups;
  }

  ngOnInit(): void {
    this.groupStoreService.groups$.subscribe((groupState: GroupState) => {
    this.groups = groupState.groups.filter(group => group.budget_id === 1);
  });
  }

  public addGroup() {
    this.groupStoreService.addGroup({
      id: 15,
      budget_id: 1,
      name: "Test Group 15",
      notes: "",
      created_at: new Date()
    } as Group);
    this.logger.info(BudgetMainView.name, 'addGroup', 'group added');
  }

  public updateGroup() {
    // this.GroupStoreService.updateGroup(group);
  }

  public deleteGroup() {
    this.logger.trace(BudgetMainView.name, 'deleteGroup', 'was called');
    this.groupStoreService.deleteCheckedGroups();
  }

}
