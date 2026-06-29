import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { of, Subject, throwError } from 'rxjs';
import { NotificationService } from '../../core/services/notification.service';
import { PdfExportService } from '../../core/services/pdf-export.service';
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

const notificationServiceStub = {
  showSuccess: jasmine.createSpy('showSuccess'),
  showError: jasmine.createSpy('showError')
};

const pdfExportServiceStub = {
  generateRecipePdf: jasmine.createSpy('generateRecipePdf')
};

describe('TechnicalSpecification', () => {
  let component: TechnicalSpecification;
  let fixture: ComponentFixture<TechnicalSpecification>;

  const setupRecipeDataMocks = (): void => {
    spyOn(component.detailsComponent, 'getDetails').and.returnValue({
      name: 'Receita Teste',
      image: '',
      servings: 2,
      category: 'Categoria'
    });

    component.ingredientsComponent.ingredients = [
      {
        id: '01',
        name: 'Ingrediente',
        netWeight: '100g',
        correctionFactor: '1',
        grossWeight: '100g',
        cookingFactor: '1',
        totalQuantity: '100g'
      }
    ];

    spyOn(component.nutritionalComponent, 'getNutritional').and.returnValue({
      calories: '100',
      protein: '10',
      totalFat: '5',
      carbs: '15'
    });

    component.preparationComponent.steps = [
      { id: '1', title: 'Passo 1', description: 'Descricao', editing: false }
    ];
  };

  beforeEach(async () => {
    recipeServiceStub.saveRecipeAndRefresh.and.returnValue(of(void 0));
    recipeServiceStub.saveRecipeAndRefresh.calls.reset();
    notificationServiceStub.showSuccess.calls.reset();
    notificationServiceStub.showError.calls.reset();
    loggerStub.error.calls.reset();

    await TestBed.configureTestingModule({
      imports: [TechnicalSpecification],
      providers: [
        { provide: NGXLogger, useValue: loggerStub },
        { provide: RecipeService, useValue: recipeServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: PdfExportService, useValue: pdfExportServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalSpecification);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save recipe successfully, emit event and show success notification', () => {
    setupRecipeDataMocks();
    component.selectedImage = 'data:image/png;base64,abc';
    const emitSpy = spyOn(component.saved, 'emit');

    component.saveRecipe();

    expect(recipeServiceStub.saveRecipeAndRefresh).toHaveBeenCalledTimes(1);
    const payload = recipeServiceStub.saveRecipeAndRefresh.calls.mostRecent().args[0];

    expect(payload.details.name).toBe('Receita Teste');
    expect(payload.details.image).toBe('data:image/png;base64,abc');
    expect(payload.ingredients.length).toBe(1);
    expect(payload.preparationMethod.length).toBe(1);

    expect(notificationServiceStub.showSuccess).toHaveBeenCalledWith('Receita salva com sucesso.');
    expect(emitSpy).toHaveBeenCalled();
    expect(component.isSaving).toBeFalse();
  });

  it('should show error notification and log when save fails', () => {
    setupRecipeDataMocks();
    recipeServiceStub.saveRecipeAndRefresh.and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 500, statusText: 'Server Error' }))
    );

    component.saveRecipe();

    expect(notificationServiceStub.showError).toHaveBeenCalled();
    expect(loggerStub.error).toHaveBeenCalled();
    expect(component.isSaving).toBeFalse();
  });

  it('should ignore save action while a request is in progress', () => {
    setupRecipeDataMocks();
    const pendingRequest$ = new Subject<void>();
    recipeServiceStub.saveRecipeAndRefresh.and.returnValue(pendingRequest$);

    component.saveRecipe();
    component.saveRecipe();

    expect(recipeServiceStub.saveRecipeAndRefresh).toHaveBeenCalledTimes(1);
    expect(component.isSaving).toBeTrue();

    pendingRequest$.next();
    pendingRequest$.complete();

    expect(component.isSaving).toBeFalse();
  });
});
