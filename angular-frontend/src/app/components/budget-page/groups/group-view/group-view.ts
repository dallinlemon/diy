import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Group from 'shared/models/group.model';
import Category from 'shared/models/category.model';
import categories from '../../../../mock-data/arrays/categories';
import { Observable, fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import mockRecords from 'src/app/mock-data/arrays/records';
import Record from 'shared/models/record.model';

@Component({
  selector: 'group-view',
  templateUrl: './group-view.html',
  styleUrls: ['./group-view.css']
})
export class GroupView implements OnInit {
  @Input() public group: Group | null = null;
  @Input() public checked: boolean = true;
  public assigned: number = 0;
  public activity: number = 0;
  public available: number = 0;
  show = true;
  categories: Category[] = [];
  records: Record[] = [];



  constructor() {
  }

  ngOnInit(): void {
    this.categories = categories.filter(category => category.group_id === this.group?.id);
    this.records = mockRecords.filter((record: any) => this.categories.some(category => category.id === record.category_id));
    this.activity = this.records.reduce((total, currentRecord) => {
      return total + currentRecord.amount;
    }, 0);
    this.assigned = this.categories.reduce((total, currentCategory) => {
      return total + currentCategory.assigned;
    }, 0);
  }

  toggleCategories() {
    this.show = !this.show;
  }

  updateAvailable(){
    this.available = this.assigned - this.activity;
    console.log('available', this.available);
  }

  updateAssigned(event: any){
    this.categories = categories.filter(category => category.group_id === this.group?.id);
    this.records = mockRecords.filter((record: any) => this.categories.some(category => category.id === record.category_id));
    this.activity = this.records.reduce((total, currentRecord) => {
      return total + currentRecord.amount;
    }, 0);
    this.assigned = this.categories.reduce((total, currentCategory) => {
      return total + currentCategory.assigned;
    }, 0);
    this.updateAvailable();
  }




}
