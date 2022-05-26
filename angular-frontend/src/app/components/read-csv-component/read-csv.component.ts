import { Component, OnInit } from '@angular/core';
import { BankRecord } from 'src/app/models/records/bank-record.model';
import { IngestRecordsService } from 'src/app/services/ingest-records/ingest-records.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { RecordTypes } from 'src/app/types/record-types.enum';
import { BaseComponent } from '../base-component.ts/base-component';

@Component({
  selector: 'app-read-csv-component',
  templateUrl: './read-csv.component.html',
  styleUrls: ['./read-csv.component.css'],
})
export class ReadCsvComponent extends BaseComponent implements OnInit {
  output: BankRecord[] = [];

  fileToUpload: File | null = null;

  constructor(
    private ingestRecords: IngestRecordsService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  async readFile() {
    if (!this.fileToUpload) return;
    try {
      this.logger.trace(ReadCsvComponent.name, 'readFile', 'Reading file...');
      this.output = await this.ingestRecords.ReadCsv(this.fileToUpload, RecordTypes.AMERICAFIRST);
    } catch (error: any) {
      this.logger.error(ReadCsvComponent.name, 'readFile', error.message, error.stack);
    }

  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
