import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nutritional-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nutritional-card.html',
  styleUrls: ['./nutritional-card.scss'],
})
export class NutritionalCard {
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
