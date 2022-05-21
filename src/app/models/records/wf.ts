/**
 * @class WellsFargo
 * 
 * @description Wells Fargo bank record
 */

export class WellsFargo {
  /**
  * @param {string} _date
  * @param {number} _amount
  * @param {string} _star
  * @param {string} _blank
  * @param {string} _description
  */

  constructor(private _date: string, private _amount: number, private _star: string, private _blank: string, private _description: string) { }
  
  set date(value: string) { this._date = value }
  set amount(value: number) { this._amount = value }
  set star(value: string) { this._star = value }
  set blank(value: string) { this._blank = value }
  set description(value: string) { this._description = value }
  
  get date(): string { return this._date }
  get amount(): number { return this._amount }
  get star(): string { return this._star }
  get blank(): string { return this._blank }
  get description(): string { return this._description }
}