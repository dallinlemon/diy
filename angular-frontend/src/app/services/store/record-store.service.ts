import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { trace } from "console";
import { Observable } from "rxjs";
import Record from "../../models/record.model";
import { RecordState, resetRecords, setRecords } from "src/app/store/actions/records.actions";
import { RootStoreInjection } from "src/app/types/store.types";
import { BaseService } from "../base-service";

@Injectable({
  providedIn: 'root'
})
export class RecordStoreService extends BaseService {
  records: Record[] =[];
  records$: Observable<RecordState>
  checkedRecords: Map<number, boolean> = new Map<number, boolean>();

  constructor(private store: Store<RootStoreInjection>) {
    super();
    this.records$ = store.select('recordsReducer');
    this.records$.subscribe((Records: RecordState) => {
      this.logger.debug(RecordStoreService.name, 'subscription', 'Records -> ', Records);
      this.records = Records.records;
    });
  }

  public addRecord(record: Record) {
    this.logger.trace(RecordStoreService.name, 'addRecord', 'Setting Records with new record');
    this.setRecords([...this.records, record]);
  }

  public updateRecord(record: Record) {
    this.logger.trace(RecordStoreService.name, 'updateRecord', `was called for record ${record.id}`);
    this.records.forEach((element, index) => {
      if (element.id === record.id) {
        this.records[index] = record;
      }
    });
    this.setRecords(this.records);
  }

  public deleteRecord(recordId: number) {
    this.logger.trace(RecordStoreService.name, 'deleteRecord', `was called for record ${recordId}`);
    const updatedRecords: Record[] = this.records.filter(element => {
      return element.id !== recordId;
    })
    this.setRecords(updatedRecords);
  }

  public resetRecords() {
    this.logger.trace(RecordStoreService.name, 'resetRecords', 'was called');
    this.store.dispatch(resetRecords());
    this.logger.info(RecordStoreService.name, 'resetRecords', 'records were reset');
  }
  public setRecords(records: Record[]) {
    this.store.dispatch(setRecords({ records: records }));
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

    this.checkedRecords.forEach((value, key) => {
      if (!value) return;
      this.logger.trace(RecordStoreService.name, 'deleteCheckedRecords', `deleting record ${key}`);
      this.deleteRecord(key);
      this.checkedRecords.delete(key);
    });
    this.logger.info(RecordStoreService.name, 'deleteCheckedRecords', 'checked record removed from store');
    this.logger.debug(RecordStoreService.name, 'deleteCheckedRecords', `checked record -> `, this.checkedRecords);
  }
}
