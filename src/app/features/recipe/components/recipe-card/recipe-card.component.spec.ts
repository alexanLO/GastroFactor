import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { RecipeService } from '../../core/services/recipe.service';

import { RecipeCardComponent } from './recipe-card.component';

const loggerStub = {
  debug: jasmine.createSpy('debug'),
  info: jasmine.createSpy('info'),
  warn: jasmine.createSpy('warn'),
  error: jasmine.createSpy('error')
};

const recipeServiceStub = {
  recipes$: new BehaviorSubject([]).asObservable(),
  refreshRecipes: jasmine.createSpy('refreshRecipes').and.returnValue(of([]))
};

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCardComponent],
      providers: [
        { provide: NGXLogger, useValue: loggerStub },
        { provide: RecipeService, useValue: recipeServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
