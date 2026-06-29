import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { environment } from '../../../environments/environment';
import { RecipeData } from '../../shared/models/recipe-data.model';
import { toSignal } from '@angular/core/rxjs-interop';

interface ApiRecipe {
  details: {
    name: string;
    servings: number;
    category: string;
  };
  ingredients: Array<{
    name: string;
    netWeight: number | null;
    correctionFactor: number | null;
    grossWeight: number | null;
    cookingFactor: number | null;
    totalQuantity: number | null;
  }>;
  nutritional: {
    calories: number | null;
    protein: number | null;
    totalFat: number | null;
    carbs: number | null;
  };
  preparationMethods: Array<{
    ordinationId: number | null;
    title: string;
    description: string;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly apiUrl = `${environment.baseAddress}/v1/recipes`;
  private readonly http = inject(HttpClient);
  private readonly log = inject(NGXLogger);

  private readonly recipesSubject = new BehaviorSubject<RecipeData[]>([]);
  readonly recipes$ = this.recipesSubject.asObservable();

  recipes = toSignal(this.recipes$, {
    initialValue: [],
  });

  /**
   * Carrega todas as receitas da API.
   */
  loadRecipes(): Observable<RecipeData[]> {
    this.log.debug('Chamando GET das receitas');
    return this.http
      .get<ApiRecipe[]>(this.apiUrl)
      .pipe(map((recipes) => recipes.map((recipe) => this.toUiRecipe(recipe))))
      .pipe(tap((recipes) => this.recipesSubject.next(recipes)));
  }

  /**
   * Atualiza a lista armazenada.
   */
  refreshRecipes(): Observable<RecipeData[]> {
    return this.loadRecipes();
  }

  /**
   * Salva uma nova receita.
   */
  saveRecipe(recipe: RecipeData): Observable<string> {
    return this.http.post<string>(this.apiUrl, this.toApiRecipe(recipe));
  }

  /**
   * Salva uma receita e sincroniza a lista em memoria.
   */
  saveRecipeAndRefresh(recipe: RecipeData): Observable<string> {
    return this.saveRecipe(recipe).pipe(
      switchMap((recipeId) =>
        this.loadRecipes().pipe(map(() => recipeId)),
      ),
    );
  }

  private toUiRecipe(recipe: ApiRecipe): RecipeData {
    return {
      details: {
        name: recipe.details.name,
        image: '',
        servings: recipe.details.servings,
        category: recipe.details.category,
      },
      ingredients: recipe.ingredients.map((ingredient) => ({
        name: ingredient.name,
        netWeight: this.toStringValue(ingredient.netWeight),
        correctionFactor: this.toStringValue(ingredient.correctionFactor),
        grossWeight: this.toStringValue(ingredient.grossWeight),
        cookingFactor: this.toStringValue(ingredient.cookingFactor),
        totalQuantity: this.toStringValue(ingredient.totalQuantity),
      })),
      nutritional: {
        calories: this.toStringValue(recipe.nutritional.calories),
        protein: this.toStringValue(recipe.nutritional.protein),
        totalFat: this.toStringValue(recipe.nutritional.totalFat),
        carbs: this.toStringValue(recipe.nutritional.carbs),
      },
      preparationMethod: recipe.preparationMethods.map((method, index) => ({
        id: String(method.ordinationId ?? index + 1).padStart(2, '0'),
        title: method.title,
        description: method.description,
      })),
    };
  }

  private toApiRecipe(recipe: RecipeData): ApiRecipe {
    return {
      details: {
        name: recipe.details.name,
        servings: recipe.details.servings,
        category: recipe.details.category,
      },
      ingredients: recipe.ingredients.map((ingredient) => ({
        name: ingredient.name,
        netWeight: this.toNumberValue(ingredient.netWeight),
        correctionFactor: this.toNumberValue(ingredient.correctionFactor),
        grossWeight: this.toNumberValue(ingredient.grossWeight),
        cookingFactor: this.toNumberValue(ingredient.cookingFactor),
        totalQuantity: this.toNumberValue(ingredient.totalQuantity),
      })),
      nutritional: {
        calories: this.toNumberValue(recipe.nutritional.calories),
        protein: this.toNumberValue(recipe.nutritional.protein),
        totalFat: this.toNumberValue(recipe.nutritional.totalFat),
        carbs: this.toNumberValue(recipe.nutritional.carbs),
      },
      preparationMethods: recipe.preparationMethod.map((method, index) => ({
        ordinationId: this.toOrdinationId(method.id, index),
        title: method.title,
        description: method.description,
      })),
    };
  }

  private toNumberValue(value: string): number | null {
    const normalized = value.trim().replace(',', '.');

    if (!normalized) {
      return null;
    }

    const parsed = Number.parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private toStringValue(value: number | null): string {
    if (value === null || value === undefined) {
      return '';
    }

    return `${value}`;
  }

  private toOrdinationId(value: string, fallbackIndex: number): number {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : fallbackIndex + 1;
  }
}
