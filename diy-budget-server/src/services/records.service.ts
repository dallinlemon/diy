import { BaseService } from './base-service';
import Record from '../models/record.model';
import RecordDao from '../dao/record.dao';

export default class RecordsService extends BaseService {
  public dao: RecordDao;

  /**
   * Creates a new instance of the RecordService and initializes the DAO.
   * @returns new instance of RecordService
   */
  public static async init(): Promise<RecordsService> {
    const newRecordService = new RecordsService();
    newRecordService.dao = await RecordDao.getInstance();
    return newRecordService;
  }

  /**
   * Use init method instead of constructor.
   */
  constructor() {
    super();
  }

  /**
   * Create a new record.
   * @param record the record to create
   * @returns the ID of the created record
   */
  public async createRecord(record: Record): Promise<number> {
    this.logger.info(RecordsService.name, 'createRecord', `Creating record: ${record}`);
    this.dao = await RecordDao.getInstance();
    const result = await this.dao.insert(record);
    // TODO - check this is correct id that was added 
    return result.lastID;
  }

  public async getAllRecords(): Promise<Record[]> {
    this.logger.info(RecordsService.name, 'getAllRecords', `Getting all records`);
    this.dao = await RecordDao.getInstance();
    return this.dao.getAll();
  }

  public async getRecordById(id: number): Promise<Record> {
    this.logger.info(RecordsService.name, 'getRecordById', `Getting record by id: ${id}`);
    this.dao = await RecordDao.getInstance();
    return this.dao.getById(id);
  }

  public async getRecordsByAccountId(userId: number): Promise<Record[]> {
    this.logger.info(RecordsService.name, 'getRecordsByAccountId', `Getting records by account id: ${userId}`);
    this.dao = await RecordDao.getInstance();
    return this.dao.getByAccountId(userId);
  }

  public async updateRecord(record: Record, id: number): Promise<void> {
    this.logger.info(RecordsService.name, 'updateRecord', `Updating record: ${JSON.stringify(record)}`);
    this.dao = await RecordDao.getInstance();
    await this.dao.update(record, id);
  }

  public async deleteRecord(id: number): Promise<void> {
    this.logger.info(RecordsService.name, 'deleteRecord', `Deleting record: ${id}`);
    this.dao = await RecordDao.getInstance();
    await this.dao.deleteById(id);
  }

  public async updateAll(records: Record[]): Promise<boolean> {
    this.logger.info(RecordsService.name, 'updateAll', `Updating all records`);
    this.dao = await RecordDao.getInstance();
    return this.dao.updateAll(records);
  }

}
