import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Group from 'shared/models/group.model';
import Category from 'shared/models/category.model';
import { GroupStoreService } from 'src/app/services/store/group-store.service';
import { CategoriesStoreService } from 'src/app/services/store/category-store.service';
import { RecordStoreService } from 'src/app/services/store/record-store.service';
import Record from 'shared/models/record.model';
import { BaseComponent } from 'src/app/components/base-component.ts/base-component';
import { Subject } from 'rxjs';

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
    private GroupStoreService: GroupStoreService,
    private CategoryStoreService: CategoriesStoreService,
    private RecordStoreService: RecordStoreService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.records = this.RecordStoreService.records.filter((record: any) => this.categories.some(category => category.id === record.category_id));

    this.assigned = this.categories.reduce((total, currentCategory) => {
      return total + currentCategory.assigned;
    }, 0);

    this.CategoryStoreService.categories$.subscribe(state => {
      this.logger.trace(`${GroupView.name} ${this.group.id}`, 'categoriesSubscription', 'was called');
      this.categories = state.categories.filter(category => category.group_id === this.group.id);
      this.updateAssigned(null);
    });
    this.RecordStoreService.records$.subscribe(state => {
      this.logger.trace(`${GroupView.name} ${this.group.id}`, 'recordsSubscription', 'was called');
      this.records = state.records.filter(record => this.categories.some(category => category.id === record.category_id));
      this.activity = this.records.reduce((total, currentRecord) => {
        return total + currentRecord.amount;
      }, 0);
      this.updateAvailable();
    });
  }

  toggleCategories() {
    this.show = !this.show;
  }

  updateAvailable(){
    this.available = this.assigned - this.activity;
  }

  updateAssigned(event: any){
    this.assigned = this.categories.reduce((total, currentCategory) => {
      return total + currentCategory.assigned;
    }, 0);
    this.updateAvailable();
  }


  checkboxClicked(_event: any){
    this.logger.trace(`${GroupView.name} ${this.group.id}`, 'checkboxClicked', `was called when value was ${this.checked}`);
    this.checked = !this.checked;
    this.GroupStoreService.checkGroup(this.group.id, this.checked);
    this.emitToggleEvent();
  }

  childToggled(event: any) {
    this.logger.trace(`${GroupView.name} ${this.group.id}`, 'childToggled', `was called with value ${event}`);
    this.checked = false;
    this.GroupStoreService.checkGroup(this.group.id, this.checked);
  }

  emitToggleEvent() {
    this.toggleSubject.next(this.checked);
  }
}
