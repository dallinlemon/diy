import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import Record from "../../models/record.model";
import { BaseService } from "../base-service";
import { MonthSelectionStoreService } from "./month-selection-store.service";

@Injectable({
  providedIn: 'root'
})
export class RecordStoreService extends BaseService {
  records: Record[] =[];
  records$: Subject<Record[]>
  checkedRecords: Map<number, boolean> = new Map<number, boolean>();

  constructor(
    private monthStoreService: MonthSelectionStoreService
  ) {
    super();
  }

  public addRecord(record: Record) {
    this.logger.trace(RecordStoreService.name, 'addRecord', 'Setting Records with new record');
    this.records.push(record);
    this.update();
  }

  public updateRecord(record: Record) {
    this.logger.trace(RecordStoreService.name, 'updateRecord', `was called for record ${record.id}`);
    const index = this.records.findIndex(element => element.id === record.id);
    if(!index) return;
    this.records.splice(index, 1, Record.init(record));
    this.update();
  }

  public deleteRecord(recordId: number) {
    this.logger.trace(RecordStoreService.name, 'deleteRecord', `was called for record ${recordId}`);
    this.records = this.records.filter(element => {
      if(!element) return false;
      return element.id !== recordId;
    })
    this.update();
  }

  public resetRecords() {
    this.logger.trace(RecordStoreService.name, 'resetRecords', 'was called');
    this.records = [];
    this.logger.info(RecordStoreService.name, 'resetRecords', 'records were reset');
  }

  public setRecords(records: Record[]) {
    this.records = records.map(element => Record.init(element));
    this.logger.info(RecordStoreService.name, 'setRecords', 'Record store was set');
  }

  public checkRecord(recordId: number, checked: boolean) {
    this.logger.trace(RecordStoreService.name, 'checkRecord', `was called with ${recordId} and ${checked}`);
    this.checkedRecords.set(recordId, checked);
    this.logger.debug(RecordStoreService.name, 'checkRecord', `checked Records -> `, this.checkedRecords);
  }

  public deleteCheckedRecords() {
    this.logger.trace(RecordStoreService.name, 'deleteCheckedRecords', 'was called');
    this.logger.debug(RecordStoreService.name, 'deleteCheckedRecords', `checked records -> `, this.checkedRecords);

    this.records.forEach(currentRecord => {
      if (!currentRecord) return;
      const checked = this.checkedRecords.get(currentRecord.id);
      if(checked) {
        this.logger.trace(RecordStoreService.name, 'deleteCheckedRecords', `deleting record ${currentRecord.id}`);
        const index = this.records.findIndex(record => currentRecord.id === record.id);
        this.records.splice(index, 1);
        this.checkedRecords.delete(currentRecord.id);
      }
    });
    this.logger.info(RecordStoreService.name, 'deleteCheckedRecords', 'checked record removed from store');
    this.logger.debug(RecordStoreService.name, 'deleteCheckedRecords', `checked record -> `, this.checkedRecords);
    this.update();
  }

  public getTotalMonthlyActivity() {
    this.logger.trace(RecordStoreService.name, 'getTotalMonthlyActivity', 'was called');
    const month: number = this.monthStoreService.selectedDate.getMonth() + 1;
    const totalActivity: number = this.records.reduce((acc, curr) => {
      return month === curr.date.getMonth() + 1 ? acc + curr.amount : acc;
    }, 0);
    this.logger.info(RecordStoreService.name, 'getTotalMonthlyActivity', `total monthly activity -> ${totalActivity}`);
    return totalActivity;
  }

  /**
    * Updates Subscribers to records$
  */
  public update() {
    this.records$.next(this.records);
  }
}
