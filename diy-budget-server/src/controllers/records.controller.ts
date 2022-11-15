import { NextFunction } from 'express';
import { Request, Response } from 'express-serve-static-core';
import RecordsService from '../services/records.service';
import BaseController from './base.controller';

// TODO create validator to verify request body
// TODO verify user is authenticated
export default class RecordsController extends BaseController {
  protected recordsService: RecordsService;
  /**
   * Creates a new instance of the RecordsController and initializes the RecordsService.
   * @returns new instance of RecordsController
   */
  constructor() {
    super();
  }

  public async handleResponse(res: Response, data: any): Promise<void> {
    this.logger.info(RecordsController.name, 'handleResponse', `Sending response: ${JSON.stringify(data)}`);
    res.status(200).send({data});
  }

  public async handleError(res: Response, err: any): Promise<void> {
    this.logger.error(RecordsController.name, 'handleError', `Error: `, err);
    res.status(500).send(err);
  }

  public async createRecord(req: Request, res: Response): Promise<void> {
    try {
      // TODO define what format the dates should be sent to the server in
      req.body.date = new Date(req.body.date);
      req.body.created_at = new Date(req.body.created_at);
      this.recordsService = new RecordsService();
      const record = await this.recordsService.createRecord(req.body);
      this.handleResponse(res, record);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  public async getAllRecords(req: Request, res: Response): Promise<void> {
    try {
      this.recordsService = new RecordsService();
      const records = await this.recordsService.getAllRecords();
      this.handleResponse(res, records);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  public async getRecordById(req: Request, res: Response): Promise<void> {
    try {
      this.recordsService = new RecordsService();
      const record = await this.recordsService.getRecordById(Number.parseInt(req.params.id as string));
      this.handleResponse(res, record);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  public async getRecordsByAccountId(req: Request, res: Response): Promise<void> {
    try {
      this.recordsService = new RecordsService();
      const records = await this.recordsService.getRecordsByAccountId(Number.parseInt(req.params.accountId));
      this.handleResponse(res, records);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  public async deleteRecord(req: Request, res: Response): Promise<void> {
    try {
      this.recordsService = new RecordsService();
      const record = await this.recordsService.deleteRecord(Number.parseInt(req.params.id));
      this.handleResponse(res, record);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  public async updateRecord(req: Request, res: Response): Promise<void> {
    try {
      this.recordsService = new RecordsService();
      const record = await this.recordsService.updateRecord(req.body, Number.parseInt(req.params.id));
      this.handleResponse(res, record);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  public async updateAll(req: Request, res: Response): Promise<void> {
    try {
      this.recordsService = new RecordsService();
      const result = await this.recordsService.updateAll(req.body);
      this.handleResponse(res, result);
    } catch (err) {
      this.handleError(res, err);
    }
  }


}