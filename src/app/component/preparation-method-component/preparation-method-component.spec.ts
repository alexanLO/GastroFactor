import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationMethodComponent } from './preparation-method-component';

describe('PreparationMethodComponent', () => {
  let component: PreparationMethodComponent;
  let fixture: ComponentFixture<PreparationMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreparationMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreparationMethodComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
