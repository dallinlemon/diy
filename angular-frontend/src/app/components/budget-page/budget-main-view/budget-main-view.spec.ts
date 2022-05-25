import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMainView } from './budget-main-view';

describe('BudgetViewComponent', () => {
  let component: BudgetMainView;
  let fixture: ComponentFixture<BudgetMainView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetMainView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetMainView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
