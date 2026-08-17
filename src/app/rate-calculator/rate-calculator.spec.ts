import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCalculator } from './rate-calculator';

describe('RateCalculator', () => {
  let component: RateCalculator;
  let fixture: ComponentFixture<RateCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateCalculator],
    }).compileComponents();

    fixture = TestBed.createComponent(RateCalculator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
