import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RecipeData {
  details: {
    name: string;
    servings: number;
    category: string;
  };
  ingredients: Array<{
    name: string;
    netWeight: string;
    correctionFactor: string;
    grossWeight: string;
    cookingFactor: string;
    totalQuantity: string;
  }>;
  nutritional: {
    calories: string;
    protein: string;
    totalFat: string;
    carbs: string;
  };
  preparationMethod: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = '/api/recipes'; // Ajuste conforme sua API

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
