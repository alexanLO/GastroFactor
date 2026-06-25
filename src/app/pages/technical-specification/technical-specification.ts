import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { CardDetailsComponent } from '../../component/card-details-component/card-details-component';
import { CardNutritionalComponent } from '../../component/card-nutritional/card-nutritional-component';
import { FooterComponent } from '../../component/footer/footer.component';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { PreparationMethodComponent } from '../../component/preparation-method-component/preparation-method-component';
import { TableIngredientsComponent } from '../../component/table-ingredients/table-ingredients-component';
import { PdfExportService } from '../../core/services/pdf-export.service';
import { RecipeService } from '../../core/services/recipe.service';
import { RecipeData } from '../../shared/models/recipe-data.model';

@Component({
  selector: 'app-technical-specification',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    NavbarComponent,
    FooterComponent,
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

  @ViewChild(CardDetailsComponent) detailsComponent!: CardDetailsComponent;
  @ViewChild(TableIngredientsComponent) ingredientsComponent!: TableIngredientsComponent;
  @ViewChild(CardNutritionalComponent) nutritionalComponent!: CardNutritionalComponent;
  @ViewChild(PreparationMethodComponent) preparationComponent!: PreparationMethodComponent;

  constructor(
    private recipeService: RecipeService,
    private pdfService: PdfExportService,
  ) {}

  saveRecipe(): void {
    const recipeData: RecipeData = {
      details: this.detailsComponent.getDetails(),
      ingredients: this.ingredientsComponent.ingredients,
      nutritional: this.nutritionalComponent.getNutritional(),
      preparationMethod: this.preparationComponent.steps,
    };

    this.recipeService.saveRecipe(recipeData).subscribe({
      next: (response) => {
        alert('Receita salva com sucesso!');
        console.log('Receita salva:', response);
      },
      error: (error) => {
        alert('Erro ao salvar a receita!');
        console.error('Erro:', error);
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
}
