import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreparationMethodCard } from './preparation-method-card';

describe('PreparationMethodCard', () => {
  let component: PreparationMethodCard;
  let fixture: ComponentFixture<PreparationMethodCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreparationMethodCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PreparationMethodCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
