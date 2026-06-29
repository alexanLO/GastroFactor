import { Injectable } from '@angular/core';
import { RecipeData } from '../../shared/models/recipe-data.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
  constructor(private readonly notificationService: NotificationService) {}

  generateRecipePdf(recipe: RecipeData): void {
    // Dinamicamente importar jsPDF quando necessário
    import('jspdf').then(({ jsPDF }) => {
      import('html2canvas').then(({ default: html2canvas }) => {
        try {
          // Criar HTML do PDF dinamicamente
          const pdfContent = this.createPdfContent(recipe);
          
          // Criar elemento temporário
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = pdfContent;
          tempDiv.style.position = 'absolute';
          tempDiv.style.left = '-9999px';
          tempDiv.style.width = '210mm';
          tempDiv.style.backgroundColor = 'white';
          tempDiv.style.color = 'black';
          tempDiv.style.fontFamily = 'Arial, sans-serif';
          tempDiv.style.padding = '20mm';
          document.body.appendChild(tempDiv);

          // Renderizar canvas
          html2canvas(tempDiv, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true
          }).then((canvas) => {
            try {
              const imgData = canvas.toDataURL('image/png');
              const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
              });

              const pageWidth = doc.internal.pageSize.getWidth();
              const pageHeight = doc.internal.pageSize.getHeight();
              const imgWidth = pageWidth - 20; // Margem
              const imgHeight = (canvas.height * imgWidth) / canvas.width;
              
              let yPosition = 10;

              // Primeira página
              doc.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);
              let remainingHeight = imgHeight - (pageHeight - 20);

              // Páginas adicionais se necessário
              while (remainingHeight > 0) {
                doc.addPage();
                yPosition = -(remainingHeight - pageHeight + 20);
                doc.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);
                remainingHeight -= pageHeight - 20;
              }

              doc.save(`${this.sanitizeFileName(recipe.details.name) || 'receita'}.pdf`);
              
            } catch (error) {
              console.error('Erro ao gerar PDF:', error);
              this.notificationService.showError('Erro ao exportar PDF. Tente novamente.');
            } finally {
              // Remove elemento temporário
              document.body.removeChild(tempDiv);
            }
          }).catch((error) => {
            console.error('Erro ao processar canvas:', error);
            this.notificationService.showError('Erro ao processar imagem para PDF.');
            document.body.removeChild(tempDiv);
          });
        } catch (error) {
          console.error('Erro ao criar conteúdo PDF:', error);
          this.notificationService.showError('Erro ao preparar PDF para exportacao.');
        }
      }).catch((error) => {
        console.error('Erro ao carregar html2canvas:', error);
        this.notificationService.showError('Erro ao carregar biblioteca de PDF.');
      });
    }).catch((error) => {
      console.error('Erro ao carregar jsPDF:', error);
      this.notificationService.showError('Erro ao carregar biblioteca de PDF.');
    });
  }

  private createPdfContent(recipe: RecipeData): string {
    const safeRecipeName = this.escapeHtml(recipe.details.name) || 'Sem titulo';
    const safeCategory = this.escapeHtml(recipe.details.category);
    const safeServings = Number.isFinite(recipe.details.servings)
      ? recipe.details.servings
      : 0;

    const safeNutritional = {
      calories: this.escapeHtml(recipe.nutritional.calories) || '-',
      protein: this.escapeHtml(recipe.nutritional.protein) || '-',
      totalFat: this.escapeHtml(recipe.nutritional.totalFat) || '-',
      carbs: this.escapeHtml(recipe.nutritional.carbs) || '-',
    };

    const ingredientsHtml = recipe.ingredients
      .map(
        (item) =>
          `<tr>
            <td>${this.escapeHtml(item.name)}</td>
            <td>${this.escapeHtml(item.netWeight)}</td>
            <td>${this.escapeHtml(item.correctionFactor)}</td>
            <td>${this.escapeHtml(item.grossWeight)}</td>
            <td>${this.escapeHtml(item.cookingFactor)}</td>
            <td>${this.escapeHtml(item.totalQuantity)}</td>
          </tr>`
      )
      .join('');

    const stepsHtml = recipe.preparationMethod
      .map(
        (step, index: number) =>
          `<li>
            <strong>${index + 1}. ${this.escapeHtml(step.title)}</strong>
            <p>${this.escapeHtml(step.description)}</p>
          </li>`
      )
      .join('');

    return `
      <style>
        :root {
          --brand: #ff6b35;
          --brand-strong: #e8531f;
          --ink: #1f1f1f;
          --muted: #6b7280;
          --line: #e8e8e8;
          --soft: #fff5ef;
          --surface: #ffffff;
        }

        * { box-sizing: border-box; }

        body {
          font-family: Arial, sans-serif;
          color: var(--ink);
          background: linear-gradient(180deg, #fff9f5 0%, #ffffff 35%);
          margin: 0;
        }

        .pdf-content {
          width: 100%;
        }

        .hero {
          background: linear-gradient(135deg, var(--brand) 0%, var(--brand-strong) 100%);
          color: #fff;
          padding: 18px 20px;
          border-radius: 14px;
          margin-bottom: 16px;
          box-shadow: 0 10px 24px rgba(232, 83, 31, 0.2);
        }

        .hero-eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 10px;
          opacity: 0.95;
          margin-bottom: 8px;
        }

        h1 {
          font-size: 30px;
          line-height: 1.2;
          margin: 0 0 10px;
        }

        .meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .meta-chip {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: 10px;
          padding: 8px 10px;
          font-size: 11px;
        }

        .meta-chip-label {
          display: block;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 4px;
          opacity: 0.9;
        }

        .section {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 14px;
          margin-top: 12px;
        }

        h2 {
          font-size: 16px;
          margin: 0 0 10px;
          color: var(--ink);
          padding-left: 10px;
          border-left: 4px solid var(--brand);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 10px;
          border-radius: 10px;
          overflow: hidden;
        }

        th, td {
          border: 1px solid var(--line);
          padding: 7px;
          text-align: left;
          vertical-align: top;
        }

        th {
          background-color: var(--soft);
          color: var(--brand-strong);
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-size: 9px;
        }

        tbody tr:nth-child(even) { background-color: #fffaf7; }

        .nutritional-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .nutritional-item {
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 8px;
          background: #fff;
        }

        .nutritional-label {
          display: block;
          font-size: 9px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 4px;
        }

        .nutritional-value {
          font-size: 13px;
          font-weight: bold;
          color: var(--ink);
        }

        ol {
          font-size: 11px;
          line-height: 1.6;
          margin: 8px 0 0;
          padding-left: 20px;
        }

        li {
          margin-bottom: 8px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 8px 10px;
          list-style-position: outside;
        }

        li strong {
          display: block;
          margin-bottom: 3px;
          color: var(--brand-strong);
        }

        li p {
          margin: 0;
          color: var(--ink);
        }

        .footer-note {
          margin-top: 12px;
          text-align: right;
          font-size: 9px;
          color: var(--muted);
        }
      </style>
      <div class="pdf-content">
        <section class="hero">
          <div class="hero-eyebrow">GastroFactor - Ficha Tecnica</div>
          <h1>${safeRecipeName}</h1>
          <div class="meta-grid">
            <div class="meta-chip">
              <span class="meta-chip-label">Categoria</span>
              <span>${safeCategory}</span>
            </div>
            <div class="meta-chip">
              <span class="meta-chip-label">Rendimento</span>
              <span>${safeServings} pessoas</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>Ingredientes</h2>
          <table>
            <thead>
              <tr>
                <th>Ingrediente</th>
                <th>Peso Liquido</th>
                <th>Fator Correcao</th>
                <th>Peso Bruto</th>
                <th>Fator Coccao</th>
                <th>Quantidade Total</th>
              </tr>
            </thead>
            <tbody>
              ${ingredientsHtml}
            </tbody>
          </table>
        </section>

        <section class="section">
          <h2>Valor Nutricional</h2>
          <ul class="nutritional-grid">
            <li class="nutritional-item">
              <span class="nutritional-label">Calorias</span>
              <span class="nutritional-value">${safeNutritional.calories}</span>
            </li>
            <li class="nutritional-item">
              <span class="nutritional-label">Proteinas</span>
              <span class="nutritional-value">${safeNutritional.protein}</span>
            </li>
            <li class="nutritional-item">
              <span class="nutritional-label">Gorduras Totais</span>
              <span class="nutritional-value">${safeNutritional.totalFat}</span>
            </li>
            <li class="nutritional-item">
              <span class="nutritional-label">Carboidratos</span>
              <span class="nutritional-value">${safeNutritional.carbs}</span>
            </li>
          </ul>
        </section>

        <section class="section">
          <h2>Modo de Preparo</h2>
          <ol>
            ${stepsHtml}
          </ol>
        </section>

        <div class="footer-note">Documento gerado automaticamente pela plataforma GastroFactor.</div>
      </div>
    `;
  }

  private escapeHtml(value: unknown): string {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private sanitizeFileName(value: string): string {
    return String(value ?? '')
      .replace(/[\\/:*?"<>|]/g, '')
      .trim();
  }
}

