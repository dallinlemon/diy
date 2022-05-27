import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import Group from "shared/models/group.model";
import { GroupState, resetGroups, setGroups } from "src/app/store/actions/groups.actions";
import { RootStoreInjection } from "src/app/types/store.types";
import { BaseService } from "../base-service";

@Injectable({
  providedIn: 'root'
})
export class GroupStoreService extends BaseService {
  groups: Group[] =[];
  groups$: Observable<GroupState>
  checkedGroups: Map<number, boolean> = new Map<number, boolean>();

  constructor(private store: Store<RootStoreInjection>) {
    super();
    this.groups$ = store.select('groupsReducer');
    this.groups$.subscribe((Groups: GroupState) => {
      this.logger.trace(GroupStoreService.name, 'subscription', 'was called');
      this.groups = Groups.groups;
    });
  }

  public addGroup(group: Group) {
    this.logger.trace(GroupStoreService.name, 'addGroup', 'Setting Groups with new record');
    this.setGroups([...this.groups, group]);
  }

  public updateGroup(group: Group) {
    this.logger.trace(GroupStoreService.name, 'updateGroup', `was called for group ${group.id}`);
    this.groups.forEach((element, index) => {
      if (element.id === group.id) {
        this.groups[index] = group;
      }
    });
    this.setGroups(this.groups);
  }

  public deleteGroup(groupId: number) {
    this.logger.trace(GroupStoreService.name, 'deleteGroup', `was called for group ${groupId}`);
    const updatedGroups: Group[] = this.groups.filter(element => {
      return element.id !== groupId;
    })
    this.setGroups(updatedGroups);
  }

  public resetGroups() {
    this.logger.trace(GroupStoreService.name, 'resetGroups', 'was called');
    this.store.dispatch(resetGroups());
    this.logger.info(GroupStoreService.name, 'resetGroups', 'groups store was reset');
  }
  public setGroups(groups: Group[]) {
    this.logger.trace(GroupStoreService.name, 'setGroups', 'was called');
    this.store.dispatch(setGroups({ groups: groups }));
    this.logger.info(GroupStoreService.name, 'setGroups', 'groups store was set');
  }

  public checkGroup(groupId: number, checked: boolean) {
    this.logger.trace(GroupStoreService.name, 'checkGroup', `was called with ${groupId} and ${checked}`);
    this.checkedGroups.set(groupId, checked);
    this.logger.debug(GroupStoreService.name, 'checkGroup', `checked groups -> `, this.checkedGroups);
  }

  public deleteCheckedGroups() {
    this.logger.trace(GroupStoreService.name, 'deleteCheckedGroups', 'was called');
    this.logger.debug(GroupStoreService.name, 'deleteCheckedGroups', `checked groups -> `, this.checkedGroups);

    this.checkedGroups.forEach((value, key) => {
      if (!value) return;
      this.logger.trace(GroupStoreService.name, 'deleteCheckedGroups', `deleting group ${key}`);
      this.deleteGroup(key);
      this.checkedGroups.delete(key);

    });
    this.logger.info(GroupStoreService.name, 'deleteCheckedGroups', 'checked groups removed from store');
    this.logger.debug(GroupStoreService.name, 'deleteCheckedGroups', `checked groups ->`, this.checkedGroups);
  }
}
