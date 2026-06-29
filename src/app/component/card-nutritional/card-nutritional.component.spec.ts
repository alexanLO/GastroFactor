import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNutritionalComponent } from './card-nutritional.component';

describe('CardNutritionalComponent', () => {
  let component: CardNutritionalComponent;
  let fixture: ComponentFixture<CardNutritionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNutritionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNutritionalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
