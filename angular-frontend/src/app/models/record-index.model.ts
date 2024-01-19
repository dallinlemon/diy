
/**
 * Record Model
 */
export default class RecordIndex  {

  constructor(
    public record_id: number,
    public category_id: number,
    public name: string,
    public amount: number,
    public notes: string,
  ) {
    // intentionally left blank
  }
}
