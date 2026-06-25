import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-nutritional-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './card-nutritional-component.html',
  styleUrl: './card-nutritional-component.scss',
})
export class CardNutritionalComponent {
  calories: string = '';
  protein: string = '';
  totalFat: string = '';
  carbs: string = '';

  getNutritional() {
    return {
      calories: this.calories,
      protein: this.protein,
      totalFat: this.totalFat,
      carbs: this.carbs
    };
  }
}
