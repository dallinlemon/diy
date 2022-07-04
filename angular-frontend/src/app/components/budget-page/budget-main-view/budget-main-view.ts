import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { GroupState } from 'src/app/store/actions/groups.actions';
import { RootStoreInjection } from 'src/app/types/store.types';
import { GroupStoreService } from 'src/app/services/store/group-store.service';
import Group from '../../../models/group.model';
import { BaseComponent } from '../../base-component.ts/base-component';
import { Subject } from 'rxjs';
@Component({
  selector: 'budget-main-view',
  templateUrl: './budget-main-view.html',
  styleUrls: ['./budget-main-view.css'],
})
export class BudgetMainView extends BaseComponent implements OnInit {
  public createButtonPressed: Subject<null> = new Subject();
  public groups: Group[];
  public popup: boolean = false;
  constructor(
    private store: Store<RootStoreInjection>,
    private groupStoreService: GroupStoreService,
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    this.groupStoreService.groups$.subscribe((groupState: GroupState) => {
    this.groups = groupState.groups.filter(group => group.budget_id === 1);
  });
  }

  public addGroup() {
    // this.groupStoreService.addGroup(new Group(15, 1, "Test Group 15", true, new Date(), ''));
    // this.logger.info(BudgetMainView.name, 'addGroup', 'group added');
    this.emitCreateEvent();
  }

  public updateGroup() {
    // this.GroupStoreService.updateGroup(group);
  }

  public deleteGroup() {
    this.logger.trace(BudgetMainView.name, 'deleteGroup', 'was called');
    this.groupStoreService.deleteCheckedGroups();
  }

  emitCreateEvent() {
    this.createButtonPressed.next(null);
  }

}
