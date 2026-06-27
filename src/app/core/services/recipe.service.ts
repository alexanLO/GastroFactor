import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RecipeData } from '../../shared/models/recipe-data.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = `${environment.baseAddress}/v1/recipes`;
  private http = inject(HttpClient);
  private recipesSubject = new BehaviorSubject<RecipeData[]>([]);
  recipes$ = this.recipesSubject.asObservable();

  saveRecipe(recipe: RecipeData): Observable<RecipeData> {
    return this.http.post<RecipeData>(this.apiUrl, recipe).pipe(
      tap((newRecipe) => {
        const current = this.recipesSubject.value;
        this.recipesSubject.next([...current, newRecipe]);
      }),
    );
  }

  getRecipe(id: string): Observable<RecipeData> {
    return this.http.get<RecipeData>(`${this.apiUrl}/${id}`);
  }

  getAllRecipes(): Observable<RecipeData[]> {
    return this.http
      .get<RecipeData[]>(this.apiUrl)
      .pipe(tap((data) => this.recipesSubject.next(data)));
  }

  updateRecipe(id: string, recipe: RecipeData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, recipe);
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
