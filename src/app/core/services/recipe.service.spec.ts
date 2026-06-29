import { provideHttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NGXLogger } from 'ngx-logger';
import { RecipeData } from '../../shared/models/recipe-data.model';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;
  let httpMock: HttpTestingController;

  const loggerStub = {
    debug: jasmine.createSpy('debug'),
    info: jasmine.createSpy('info'),
    warn: jasmine.createSpy('warn'),
    error: jasmine.createSpy('error')
  };

  const makeRecipe = (name: string): RecipeData => ({
    details: {
      name,
      image: '',
      servings: 2,
      category: 'Teste'
    },
    ingredients: [
      {
        name: 'Ingrediente 1',
        netWeight: '100',
        correctionFactor: '1',
        grossWeight: '100',
        cookingFactor: '1',
        totalQuantity: '100'
      }
    ],
    nutritional: {
      calories: '100',
      protein: '10',
      totalFat: '5',
      carbs: '15'
    },
    preparationMethod: [
      {
        id: '01',
        title: 'Passo 1',
        description: 'Misturar tudo'
      }
    ]
  });

  const makeApiRecipe = (name: string) => ({
    details: {
      name,
      servings: 2,
      category: 'Teste'
    },
    ingredients: [
      {
        name: 'Ingrediente 1',
        netWeight: 100,
        correctionFactor: 1,
        grossWeight: 100,
        cookingFactor: 1,
        totalQuantity: 100
      }
    ],
    nutritional: {
      calories: 100,
      protein: 10,
      totalFat: 5,
      carbs: 15
    },
    preparationMethods: [
      {
        ordinationId: 1,
        title: 'Passo 1',
        description: 'Misturar tudo'
      }
    ]
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecipeService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: NGXLogger, useValue: loggerStub }
      ]
    });

    service = TestBed.inject(RecipeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load recipes successfully and update in-memory signal', () => {
    const apiResponse = [makeApiRecipe('Receita A')];
    const expectedResponse = [makeRecipe('Receita A')];
    let received: RecipeData[] | undefined;

    service.loadRecipes().subscribe((recipes) => {
      received = recipes;
    });

    const req = httpMock.expectOne('/v1/recipes');
    expect(req.request.method).toBe('GET');
    req.flush(apiResponse);

    expect(received).toEqual(expectedResponse);
    expect(service.recipes()).toEqual(expectedResponse);
  });

  it('should propagate error and keep previous in-memory recipes', () => {
    const initialApiResponse = [makeApiRecipe('Receita Inicial')];
    const initialMappedResponse = [makeRecipe('Receita Inicial')];

    service.loadRecipes().subscribe();
    const initialReq = httpMock.expectOne('/v1/recipes');
    initialReq.flush(initialApiResponse);

    let capturedError: HttpErrorResponse | undefined;

    service.loadRecipes().subscribe({
      next: () => fail('expected request to fail'),
      error: (error: HttpErrorResponse) => {
        capturedError = error;
      }
    });

    const failingReq = httpMock.expectOne('/v1/recipes');
    failingReq.flush({ message: 'falha interna' }, { status: 500, statusText: 'Server Error' });

    expect(capturedError?.status).toBe(500);
    expect(service.recipes()).toEqual(initialMappedResponse);
  });
});
