import { Component, OnInit } from '@angular/core';
import { parse as parseOFX } from 'ofx-js';

@Component({
  selector: 'app-read-file-component',
  templateUrl: './read-file-component.component.html',
  styleUrls: ['./read-file-component.component.css']
})
export class ReadFileComponentComponent implements OnInit {
  output: string = 'works';
  
  constructor() { }
  
  ngOnInit(): void {
  }


  readFile() {
    this.output = 'ran function';

    // const ofxString = this.readFile('/Users/james/Downloads/test.ofx');
    // parseOFX(ofxString).then((result: any) => {
    //   this.output = result.bankAccounts[0].transactions[0].amount;
    // });
  }
}
