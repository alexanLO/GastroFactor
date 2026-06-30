import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCard } from './recipe-card';
import { BehaviorSubject, of } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { RecipeService } from '../../../../core/services/recipe.service';

const loggerStub = {
  debug: jasmine.createSpy('debug'),
  info: jasmine.createSpy('info'),
  warn: jasmine.createSpy('warn'),
  error: jasmine.createSpy('error'),
};

const recipeServiceStub = {
  recipes$: new BehaviorSubject([]).asObservable(),
  refreshRecipes: jasmine.createSpy('refreshRecipes').and.returnValue(of([])),
};

describe('RecipeCardComponent', () => {
  let component: RecipeCard;
  let fixture: ComponentFixture<RecipeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCard],
      providers: [
        { provide: NGXLogger, useValue: loggerStub },
        { provide: RecipeService, useValue: recipeServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
