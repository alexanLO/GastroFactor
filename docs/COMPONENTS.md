# 📦 Guia de Componentes

Documentação completa de todos os componentes da aplicação.

## Componentes de Layout Global

### navbar (`component/navbar/`)

**Responsabilidade**: Barra de navegação principal

```typescript
// navbar.component.ts
@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  // Lógica de navegação
}
```

**Uso**:

```html
<app-navbar-component></app-navbar-component>
```

### footer (`component/footer/`)

**Responsabilidade**: Rodapé da aplicação

```html
<app-footer-component></app-footer-component>
```

---

## Componentes de Domínio

### CardDetailsComponent (`component/card-details-component/`)

**Responsabilidade**: Formulário de dados básicos da receita

**Inputs**: Nenhum

**Outputs**: Nenhum (dados acessíveis via `getDetails()`)

**Propriedades**:

```typescript
recipeName: string = '';        // Nome da receita
servings: number = 0;          // Rendimento
category: string = 'Entrada';  // Categoria
```

**Métodos**:

```typescript
getDetails(): {
  name: string;
  servings: number;
  category: string;
}
```

**Template**:

```html
<section class="card-details">
  <input [(ngModel)]="recipeName" placeholder="Ex: Costela 48h" />
  <input [(ngModel)]="servings" type="number" />
  <select [(ngModel)]="category">
    <option>Entrada</option>
    <option>Prato Principal</option>
    <option>Sobremesa</option>
  </select>
</section>
```

**Exemplo de Uso**:

```typescript
@ViewChild(CardDetailsComponent) detailsComponent!: CardDetailsComponent;

saveRecipe() {
  const details = this.detailsComponent.getDetails();
  console.log(details);
  // { name: "Costela", servings: 12, category: "Prato Principal" }
}
```

---

### TableIngredientsComponent (`component/table-ingredients/`)

**Responsabilidade**: Tabela interativa de ingredientes

**Inputs**: Nenhum

**Outputs**: Nenhum

**Propriedades**:

```typescript
ingredients: Array<{
  name: string;
  netWeight: string;         // PL
  correctionFactor: string;  // FC
  grossWeight: string;       // PB
  cookingFactor: string;     // FCY
  totalQuantity: string;
}> = []
```

**Métodos**:

```typescript
addIngredient(): void         // Adiciona linha vazia
removeIngredient(index): void // Remove ingrediente
```

**Template**:

```html
<table class="table-ingredients">
  <thead>
    <tr>
      <th>INGREDIENTES/UNIDADES</th>
      <th>PL (PESO LÍQUIDO)</th>
      <!-- ... -->
    </tr>
  </thead>
  <tbody>
    @for (item of ingredients; track $index) {
      <tr>
        <td><input [(ngModel)]="item.name" /></td>
        <!-- ... -->
      </tr>
    }
  </tbody>
</table>
```

**Exemplo de Uso**:

```typescript
@ViewChild(TableIngredientsComponent) ingredientsComponent!;

saveRecipe() {
  const ingredients = this.ingredientsComponent.ingredients;
  // Array de ingredientes preenchidos
}
```

---

### CardNutritionalComponent (`component/card-nutritional/`)

**Responsabilidade**: Valores nutricionais por porção

**Inputs**: Nenhum

**Outputs**: Nenhum

**Propriedades**:

```typescript
calories: string = '';       // Ex: "642 kcal"
protein: string = '';        // Ex: "42g"
totalFat: string = '';       // Ex: "38g"
carbs: string = '';          // Ex: "12g"
```

**Métodos**:

```typescript
getNutritional(): {
  calories: string;
  protein: string;
  totalFat: string;
  carbs: string;
}
```

**Template**:

```html
<aside class="card-sidebar-nutritional">
  <h2>Valor Nutricional (por porção)</h2>
  <ul>
    <li>
      <span>CALORIAS</span>
      <input [(ngModel)]="calories" placeholder="642 kcal" />
    </li>
    <!-- ... -->
  </ul>
</aside>
```

**Exemplo de Uso**:

```typescript
@ViewChild(CardNutritionalComponent) nutritionalComponent!;

saveRecipe() {
  const nutri = this.nutritionalComponent.getNutritional();
  // { calories: "642 kcal", protein: "42g", ... }
}
```

---

### PreparationMethodComponent (`component/preparation-method-component/`)

**Responsabilidade**: Passo a passo do preparo

**Inputs**: Nenhum

**Outputs**: Nenhum

**Propriedades**:

```typescript
steps: Array<{
  id: string;          // "01", "02", etc
  title: string;       // Título do passo
  description: string; // Descrição detalhada
  editing: boolean;    // Estado de edição
}> = []
```

**Métodos**:

```typescript
addStep(): void           // Adiciona novo passo
removeStep(index): void   // Remove passo
editStep(step): void      // Entra em modo edição
confirmStep(step): void   // Confirma edição
```

**Template**:

```html
<section class="preparation-method">
  <button (click)="addStep()">Adicionar Passo</button>
  @for (step of steps; track $index) {
    <div class="step">
      <input [(ngModel)]="step.title" />
      <textarea [(ngModel)]="step.description"></textarea>
      <button (click)="removeStep($index)">Remover</button>
    </div>
  }
</section>
```

