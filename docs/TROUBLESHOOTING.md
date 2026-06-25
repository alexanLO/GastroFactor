# 🔧 Troubleshooting e FAQ

Soluções para problemas comuns e perguntas frequentes.

## 🆘 Problemas Comuns

### Problema: "Port 4200 is already in use"

**Causa**: Outra aplicação está usando a porta 4200

**Solução 1**: Usar porta diferente

```bash
ng serve --port 4300
npm start -- --port 4300
```

**Solução 2**: Matar processo que ocupa a porta

Windows:

```bash
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

Linux/Mac:

```bash
lsof -i :4200
kill -9 <PID>
```

---

### Problema: "Cannot find module '@angular/...'"

**Causa**: Dependências não instaladas

**Solução**:

```bash
npm install
npm install --save-dev
```

Se persistir:

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

### Problema: "ExpressionChangedAfterItHasBeenCheckedError"

**Causa**: Mudança de estado após ciclo de detecção de mudanças

**Solução**: Usar `ChangeDetectionStrategy.OnPush`

```typescript
@Component({
  selector: 'app-my-component',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {}
```

---

### Problema: "PDF não exporta corretamente"

**Causa**: Imagens quebradas ou html2canvas com erro

**Solução**: Verificar console para erros

```typescript
// Verificar se jsPDF/html2canvas estão importados
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
```

Reinstalar se necessário:

```bash
npm uninstall jspdf html2canvas
npm install jspdf html2canvas --save
```

---

### Problema: "Testes falhando com 'Cannot find module'"

**Causa**: Configuração de testes incorreta

**Solução**: Verificar `tsconfig.spec.json`

```json
{
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jasmine"],
    "esModuleInterop": true,
    "emitDecoratorMetadata": true
  },
  "files": ["src/test.ts"],
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

---

### Problema: "SCSS não está sendo compilado"

**Causa**: SCSS é padrão no Angular, pode haver erro de sintaxe

**Solução**: Verificar sintaxe SCSS

```scss
// ✅ Correto
.container {
  padding: 1rem;
  
  &__item {
    color: blue;
  }
}

// ❌ Errado - falta &
.container {
  padding: 1rem;
  
  .item {  // Isso vai gerar .container .item
    color: blue;
  }
}
```

---

### Problema: "ngModel não funciona"

**Causa**: FormsModule não importado

**Solução**: Adicionar FormsModule ao componente

```typescript
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule]  // ← Adicionar
})
export class MyComponent {}
```

---

### Problema: "API retorna 404"

**Causa**: Endpoint incorreto ou backend offline

**Solução 1**: Verificar URL da API

```typescript
// core/services/recipe.service.ts
private apiUrl = '/api/recipes';  // Está correto?
```

**Solução 2**: Verificar backend está rodando

```bash
# Se backend em Node/Express
npm start  # Na pasta do backend

# Testar endpoint
curl http://localhost:3000/api/recipes
```

**Solução 3**: CORS

```typescript
// Se erro CORS, adicionar ao backend (Express)
const cors = require('cors');
app.use(cors());
```

---

### Problema: "localStorage não funciona"

**Causa**: Modo incógnito do navegador

**Solução**: Usar alternativa

```typescript
// Verificar disponibilidade
if (localStorage) {
  localStorage.setItem('token', value);
} else {
  // Usar alternativa como sessionStorage
  sessionStorage.setItem('token', value);
}
```

---

## ❓ Perguntas Frequentes (FAQ)

### P: Como adicionar uma nova página?

**R**:

```bash
ng generate component pages/nova-pagina

# Ou manualmente
# 1. Criar pasta em src/app/pages/
# 2. Adicionar arquivo .ts, .html, .scss
# 3. Adicionar rota em app.routes.ts
```

```typescript
// app.routes.ts
const routes: Routes = [
  {
    path: 'nova-pagina',
    component: NovaPageComponent
  }
];
```

---

### P: Como adicionar um novo serviço?

**R**:

```bash
ng generate service core/services/meu-servico

# Resultado: core/services/meu-servico.service.ts
```

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Singleton global
})
export class MeuServicoService {
  constructor() {}
}
```

---

### P: Como fazer requisição HTTP?

**R**:

```typescript
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MeuServico {
  constructor(private http: HttpClient) {}
  
  getDados() {
    return this.http.get('/api/dados');
  }
  
  saveDados(data) {
    return this.http.post('/api/dados', data);
  }
}
```

Usar em componente:

```typescript
constructor(private servico: MeuServico) {}

