import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { RecipeService } from '../../../../core/services/recipe.service';
import { TechnicalSpecification } from '../technical-specification/technical-specification';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

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
export class MyCollection implements OnInit, OnDestroy {
  recipeService = inject(RecipeService);
  private readonly destroyRef = inject(DestroyRef);
  isModalOpen = false;
  dateTime: Date = new Date();

  horaAtual = signal<Date>(new Date());
  private intervaloId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    // 2. Inicie um intervalo para atualizar o signal a cada 1000ms (1 segundo)
    this.intervaloId = setInterval(() => {
      this.horaAtual.set(new Date()); // Atualiza o valor, disparando a mudança na tela
    }, 1000);
  }

  ngOnInit(): void {
    this.recipeService
      .refreshRecipes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  // 3. Limpeza importante: pare o intervalo quando o componente for destruído
  ngOnDestroy(): void {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
      this.intervaloId = null;
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
