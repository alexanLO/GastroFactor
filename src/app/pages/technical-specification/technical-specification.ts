import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { TableIngredientsComponent } from '../../component/table-ingredients/table-ingredients-component';
import { CardNutritionalComponent } from '../../component/card-nutritional/card-nutritional-component';
import { PreparationMethodComponent } from '../../component/preparation-method-component/preparation-method-component';
import { CardDetailsComponent } from "../../component/card-details-component/card-details-component";

@Component({
  selector: 'app-technical-specification',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    TableIngredientsComponent,
    CardNutritionalComponent,
    PreparationMethodComponent,
    CardDetailsComponent
],
  templateUrl: './technical-specification.html',
  styleUrl: './technical-specification.scss',
})
export class TechnicalSpecification {
  @Input() isModal: boolean = false;
}
