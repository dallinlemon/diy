import { Component, OnInit } from '@angular/core';
import { BankRecord } from 'src/app/models/records/bank-record.model';
import { IngestRecordsService } from 'src/app/services/ingest-records/ingest-records.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { RecordTypes } from 'src/app/types/record-types.enum';

@Component({
  selector: 'app-read-csv-component',
  templateUrl: './read-csv.component.html',
  styleUrls: ['./read-csv.component.css'],
})
export class ReadCsvComponent implements OnInit {
  output: BankRecord[] = [];

  fileToUpload: File | null = null;

  constructor( 
    private Log: LoggerService,
    private ingestRecords: IngestRecordsService,
  ) { }

  ngOnInit(): void {
  }

  async readFile() {
    if (!this.fileToUpload) return;
    try {
      this.Log.trace('Reading file');
      this.output = await this.ingestRecords.ReadCsv(this.fileToUpload, RecordTypes.AMERICAFIRST);
    } catch (error: any) {
      this.Log.error(error.message);
    }
    
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
