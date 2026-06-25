import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preparation-method-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './preparation-method-component.html',
  styleUrl: './preparation-method-component.scss',
})
export class PreparationMethodComponent {
  steps = [
    { id: '1', title: '', description: '', editing: true },
    { id: '2', title: '', description: '', editing: true },
  ];

  addStep() {
    const nextId = (this.steps.length + 1).toString().padStart(2, '0');
    this.steps.push({ id: nextId, title: '', description: '', editing: true });
  }

  confirmStep(step: any) {
    step.editing = false;
  }

  editStep(step: any) {
    step.editing = true;
  }

  removeStep(index: number) {
    this.steps.splice(index, 1);
    this.reindexSteps(); // recalcula IDs
  }

  private reindexSteps() {
    this.steps.forEach((step, i) => {
      step.id = (i + 1).toString().padStart(2, '0');
    });
  }
}
