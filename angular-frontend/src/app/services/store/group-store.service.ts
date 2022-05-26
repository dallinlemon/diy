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
  checkedGroups: number[] = [];
  constructor(private store: Store<RootStoreInjection>) {
    super();
    this.groups$ = store.select('groupsReducer');
    this.groups$.subscribe((Groups: GroupState) => {
      this.groups = Groups.groups;
    });
  }

  public addGroup(group: Group) {
    this.logger.trace(GroupStoreService.name, 'addGroup', 'Setting Groups');
    this.setGroups([...this.groups, group]);
  }

  public updateGroup(group: Group) {
    this.groups.forEach((element, index) => {
      if (element.id === group.id) {
        this.groups[index] = group;
      }
    });
    this.setGroups(this.groups);
  }

  public deleteGroup(group: Group) {
    const updatedGroups: Group[] = this.groups.filter(element => {
      return element.id !== group.id;
    })
    this.setGroups(updatedGroups);
  }

  public resetGroups() {
    this.store.dispatch(resetGroups());
    console.log('groups reset');
  }
  public setGroups(groups: Group[]) {
    this.store.dispatch(setGroups({ groups: groups }));
    console.log('groups set', groups);
  }

  public checkGroup(groupId: number) {
    this.checkedGroups.push(groupId);
    console.log('checked groups', this.checkedGroups);
  }

  public uncheckGroup(groupId: number) {
    this.checkedGroups = this.checkedGroups.filter(element => {
      return element !== groupId;
    });
    console.log('unchecked groups', this.checkedGroups);
  }

  public deleteCheckedGroups() {
    this.logger.debug(GroupStoreService.name, 'deleteCheckedGroups', 'deleting checked groups');
    // TODO - delete checked groups
  }
}
