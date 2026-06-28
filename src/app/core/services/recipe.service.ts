import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RecipeData } from '../../shared/models/recipe-data.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly apiUrl = `${environment.baseAddress}/v1/recipes`;
  private readonly http = inject(HttpClient);

  private readonly recipesSubject = new BehaviorSubject<RecipeData[]>([]);
  readonly recipes$ = this.recipesSubject.asObservable();

  /**
   * Carrega todas as receitas da API.
   */
  loadRecipes(): Observable<RecipeData[]> {
    return this.http
      .get<RecipeData[]>(this.apiUrl)
      .pipe(tap((recipes) => this.recipesSubject.next(recipes)));
  }

  /**
   * Atualiza a lista armazenada.
   */
  refreshRecipes(): void {
    this.loadRecipes().subscribe();
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
      .pipe(tap(() => this.refreshRecipes()));
  }

  /**
   * Remove uma receita.
   */
  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(tap(() => this.refreshRecipes()));
  }
}
