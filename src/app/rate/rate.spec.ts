import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rate } from './rate';

describe('Rate', () => {
  let component: Rate;
  let fixture: ComponentFixture<Rate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rate],
    }).compileComponents();

    fixture = TestBed.createComponent(Rate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
