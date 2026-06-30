import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredients-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './ingredients-card.html',
  styleUrl: './ingredients-card.scss',
})
export class IngredientsCard {
  ingredients = [
    {
      id: '01',
      name: '',
      netWeight: '',
      correctionFactor: '',
      grossWeight: '',
      cookingFactor: '',
      totalQuantity: '',
    },
    {
      id: '02',
      name: '',
      netWeight: '',
      correctionFactor: '',
      grossWeight: '',
      cookingFactor: '',
      totalQuantity: '',
    },
    {
      id: '03',
      name: '',
      netWeight: '',
      correctionFactor: '',
      grossWeight: '',
      cookingFactor: '',
      totalQuantity: '',
    }
  ];

  addIngredient() {
    const nextId = (this.ingredients.length + 1).toString().padStart(2, '0');
    this.ingredients.push({
      id: nextId,
      name: '',
      netWeight: '',
      correctionFactor: '',
      grossWeight: '',
      cookingFactor: '',
      totalQuantity: '',
    });
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.reindexIngredients();
  }

  private reindexIngredients() {
    this.ingredients.forEach((ingredient, i) => {
      ingredient.id = (i + 1).toString().padStart(2, '0');
    });
  }
}
