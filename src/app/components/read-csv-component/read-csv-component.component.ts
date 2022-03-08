import { Component, OnInit } from '@angular/core';
import { parse as papaParse } from 'papaparse';
import CsvItem from '../../models/csvItem';

@Component({
  selector: 'app-read-csv-component',
  templateUrl: './read-csv-component.component.html',
  styleUrls: ['./read-csv-component.component.css'],
})
export class ReadCsvComponentComponent implements OnInit {
  output: CsvItem[] = [];

  fileToUpload: File | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  readFile() {
    if (!this.fileToUpload) return;

    papaParse(this.fileToUpload, {
      complete: (results: any) => {
        console.log('Got ' + results.data.length + ' rows');
        this.output = results.data;
      },
      header: true,
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
