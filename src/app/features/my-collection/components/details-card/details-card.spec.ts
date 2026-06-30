import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardDetailsComponent } from './details-card';

describe('CardDetailsComponent', () => {
  let component: CardDetailsComponent;
  let fixture: ComponentFixture<CardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
