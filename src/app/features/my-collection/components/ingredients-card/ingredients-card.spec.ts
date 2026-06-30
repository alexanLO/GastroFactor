import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsCard } from './ingredients-card';

describe('TableIngredientsComponent', () => {
  let component: IngredientsCard;
  let fixture: ComponentFixture<IngredientsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
