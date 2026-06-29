import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RecipeData } from '../../shared/models/recipe-data.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly apiUrl = `${environment.baseAddress}/v1/recipes`;
  private readonly http = inject(HttpClient);

  private readonly recipesSubject = new BehaviorSubject<RecipeData[]>([]);
  readonly recipes$ = this.recipesSubject.asObservable();

  recipes = toSignal(this.recipes$, {
    initialValue: [],
  });

  /**
   * Carrega todas as receitas da API.
   */
  loadRecipes(): Observable<RecipeData[]> {
    console.log('Chamando GET das receitas');
    return this.http
      .get<RecipeData[]>(this.apiUrl)
      .pipe(tap((recipes) => this.recipesSubject.next(recipes)));
  }

  /**
   * Atualiza a lista armazenada.
   */
  refreshRecipes(): Observable<RecipeData[]> {
    return this.loadRecipes();
  }

  /**
   * Busca uma receita específica.
   */
  getRecipe(id: string): Observable<RecipeData> {
    return this.http.get<RecipeData>(`${this.apiUrl}/${id}`);
  }

  /**
   * Salva uma nova receita.
   */
  saveRecipe(recipe: RecipeData): Observable<RecipeData> {
    return this.http.post<RecipeData>(this.apiUrl, recipe);
  }

  /**
   * Atualiza uma receita existente.
   */
  updateRecipe(id: string, recipe: RecipeData): Observable<RecipeData> {
    return this.http
      .put<RecipeData>(`${this.apiUrl}/${id}`, recipe)
      .pipe(
        switchMap((updatedRecipe) =>
          this.loadRecipes().pipe(map(() => updatedRecipe)),
        ),
      );
  }

  /**
   * Remove uma receita.
   */
  deleteRecipe(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(switchMap(() => this.loadRecipes().pipe(map(() => void 0))));
  }
}
