import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Group from '../../../../models/group.model';
import Category from '../../../../models/category.model';
import { GroupStoreService } from 'src/app/services/store/group-store.service';
import { CategoriesStoreService } from 'src/app/services/store/category-store.service';
import { RecordStoreService } from 'src/app/services/store/record-store.service';
import Record from '../../../../models/record.model';
import { BaseComponent } from 'src/app/components/base-component.ts/base-component';
import { Subject } from 'rxjs';
import { MonthSelectionStoreService } from 'src/app/services/store/month-selection-store.service';

@Component({
  selector: 'group-view',
  templateUrl: './group-view.html',
  styleUrls: ['./group-view.css']
})
export class GroupView extends BaseComponent implements OnInit {
  @Input() public group: Group;
  public checked: boolean;
  toggleSubject: Subject<boolean> = new Subject<boolean>();
  public assigned: number = 0;
  public activity: number = 0;
  public available: number = 0;
  show = true;
  categories: Category[] = [];
  records: Record[] = [];



  constructor(
    private groupStoreService: GroupStoreService,
    private categoryStoreService: CategoriesStoreService,
    private recordStoreService: RecordStoreService,
    private monthSelectionStoreService: MonthSelectionStoreService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.records = this.recordStoreService.records.filter((record: any) => this.categories.some(category => category.id === record.category_id));

    this.assigned = this.categories.reduce((total, currentCategory) => {
      return total + currentCategory.getAssigned(new Date());
    }, 0);

    this.categoryStoreService.categories$.subscribe(state => {
      this.logger.trace(`${GroupView.name} ${this.group.id}`, 'categoriesSubscription', 'was called');
      this.categories = state.categories.filter(category => category.group_id === this.group.id);
      this.updateAssigned(null);
    });
    this.recordStoreService.records$.subscribe(state => {
      this.logger.trace(`${GroupView.name} ${this.group.id}`, 'recordsSubscription', 'was called');
      this.records = state.records.filter(record => this.categories.some(category => category.id === record.category_id));
      this.activity = this.records.reduce((total, currentRecord) => {
        return total + currentRecord.amount;
      }, 0);
      this.updateAvailable();
    });
    this.monthSelectionStoreService.monthSelection$.subscribe(state => {
      this.logger.trace(`${GroupView.name} ${this.group.id}`, 'monthSelectionSubscription', 'was called');
      this.updateAssigned(null);
    });
  }

  toggleCategories() {
    this.show = !this.show;
  }

  updateAvailable(){
    this.available = this.assigned - this.activity;
  }

  updateAssigned(event: any){
    this.assigned = this.groupStoreService.getAssigned(this.group.id);
    this.updateAvailable();
  }


  checkboxClicked(_event: any){
    this.logger.trace(`${GroupView.name} ${this.group.id}`, 'checkboxClicked', `was called when value was ${this.checked}`);
    this.checked = !this.checked;
    this.groupStoreService.checkGroup(this.group.id, this.checked);
    this.emitToggleEvent();
  }

  childToggled(event: any) {
    this.logger.trace(`${GroupView.name} ${this.group.id}`, 'childToggled', `was called with value ${event}`);
    this.checked = false;
    this.groupStoreService.checkGroup(this.group.id, this.checked);
  }

  groupNameChanged(event: any) {
    this.groupStoreService.updateGroup({
      ...this.group,
      name: event.target.value
    } as Group);
  }

  emitToggleEvent() {
    this.toggleSubject.next(this.checked);
  }
}
