import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeData } from '../../shared/models/recipe-data.model';

type PreparationStep = RecipeData['preparationMethod'][number] & {
  editing: boolean;
};

@Component({
  selector: 'app-preparation-method-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './preparation-method-component.html',
  styleUrl: './preparation-method-component.scss',
})
export class PreparationMethodComponent {
  steps: PreparationStep[] = [
    { id: '1', title: '', description: '', editing: true },
    { id: '2', title: '', description: '', editing: true },
  ];

  addStep(): void {
    const nextId = (this.steps.length + 1).toString().padStart(2, '0');
    this.steps.push({ id: nextId, title: '', description: '', editing: true });
  }

  confirmStep(step: PreparationStep): void {
    step.editing = false;
  }

  editStep(step: PreparationStep): void {
    step.editing = true;
  }

  removeStep(index: number): void {
    this.steps.splice(index, 1);
    this.reindexSteps(); // recalcula IDs
  }

  private reindexSteps(): void {
    this.steps.forEach((step, i) => {
      step.id = (i + 1).toString().padStart(2, '0');
    });
  }
}
