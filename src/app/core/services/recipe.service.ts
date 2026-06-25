import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipeData } from '../../shared/models/recipe-data.model';
import { environment } from '../../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = `${environment.baseAddress}/v1/calculadora`;

  constructor(private http: HttpClient) { }

  saveRecipe(recipe: RecipeData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, recipe);
  }

  getRecipe(id: string): Observable<RecipeData> {
    return this.http.get<RecipeData>(`${this.apiUrl}/${id}`);
  }

  updateRecipe(id: string, recipe: RecipeData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, recipe);
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
