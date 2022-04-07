import { TestBed } from '@angular/core/testing';

import { IngestRecordsService } from './ingest-records.service';

describe('IngestRecordsService', () => {
  let service: IngestRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngestRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