**Exemplo de Uso**:

```typescript
@ViewChild(PreparationMethodComponent) preparationComponent!;

exportPdf() {
  const steps = this.preparationComponent.steps;
  // Array de passos preenchidos
}
```

---

## Componentes de Página

### MyCollection (`pages/my-collection/`)

**Responsabilidade**: Dashboard de receitas salvas

**Propriedades**:

```typescript
isModalOpen: boolean = false;
recipes: Array<{
  title: string;
  image: string;
}> = [];
```

**Métodos**:

```typescript
openModal(): void        // Abre modal de nova receita
closeModal(): void       // Fecha modal
```

**Features**:

- ✅ Lista de receitas em grid
- ✅ Modal para nova receita
- ✅ Status da conta
- ✅ Busca rápida
- ✅ Menu lateral

**Template Principal**:

```html
<!-- Dashboard Principal -->
<div class="dashboard-container">
  <app-navbar-component></app-navbar-component>
  
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <!-- Status da conta -->
    </aside>
    
    <!-- Main Content -->
    <main class="main-content">
      <!-- Grid de receitas -->
      <section class="recipes-grid-section">
        <article class="recipe-card" *ngFor="let recipe of recipes">
          <!-- Card content -->
        </article>
      </section>
    </main>
  </div>
  
  <app-footer-component></app-footer-component>
</div>

<!-- Modal de Nova Receita -->
<div class="modal-overlay" *ngIf="isModalOpen" (click)="closeModal()">
  <div class="modal-content" (click)="$event.stopPropagation()">
    <button class="modal-close-btn" (click)="closeModal()">✕</button>
    <app-technical-specification [isModal]="true"></app-technical-specification>
  </div>
</div>
```

---

### TechnicalSpecification (`pages/technical-specification/`)

**Responsabilidade**: Editor de fichas técnicas

**Inputs**:

```typescript
@Input() isModal: boolean = false;  // True quando usado em modal
```

**ViewChildren**:

```typescript
@ViewChild(CardDetailsComponent) detailsComponent!;
@ViewChild(TableIngredientsComponent) ingredientsComponent!;
@ViewChild(CardNutritionalComponent) nutritionalComponent!;
@ViewChild(PreparationMethodComponent) preparationComponent!;
```

**Métodos**:

```typescript
saveRecipe(): void      // Coleta dados e envia para backend
exportPdf(): void       // Gera PDF e permite download
```

**Features**:

- ✅ Botões Salvar e Exportar PDF
- ✅ Condicional de navbar/footer
- ✅ Grid layout responsivo
- ✅ Integração com todos os componentes filhos

**Template**:

```html
<div class="card-body">
  <app-navbar-component *ngIf="!isModal"></app-navbar-component>

  <main class="card-content">
    <header class="card-header">
      <h1>Ficha Técnica de Preparo</h1>
      <div class="card-btn-conteiner">
        <button (click)="saveRecipe()">💾 Salvar</button>
        <button (click)="exportPdf()">📄 Exportar PDF</button>
      </div>
    </header>

    <div class="card-grid">
      <app-card-details-component></app-card-details-component>
      <app-table-ingredients-component></app-table-ingredients-component>
      <app-card-nutritional-component></app-card-nutritional-component>
      <app-preparation-method-component></app-preparation-method-component>
    </div>
  </main>

  <app-footer-component *ngIf="!isModal"></app-footer-component>
</div>
```

---

## Padrões de Uso

### 1. Acessar Dados de Componente Filho

```typescript
// Parent Component
export class TechnicalSpecification {
  @ViewChild(CardDetailsComponent) details!: CardDetailsComponent;
  
  saveRecipe() {
    // Acessar método público do filho
    const data = this.details.getDetails();
  }
}

// Child Component
export class CardDetailsComponent {
  recipeName: string = '';
  
  // Método público acessível pelo pai
  getDetails() {
    return { name: this.recipeName };
  }
}
```

### 2. Two-Way Binding

```html
<!-- Template -->
<input [(ngModel)]="recipe.name" />

<!-- TypeScript -->
recipe = { name: '' };
```

### 3. Iterar Arrays

```html
<!-- Angular 17+ @for syntax -->
@for (item of ingredients; track $index) {
  <div>{{ item.name }}</div>
}

<!-- Alternativa *ngFor -->
<div *ngFor="let item of ingredients; let i = index">
  {{ item.name }}
</div>
```

---

## Guia de Criação de Novo Componente

```typescript
// my-new.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-new',
  standalone: true,                    // Standalone
  imports: [FormsModule, CommonModule], // Imports necessários
  templateUrl: './my-new.component.html',
  styleUrl: './my-new.component.scss'
})
export class MyNewComponent {
  // Lógica do componente
}
```

---

## Checklist de Qualidade

- ✅ Component é Standalone?
- ✅ Imports necessários incluídos?
- ✅ Métodos públicos bem nomeados?
- ✅ Template bem estruturado?
- ✅ Estilos isolados (SCSS)?
- ✅ Responsivo (mobile, tablet, desktop)?
- ✅ Acessibilidade (labels, ARIA)?
- ✅ Testes unitários?

---

**Versão**: 1.0.0  
**Última Atualização**: Junho 2026
