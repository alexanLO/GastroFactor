import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NutritionalCard } from './nutritional-card';


describe('NutritionalCard', () => {
  let component: NutritionalCard;
  let fixture: ComponentFixture<NutritionalCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionalCard],
    }).compileComponents();

    fixture = TestBed.createComponent(NutritionalCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
