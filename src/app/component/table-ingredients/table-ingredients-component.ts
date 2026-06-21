import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-ingredients-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table-ingredients-component.html',
  styleUrls: ['./table-ingredients-component.scss'],
})
export class TableIngredientsComponent {
  ingredients = [
    { name: '', netWeight: '', correctionFactor: '', grossWeight: '', cookingFactor: '', totalQuantity: '' },
    { name: '', netWeight: '', correctionFactor: '', grossWeight: '', cookingFactor: '', totalQuantity: '' },
    { name: '', netWeight: '', correctionFactor: '', grossWeight: '', cookingFactor: '', totalQuantity: '' }
  ];

  addIngredient() {
    this.ingredients.push({ name: '', netWeight: '', correctionFactor: '', grossWeight: '', cookingFactor: '', totalQuantity: '' });
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }
}
