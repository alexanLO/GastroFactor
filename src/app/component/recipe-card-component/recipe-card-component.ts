import { Component, inject, Input } from '@angular/core';
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
  @Input() recipe!: RecipeData;
  private recipeService = inject(RecipeService);
  recipes: RecipeData[] = [];

  ngOnInit(): void {
    this.recipeService.loadRecipes().subscribe();

    this.recipeService.recipes$.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
