import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { RecipeData } from '../../../../shared/models/recipe-data.model';

import { NGXLogger } from 'ngx-logger';
import { finalize } from 'rxjs';
import { NotificationService } from '../../../../core/services/notification.service';
import { PdfExportService } from '../../../../core/services/pdf-export.service';
import { RecipeService } from '../../../../core/services/recipe.service';
import { resolveUnknownErrorMessage } from '../../../../core/utils/api-error-message.util';

import { PreparationMethodCard } from "../../components/preparation-method-card/preparation-method-card";
import { DetailsCard } from "../../components/details-card/details-card";
import { NutritionalCard } from "../../components/nutritional-card/nutritional-card";
import { IngredientsCard } from '../../components/ingredients-card/ingredients-card';

@Component({
  selector: 'app-technical-specifications',
  imports: [
    IngredientsCard,
    PreparationMethodCard,
    PreparationMethodCard,
    DetailsCard,
    NutritionalCard
],
  templateUrl: './technical-specifications.html',
  styleUrls: ['./technical-specifications.scss'],
})
export class TechnicalSpecification {
  @Input() isModal: boolean = false;
  @Output() saved = new EventEmitter<void>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild(DetailsCard) detailsComponent!: DetailsCard;
  @ViewChild(IngredientsCard) ingredientsComponent!: IngredientsCard;
  @ViewChild(NutritionalCard) nutritionalComponent!: NutritionalCard;
  @ViewChild(PreparationMethodCard) preparationComponent!: PreparationMethodCard;

  private recipeService = inject(RecipeService);
  private pdfService = inject(PdfExportService);
  private notificationService = inject(NotificationService);
  private log = inject(NGXLogger);
  private cdr = inject(ChangeDetectorRef);

  selectedImage: string | ArrayBuffer | null = '';
  isSaving = false;

  onImportImage(): void {
    this.fileInput.nativeElement.click();
  }

  saveRecipe(): void {
    if (this.isSaving) {
      return;
    }

    this.isSaving = true;

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
      .pipe(
        finalize(() => {
          this.isSaving = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Receita salva com sucesso.');
          this.saved.emit();
        },
        error: (error: unknown) => {
          const message = resolveUnknownErrorMessage(
            error,
            'Erro ao salvar a receita. Tente novamente.',
          );
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
