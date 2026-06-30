import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularDialog } from './calcular-dialog';

describe('CalcularDialog', () => {
  let component: CalcularDialog;
  let fixture: ComponentFixture<CalcularDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcularDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcularDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
