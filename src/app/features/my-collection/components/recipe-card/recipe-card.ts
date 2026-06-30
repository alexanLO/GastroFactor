import { Component, inject } from '@angular/core';
import { RecipeService } from '../../../../core/services/recipe.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
})
export class RecipeCard {
  private recipeService = inject(RecipeService);
  recipes = toSignal(this.recipeService.recipes$, {
    initialValue: [],
  });
}
