import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSaveSearch } from './customer-save-search';

describe('CustomerSaveSearch', () => {
  let component: CustomerSaveSearch;
  let fixture: ComponentFixture<CustomerSaveSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSaveSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerSaveSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
