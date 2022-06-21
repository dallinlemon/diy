import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAvailableMenu } from './category-available-menu';

describe('BudgetViewComponent', () => {
  let component: CategoryAvailableMenu;
  let fixture: ComponentFixture<CategoryAvailableMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAvailableMenu ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAvailableMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
