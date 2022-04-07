import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCsvComponent } from './read-csv.component';

describe('ReadCsvComponentComponent', () => {
  let component: ReadCsvComponent;
  let fixture: ComponentFixture<ReadCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadCsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
