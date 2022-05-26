import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import Group from "shared/models/group.model";
import { GroupState, resetGroups, setGroups } from "src/app/store/actions/groups.actions";
import { RootStoreInjection } from "src/app/types/store.types";

@Injectable({
  providedIn: 'root'
})
export class GroupStoreService {
  groups: Group[] =[];
  groups$: Observable<GroupState>
  constructor(private store: Store<RootStoreInjection>) {
    this.groups$ = store.select('groupsReducer');
    this.groups$.subscribe((Groups: GroupState) => {
      this.groups = Groups.groups;
    });
  }

  public addGroup(group: Group) {
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
}
