import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { RecipeService } from '../../core/services/recipe.service';
import { RecipeData } from '../../shared/models/recipe-data.model';
import { TechnicalSpecification } from '../technical-specification/technical-specification';

@Component({
  selector: 'app-my-collection',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, CommonModule, TechnicalSpecification],
  templateUrl: './my-collection.html',
  styleUrls: ['./my-collection.scss'],
})
export class MyCollection {
  private recipeService = inject(RecipeService);
  recipesData: RecipeData[] = [];

  isModalOpen = false;

  recipes = [
    {
      title: 'Receita Exemplo 1',
      image: '/receita.png',
    },
    {
      title: 'Receita Exemplo 2',
      image: '/receita.png',
    },
  ];

  ngOnInit() {
    // carrega do backend
    this.recipeService.getAllRecipes().subscribe();
    // escuta atualizações em tempo real
    this.recipeService.recipes$.subscribe((data) => {
      this.recipesData = data;
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  loadRecipes() {
    this.recipeService.getAllRecipes().subscribe((data) => {
      this.recipesData = data;
    });
  }
}
