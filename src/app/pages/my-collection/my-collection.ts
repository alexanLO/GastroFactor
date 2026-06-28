import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
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
export class MyCollection implements OnInit {
  recipeService = inject(RecipeService);
  isModalOpen = false;
  dateTime: Date = new Date();

  horaAtual = signal<Date>(new Date());
  private intervaloId: any;

  constructor() {
    // 2. Inicie um intervalo para atualizar o signal a cada 1000ms (1 segundo)
    this.intervaloId = setInterval(() => {
      this.horaAtual.set(new Date()); // Atualiza o valor, disparando a mudança na tela
    }, 1000);
  }

  ngOnInit(): void {
    this.recipeService.refreshRecipes();
  }

  // 3. Limpeza importante: pare o intervalo quando o componente for destruído
  ngOnDestroy() {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
