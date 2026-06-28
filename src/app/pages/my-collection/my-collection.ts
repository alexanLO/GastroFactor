import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { RecipeService } from '../../core/services/recipe.service';
import { RecipeData } from '../../shared/models/recipe-data.model';
import { TechnicalSpecification } from '../technical-specification/technical-specification';
import { RecipeCardComponent } from '../../component/recipe-card-component/recipe-card-component';

@Component({
  selector: 'app-my-collection',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    CommonModule,
    TechnicalSpecification,
    RecipeCardComponent,
  ],
  templateUrl: './my-collection.html',
  styleUrls: ['./my-collection.scss'],
})
export class MyCollection {
  recipeService = inject(RecipeService);
  isModalOpen = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
