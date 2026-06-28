import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RecipeService } from '../../core/services/recipe.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipe-card-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-card-component.html',
  styleUrls: ['./recipe-card-component.scss'],
})
export class RecipeCardComponent  {
  private recipeService = inject(RecipeService);
  recipes = toSignal(this.recipeService.recipes$, {
    initialValue: [],
  });
}