ngOnInit() {
  this.servico.getDados().subscribe(
    (dados) => console.log(dados),
    (erro) => console.error(erro)
  );
}
```

---

### P: Como debugar Angular?

**R**:

1. **Console do Navegador** (F12)

   ```typescript
   console.log('Debug:', this.recipe);
   ```

2. **Angular DevTools Extension**
   - Instalar em Chrome/Firefox
   - Abre "Angular" no DevTools

3. **VSCode Debugger**

   ```json
   // .vscode/launch.json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Launch Chrome",
         "type": "chrome",
         "request": "launch",
         "url": "http://localhost:4200",
         "webRoot": "${workspaceFolder}/src",
         "sourceMapPathOverride": {
           "webpack:///./*": "${webspaceRoot}/*"
         }
       }
     ]
   }
   ```

---

### P: Como otimizar performance?

**R**:

1. **Lazy Loading de Rotas**

   ```typescript
   const routes: Routes = [
     {
       path: 'auth',
       loadChildren: () => import('./features/auth/...').then(m => m.AuthRoutes)
     }
   ];
   ```

2. **OnPush Change Detection**

   ```typescript
   @Component({
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   ```

3. **Unsubscribe de Observables**

   ```typescript
   private destroy$ = new Subject<void>();
   
   ngOnInit() {
     this.service.getData().pipe(
       takeUntil(this.destroy$)
     ).subscribe(...);
   }
   
   ngOnDestroy() {
     this.destroy$.next();
     this.destroy$.complete();
   }
   ```

4. **Build de Produção**

   ```bash
   npm run build
   # Ativa tree-shaking, minificação, etc
   ```

---

### P: Como testar um componente?

**R**:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MyComponent } from './my.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent, FormsModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should update name', () => {
    component.name = 'Test';
    expect(component.name).toBe('Test');
  });
});
```

---

### P: Como comunicar entre componentes?

**R**:

1. **Parent → Child** (com @Input)

   ```typescript
   // Child
   @Input() data: string;
   
   // Parent Template
   <app-child [data]="'valor'"></app-child>
   ```

2. **Child → Parent** (com @Output)

   ```typescript
   // Child
   @Output() updated = new EventEmitter<string>();
   
   onUpdate() {
     this.updated.emit('novo valor');
   }
   
   // Parent Template
   <app-child (updated)="onChildUpdate($event)"></app-child>
   ```

3. **Entre Componentes Distantes** (com Service)

   ```typescript
   // Serviço
   @Injectable({ providedIn: 'root' })
   export class ComService {
     private message$ = new Subject<string>();
     
     send(msg: string) {
       this.message$.next(msg);
     }
     
     receive() {
       return this.message$.asObservable();
     }
   }
   
   // Componente 1 (emissor)
   constructor(private service: ComService) {}
   send() {
     this.service.send('Olá!');
   }
   
   // Componente 2 (receptor)
   constructor(private service: ComService) {}
   ngOnInit() {
     this.service.receive().subscribe(msg => {
       console.log(msg);
     });
   }
   ```

---

### P: Como fazer deploy?

**R**: Consulte [DEPLOYMENT.md](./DEPLOYMENT.md) (em breve)

Resumo rápido:

```bash
# Build para produção
npm run build

# Gera pasta dist/ pronta para deploy
# Fazer upload para seu servidor/cloud

# Popular exemplos:
# - Vercel
# - Netlify
# - Azure App Service
# - AWS S3 + CloudFront
```

---

### P: Como contribuir com melhorias?

**R**: Leia [CONTRIBUTING.md](../CONTRIBUTING.md)

Resumo:

1. Fork o repositório
2. Criar branch: `git checkout -b feature/melhoria`
3. Commit: `git commit -m "feat: descrição"`
4. Push: `git push origin feature/melhoria`
5. Abrir Pull Request

---

## 📊 Informações de Compatibilidade

| Tecnologia | Versão Mínima | Versão Usada |
|------------|---------------|-------------|
| Node.js | 18.0.0 | 20.x LTS |
| npm | 9.0.0 | 10.x |
| Angular | 21.0.0 | 21.2.13 |
| TypeScript | 5.2.0 | 5.5.x |
| Chrome | 120+ | Latest |
| Firefox | 121+ | Latest |
| Safari | 17+ | Latest |
| Edge | 120+ | Latest |

---

## 🔍 Logs Úteis

### Ver logs do servidor

```bash
ng serve --verbose
```

### Ver logs de build

```bash
ng build --verbose
```

### Ver logs de testes

```bash
ng test --verbose
```

---

## 📞 Contato e Suporte

- **Issues**: [GitHub Issues](https://github.com/alexanLO/GastroFactor/issues)
- **Discussões**: [GitHub Discussions](https://github.com/alexanLO/GastroFactor/discussions)
- **Email**: alexanlima.works@gmail.com

---

**Versão**: 1.0.0  
**Última Atualização**: Junho 2026
