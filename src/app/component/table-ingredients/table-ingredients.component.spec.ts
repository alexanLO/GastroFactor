import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIngredientsComponent } from './table-ingredients.component';

describe('TableIngredientsComponent', () => {
  let component: TableIngredientsComponent;
  let fixture: ComponentFixture<TableIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableIngredientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableIngredientsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
