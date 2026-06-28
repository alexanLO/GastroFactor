import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../core/services/recipe.service';
import { RecipeData } from '../../shared/models/recipe-data.model';

@Component({
  selector: 'app-recipe-card-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-card-component.html',
  styleUrls: ['./recipe-card-component.scss'],
})
export class RecipeCardComponent {
  private recipeService = inject(RecipeService);
  recipes: RecipeData[] = [];

  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe((data) => {
      this.recipes = data;
    });

    this.recipeService.recipes$.subscribe((data) => {
      this.recipes = data;
    });
  }
}
