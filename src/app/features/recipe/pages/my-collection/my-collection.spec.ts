import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject, of } from 'rxjs';
import { RecipeService } from '../../core/services/recipe.service';

import { MyCollection } from './my-collection';

const loggerStub = {
  debug: jasmine.createSpy('debug'),
  info: jasmine.createSpy('info'),
  warn: jasmine.createSpy('warn'),
  error: jasmine.createSpy('error')
};

const recipeServiceStub = {
  recipes$: new BehaviorSubject([]).asObservable(),
  recipes: () => [],
  refreshRecipes: jasmine.createSpy('refreshRecipes').and.returnValue(of([]))
};

describe('MyCollection', () => {
  let component: MyCollection;
  let fixture: ComponentFixture<MyCollection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCollection],
      providers: [
        provideRouter([]),
        { provide: NGXLogger, useValue: loggerStub },
        { provide: RecipeService, useValue: recipeServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCollection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
