
/** 
 * @class BankRecord
 * 
 * @description Generic class for bank records
 */
export class BankRecord {
  /**
  * @param {string} _date
  * @param {string} _description
  * @param {string} _debit
  * @param {number} _credit
  */
  constructor(private _date: string, private _description: string, private _debit: string, private _credit: number) { }

  set date(value: string) { this._date = value }
  get date(): string { return this._date }
  set description(value: string) { this._description = value }
  get description(): string { return this._description }
  set debit(value: string) { this._debit = value }
  get debit(): string { return this._debit }
  set credit(value: number) { this._credit = value }
  get credit(): number { return this._credit }
}