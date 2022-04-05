import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCsvItemComponent } from './display-csv-item.component';

describe('DisplayCsvItemComponent', () => {
  let component: DisplayCsvItemComponent;
  let fixture: ComponentFixture<DisplayCsvItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCsvItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCsvItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
