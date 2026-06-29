import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  inject,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { CardDetailsComponent } from '../../component/card-details/card-details.component';
import { CardNutritionalComponent } from '../../component/card-nutritional/card-nutritional.component';
import { PreparationMethodComponent } from '../../component/preparation-method/preparation-method.component';
import { TableIngredientsComponent } from '../../component/table-ingredients/table-ingredients.component';
import { PdfExportService } from '../../core/services/pdf-export.service';
import { NotificationService } from '../../core/services/notification.service';
import { RecipeService } from '../../core/services/recipe.service';
import { resolveUnknownErrorMessage } from '../../core/utils/api-error-message.util';
import { RecipeData } from '../../shared/models/recipe-data.model';

@Component({
  selector: 'app-technical-specification',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TableIngredientsComponent,
    CardNutritionalComponent,
    PreparationMethodComponent,
    CardDetailsComponent,
  ],
  templateUrl: './technical-specification.html',
  styleUrl: './technical-specification.scss',
})
export class TechnicalSpecification {
  @Input() isModal: boolean = false;
  @Output() saved = new EventEmitter<void>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild(CardDetailsComponent) detailsComponent!: CardDetailsComponent;
  @ViewChild(TableIngredientsComponent) ingredientsComponent!: TableIngredientsComponent;
  @ViewChild(CardNutritionalComponent) nutritionalComponent!: CardNutritionalComponent;
  @ViewChild(PreparationMethodComponent) preparationComponent!: PreparationMethodComponent;

  private recipeService = inject(RecipeService);
  private pdfService = inject(PdfExportService);
  private notificationService = inject(NotificationService);
  private log = inject(NGXLogger);
  private cdr = inject(ChangeDetectorRef);

  selectedImage: string | ArrayBuffer | null = '';

  onImportImage(): void {
    this.fileInput.nativeElement.click();
  }

  saveRecipe(): void {
    const details = this.detailsComponent.getDetails();
    details.image = this.selectedImage as string;

    const recipeData: RecipeData = {
      details,
      ingredients: this.ingredientsComponent.ingredients,
      nutritional: this.nutritionalComponent.getNutritional(),
      preparationMethod: this.preparationComponent.steps,
    };

    this.recipeService
      .saveRecipeAndRefresh(recipeData)
      .subscribe({
        next: () => {
          this.saved.emit();
        },
        error: (error: unknown) => {
          const message = resolveUnknownErrorMessage(error, 'Erro ao salvar a receita. Tente novamente.');
          this.notificationService.showError(message);
          this.log.error('Erro ao salvar receita:', error);
        },
      });
  }

  exportPdf(): void {
    const recipeData: RecipeData = {
      details: this.detailsComponent.getDetails(),
      ingredients: this.ingredientsComponent.ingredients,
      nutritional: this.nutritionalComponent.getNutritional(),
      preparationMethod: this.preparationComponent.steps,
    };

    this.pdfService.generateRecipePdf(recipeData);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      // exemplo: ler como base64 para exibir na tela
      const reader = new FileReader();

      reader.onload = () => {
        this.selectedImage = reader.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);

      // aqui você pode enviar para o backend com HttpClient
      // const formData = new FormData();
      // formData.append('image', file);
      // this.http.post('/api/upload', formData).subscribe(...);
    }
  }
}
