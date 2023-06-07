import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCalculatorComponent } from './restaurant-calculator.component';

describe('RestaurantCalculatorComponent', () => {
  let component: RestaurantCalculatorComponent;
  let fixture: ComponentFixture<RestaurantCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantCalculatorComponent]
    });
    fixture = TestBed.createComponent(RestaurantCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
