import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import Group from "../../models/group.model";
import { BaseService } from "../base-service";
import { CategoriesStoreService } from "./category-store.service";
import { RecordStoreService } from "./record-store.service";
import Record from "../../models/record.model";

@Injectable({
  providedIn: 'root'
})
export class GroupStoreService extends BaseService {
  groups: Group[] =[];
  groups$: Subject<Group[]>
  checkedGroups: Map<number, boolean> = new Map<number, boolean>();

  constructor(
    private categoriesStoreService: CategoriesStoreService,
    private recordStoreService: RecordStoreService,
    ) {
    super();
    this.groups$ = new Subject();
  }

  public addGroup(group: Group) {
    this.logger.trace(GroupStoreService.name, 'addGroup', 'Setting Groups with new record');
    this.groups.push(new Group(group.id, group.budget_id, group.name, group.show, group.created_at, group.notes));
    this.update();
  }

  public updateGroup(group: Group) {
    this.logger.trace(GroupStoreService.name, 'updateGroup', `was called for group ${group.id}`);
    const index = this.groups.findIndex(element => element.id === group.id);
    if(!index) return;
    this.groups.splice(index, 1, new Group(group.id, group.budget_id, group.name, group.show, group.created_at, group.notes));
    this.update();
  }

  public deleteGroup(groupId: number) {
    this.logger.trace(GroupStoreService.name, 'deleteGroup', `was called for group ${groupId}`);
    this.checkedGroups.delete(groupId);
    this.groups = this.groups.filter(element => {
      return element.id !== groupId;
    })
    this.update();
  }

  public resetGroups() {
    this.logger.trace(GroupStoreService.name, 'resetGroups', 'was called');
    this.groups = [];
    this.logger.info(GroupStoreService.name, 'resetGroups', 'groups store was reset');
    this.update();
  }

  public checkGroup(groupId: number, checked: boolean) {
    this.logger.trace(GroupStoreService.name, 'checkGroup', `was called with ${groupId} and ${checked}`);
    this.checkedGroups.set(groupId, checked);
    this.logger.debug(GroupStoreService.name, 'checkGroup', `checked groups -> `, this.checkedGroups);
  }

  public deleteCheckedGroups() {
    this.logger.trace(GroupStoreService.name, 'deleteCheckedGroups', 'was called');
    this.logger.debug(GroupStoreService.name, 'deleteCheckedGroups', `checked groups -> `, this.checkedGroups);

    this.groups = this.groups.filter(element => {
      if(!this.checkedGroups.has(element?.id)) return true;
      this.checkedGroups.delete(element?.id);
      return false;
    });
    this.logger.info(GroupStoreService.name, 'deleteCheckedGroups', 'checked groups removed from store');
    this.logger.debug(GroupStoreService.name, 'deleteCheckedGroups', `checked groups ->`, this.checkedGroups);
    this.update();
  }

  /**
    * return total amount assigned to this group
  */
  public getAssigned(groupId: number): number {
    this.logger.trace(GroupStoreService.name, 'getAssigned', `was called with ${groupId}`);
    const categories = this.categoriesStoreService.categories.filter(category => category.group_id === groupId);
    let assigned: number = 0;
    categories.forEach(category => {
      assigned += this.categoriesStoreService.getAssigned(category.id);
    });
    return assigned;
  }

  public getMonthsRecords(groupId: number): Record[] {
    this.logger.trace(CategoriesStoreService.name, 'getMonthsRecords', `was called for ${groupId}`);
    let monthsRecords: Record[] = [];
      this.categoriesStoreService.categories.forEach(category => {
        if (category.group_id === groupId) {
          this.recordStoreService.records.forEach(record => {
            this.addRecord(this.categoriesStoreService.getMonthsRecords(category.id), monthsRecords);
          });
        }
      });
    return monthsRecords;
  }

  private addRecord(records: Record[], monthArray: Record[]): void {
    this.logger.trace(GroupStoreService.name, 'addRecord', `was called for ${records}`);
    records.forEach(record => {
      if(!monthArray.find(element => element.id === record.id)) {
        monthArray.push(record);
      }
    });
  }

  /**
    * Update observers of the groups
  */
  private update() {
    this.groups$.next(this.groups);
  }
}
