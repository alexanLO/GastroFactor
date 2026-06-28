import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-details-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './card-details-component.html',
  styleUrl: './card-details-component.scss',
})
export class CardDetailsComponent {
  recipeName: string = '';
  image: string = '';
  servings: number = 0;
  category: string = 'Entrada';

  getDetails() {
    return {
      name: this.recipeName,
      image: this.image,
      servings: this.servings,
      category: this.category
    };
  }
}
