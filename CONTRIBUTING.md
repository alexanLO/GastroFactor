# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o GastroFactor! Este documento fornece diretrizes e instruções para contribuição.

## 📋 Código de Conduta

### Nossa Comunidade

Somos comprometidos em fornecer um ambiente acolhedor e inspirador para todos.

**Expectativas**:
- ✅ Use linguagem acolhedora e inclusiva
- ✅ Seja respeitoso com pontos de vista diferentes
- ✅ Aceite críticas construtivas
- ✅ Foque no que é melhor para a comunidade

**Comportamentos Inaceitáveis**:
- ❌ Linguagem ofensiva ou discriminatória
- ❌ Assédio pessoal
- ❌ Ataques políticos ou religiosos
- ❌ Spam

## 🎯 Como Contribuir

### 1. Reportar Bugs

Abra uma [Issue](https://github.com/alexanLO/GastroFactor/issues) com:

**Template**:
```markdown
## Descrição
Descrição clara do bug

## Passos para Reproduzir
1. Passo 1
2. Passo 2
3. Passo 3

## Comportamento Esperado
O que deveria acontecer

## Comportamento Atual
O que realmente acontece

## Screenshots
(se aplicável)

## Ambiente
- OS: [ex: Windows 10, macOS, Ubuntu 20.04]
- Navegador: [ex: Chrome, Firefox, Safari]
- Versão Node: [ex: 18.0.0]
- Angular CLI: [ex: 21.2.0]

## Logs/Erros
(se houver)
```

### 2. Sugerir Melhorias

Abra uma Issue com o label `enhancement`:

```markdown
## Descrição
Explicar a melhoria proposta

## Motivação
Por que isso seria útil?

## Exemplo
Como você imaginaria a feature funcionando?
```

### 3. Contribuir com Código

#### Pré-requisitos

- Node.js v18+
- npm v9+
- Git
- Familiaridade com Angular 21

#### Fluxo Git

```bash
# 1. Fork o repositório
git clone https://github.com/seu-usuario/GastroFactor.git
cd GastroFactor

# 2. Criar branch feature
git checkout -b feature/sua-feature

# 3. Criar branch bugfix
git checkout -b bugfix/nome-do-bug

# 4. Commits com mensagens claras
git commit -m "feat: adiciona nova funcionalidade"

# 5. Push para o fork
git push origin feature/sua-feature

# 6. Abrir Pull Request
```

#### Nomes de Branch

**Padrão**: `tipo/nome-descritivo`

```
feature/modal-technical-specification
bugfix/pdf-export-error
refactor/service-layer
docs/readme-update
```

#### Padrões de Commit

**Formato**: `tipo(escopo): descrição`

```
feat(table-ingredients): adiciona filtro de ingredientes
fix(pdf-export): corrige renderização de múltiplas páginas
refactor(recipe-service): simplifica lógica de validação
docs(api): adiciona documentação de endpoints
test(card-details): adiciona testes unitários
chore(deps): atualiza dependências
```

**Tipos**:
- `feat` - Nova funcionalidade
- `fix` - Correção de bug
- `refactor` - Mudança de código sem funcionalidade nova
- `docs` - Mudanças de documentação
- `test` - Adição/modificação de testes
- `chore` - Mudanças de build, deps, etc

**Exemplo Completo**:
```
feat(my-collection): implementa modal de nova receita

- Adiciona componente ModalOverlay
- Implementa animações de fade-in/out
- Integra TechnicalSpecification como conteúdo do modal
- Adiciona testes para comportamento do modal

Closes #123
```

## 💻 Padrões de Código

### TypeScript

```typescript
// ✅ BOM
export class RecipeService {
  private apiUrl = '/api/recipes';
  
  constructor(private http: HttpClient) {}
  
  saveRecipe(recipe: RecipeData): Observable<any> {
    return this.http.post(this.apiUrl, recipe);
  }
}

// ❌ RUIM
export class recipeService {
  apiUrl = '/api/recipes';
  
  constructor(private http: HttpClient) {}
  
  save(r) {
    return this.http.post(this.apiUrl, r);
  }
}
```

**Convenções**:
- Classes e Interfaces: `PascalCase`
- Propriedades e métodos: `camelCase`
- Constantes: `UPPER_SNAKE_CASE`
- Privados: prefixo `_` (ex: `_internalMethod`)

### Componentes

```typescript
// ✅ BOM
@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent {
  @Input() initialData?: RecipeDetails;
  @Output() updated = new EventEmitter<RecipeDetails>();
  
  recipeName: string = '';
  servings: number = 0;
  
  onUpdate() {
    this.updated.emit(this.getDetails());
  }
  
  getDetails(): RecipeDetails {
    return {
      name: this.recipeName,
      servings: this.servings
    };
  }
}

// ❌ RUIM
@Component({
  selector: 'card-details',
  template: `...`,
  styles: [`...`]
})
export class CardDetails {
  name = '';
  render() { /* ... */ }
}
```

### SCSS

```scss
// ✅ BOM
.card-details-component {
  padding: $spacing-unit * 2;
  background-color: $surface;
  border-radius: $radius-md;
  
  &__input {
    @include focus-visible;
    font-size: $font-size-body;
  }
  
  &:hover {
    box-shadow: $shadow-md;
  }
}

// ❌ RUIM
.card {
  padding: 32px;
  background: #1a1a1a;
  
  input {
    font-size: 16px;
  }
  
  input:focus {
    outline: 2px solid blue;
  }
}
```

## 🧪 Testes

### Requisitos

- Toda funcionalidade nova deve ter testes
- Mínimo 80% de cobertura
- Testes devem ser determinísticos (não flaky)

### Executar Testes

```bash
npm test
npm test -- --watch          # Modo watch
npm test -- --code-coverage  # Com cobertura
```

### Exemplo de Teste

```typescript
describe('RecipeService', () => {
  let service: RecipeService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecipeService]
    });
    
    service = TestBed.inject(RecipeService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
  
  describe('saveRecipe', () => {
    it('should POST to /api/recipes', () => {
      const mockRecipe: RecipeData = {
        /* dados mock */
      };
      
      service.saveRecipe(mockRecipe).subscribe(response => {
        expect(response.id).toBeDefined();
      });
      
      const req = httpMock.expectOne('/api/recipes');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRecipe);
      
      req.flush({ id: 'recipe_123' });
    });
    
    it('should handle errors', () => {
      const mockRecipe: RecipeData = { /* ... */ };
      
      service.saveRecipe(mockRecipe).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });
      
      const req = httpMock.expectOne('/api/recipes');
      req.flush({ error: 'Validation failed' }, { status: 400, statusText: 'Bad Request' });
    });
  });
});
```

## 📝 Documentação

### Comentários

```typescript
// ✅ Bom
/**
 * Salva uma receita no backend
 * @param recipe - Dados completos da receita
 * @returns Observable com resposta do servidor
 */
saveRecipe(recipe: RecipeData): Observable<any> {
  // ...
}

// ❌ Ruim
// save recipe
save(r) {
  // ...
}
```

### Atualizações de Documentação

Ao adicionar features, atualize:
- `README.md` - Se impactar uso geral
- `docs/ARCHITECTURE.md` - Se mudar arquitetura
- `docs/COMPONENTS.md` - Se adicionar componente
- `docs/API.md` - Se adicionar endpoint
- Comentários no código - Sempre

## 🔍 Checklist antes de Submeter PR

- ✅ Código segue padrões do projeto
- ✅ Testes foram adicionados/atualizados
- ✅ Testes passam: `npm test`
- ✅ Build funciona: `npm run build`
- ✅ Documentação foi atualizada
- ✅ Commits têm mensagens claras
- ✅ Branch está atualizado com `main`
- ✅ Sem conflitos de merge

## 📌 Processo de Pull Request

### 1. Criar PR

```markdown
## Descrição
Explicar brevemente o que foi mudado

## Tipo de Mudança
- [ ] Nova funcionalidade
- [ ] Correção de bug
- [ ] Breaking change
- [ ] Atualização de documentação

## Testado em
- [ ] Windows
- [ ] macOS
- [ ] Linux

## Checklist
- [ ] Código segue padrões do projeto
- [ ] Testes foram adicionados
- [ ] Documentação foi atualizada

## Links Relacionados
Closes #123
```

### 2. Code Review

- Reviewer irá verificar código
- Pode pedir mudanças
- Discussões são bem-vindas

### 3. Merge

Após aprovação, o PR será merged em `develop`.

## 🚀 Fluxo de Release

```
main (produção) ← develop (staging) ← feature branches
```

1. PRs são merged em `develop`
2. Testes em staging
3. Release em `main`
4. Deploy em produção

## 📚 Recursos

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [RxJS Best Practices](https://rxjs.dev)

## 💬 Perguntas?

- Abra uma Issue com label `question`
- Discord: [Link do servidor] (em breve)
- Email: contato@gastrofactor.com

## 🎉 Obrigado!

Suas contribuições tornam este projeto melhor para todos!

---

**Versão**: 1.0.0  
**Última Atualização**: Junho 2026
