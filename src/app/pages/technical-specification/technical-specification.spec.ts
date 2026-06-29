import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { RecipeService } from '../../core/services/recipe.service';

import { TechnicalSpecification } from './technical-specification';

const loggerStub = {
  debug: jasmine.createSpy('debug'),
  info: jasmine.createSpy('info'),
  warn: jasmine.createSpy('warn'),
  error: jasmine.createSpy('error')
};

const recipeServiceStub = {
  saveRecipeAndRefresh: jasmine.createSpy('saveRecipeAndRefresh').and.returnValue(of(void 0))
};

describe('TechnicalSpecification', () => {
  let component: TechnicalSpecification;
  let fixture: ComponentFixture<TechnicalSpecification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalSpecification],
      providers: [
        { provide: NGXLogger, useValue: loggerStub },
        { provide: RecipeService, useValue: recipeServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalSpecification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
