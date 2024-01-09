import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiClient } from './base-api-client'

@Injectable({
  providedIn: 'root'
})
export class RecordsClient extends BaseApiClient {
  constructor(private http: HttpClient) {$
    super();
  }
}
