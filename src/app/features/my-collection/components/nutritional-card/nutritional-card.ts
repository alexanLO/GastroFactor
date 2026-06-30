import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-nutritional',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nutritional-card.html',
  styleUrl: './nutritional-card.scss',
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
      carbs: this.carbs,
    };
  }
}
