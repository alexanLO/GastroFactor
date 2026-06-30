import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './details-card.html',
  styleUrls: ['./details-card.scss'],
})
export class DetailsCard {
  recipeName: string = '';
  image: string = '';
  servings: number = 0;
  category: string = 'Entrada';

  getDetails() {
    return {
      name: this.recipeName,
      image: this.image,
      servings: this.servings,
      category: this.category,
    };
  }
}
