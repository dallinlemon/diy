import { Injectable } from '@angular/core';
import { parse as papaParse } from 'papaparse';
import AmericaFirstRecord from 'src/app/models/records/america-first-record.model';
import WellsFargoRecord from 'src/app/models/records/wellsfargo-bank-model';
import { WellsFargo } from 'src/app/models/records/wf';
import { BankRecord } from '../../models/records/bank-record.model';
import { RecordTypes } from '../../types/record-types.enum';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class IngestRecordsService {

  constructor(
    private Log: LoggerService,
  ) { }

  /**
   * Maps the results of using papaParse on AmericaFirstRecord to a BankRecord array.
   * @param rawRecords results of papaParse on AmericaFirstRecord csv file.
   * @returns array of BankRecord objects.
   */
  private mapAmericaFirstToBankRecord(rawRecords: AmericaFirstRecord[]): BankRecord[] {
    const bankRecords: BankRecord[] = [];
    rawRecords.map((rawRecord: AmericaFirstRecord) => {
      const bankRecord: BankRecord = new BankRecord(
        rawRecord.Date,
        rawRecord.Description,
        rawRecord.Debit,
        rawRecord.Credit,
      );
      
      bankRecords.push(bankRecord);
    });
    return bankRecords;
  }


  private mapWellsFargoToBankRecord(rawRecords: WellsFargoRecord[]): WellsFargo[] {
    const wellsFargo: WellsFargo[] = [];
    rawRecords.map((rawRecord: WellsFargoRecord) => {
      const fargoWells: WellsFargo = new WellsFargo(
        rawRecord.Date,
        rawRecord.Amount,
        rawRecord.Star,
        rawRecord.Blank,
        rawRecord.Description,
      );
      
      wellsFargo.push(fargoWells);
    });
    return wellsFargo;
  }


  public ReadCsv(File: File, recordType: RecordTypes): Promise<BankRecord[]> {
    
    return new Promise((resolve, reject) => {
      try {
        papaParse(File, {
          header: true,
          dynamicTyping: true,
          complete: (results: any) => {
            this.Log.debug('Got ' + results.data.length + ' rows'); 
            if(recordType === RecordTypes.AMERICAFIRST) {
              resolve(this.mapAmericaFirstToBankRecord(results.data));
            } else {
              resolve(results.data);
            }
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }


  public WFCsv(File: File, recordType: RecordTypes): Promise<WellsFargo[]> {
    
    return new Promise((resolve, reject) => {
      try {
        papaParse(File, {
          header: true,
          dynamicTyping: true,
          complete: (results: any) => {
            this.Log.debug('Got ' + results.data.length + ' rows'); 
            if(recordType === RecordTypes.WELLS_FARGO) {
              resolve(this.mapWellsFargoToBankRecord(results.data));
            } else {
              resolve(results.data);
            }
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }


  public ReadWFCsv(File: File, recordType: RecordTypes): Promise<BankRecord[]> {
    
    return new Promise((resolve, reject) => {
      try {
        papaParse(File, {
          header: true,
          dynamicTyping: true,
          complete: (results: any) => {
            this.Log.debug('Got ' + results.data.length + ' rows'); 
            if(recordType === RecordTypes.WELLS_FARGO) {
              resolve(this.mapAmericaFirstToBankRecord(results.data));
            } else {
              resolve(results.data);
            }
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }

}
