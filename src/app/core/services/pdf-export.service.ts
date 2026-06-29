import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
  constructor(private readonly notificationService: NotificationService) {}

  generateRecipePdf(recipe: any): void {
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

              doc.save(`${recipe.details.name || 'receita'}.pdf`);
              
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

  private createPdfContent(recipe: any): string {
    const ingredientsHtml = recipe.ingredients
      .map(
        (item: any) =>
          `<tr>
            <td>${item.name || ''}</td>
            <td>${item.netWeight || ''}</td>
            <td>${item.correctionFactor || ''}</td>
            <td>${item.grossWeight || ''}</td>
            <td>${item.cookingFactor || ''}</td>
            <td>${item.totalQuantity || ''}</td>
          </tr>`
      )
      .join('');

    const stepsHtml = recipe.preparationMethod
      .map(
        (step: any, index: number) =>
          `<li>
            <strong>${index + 1}. ${step.title || ''}</strong>
            <p>${step.description || ''}</p>
          </li>`
      )
      .join('');

    return `
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        h1 { font-size: 28px; margin-bottom: 10px; color: #1a1a1a; border-bottom: 3px solid #ff6b35; padding-bottom: 10px; }
        h2 { font-size: 18px; margin-top: 20px; margin-bottom: 10px; color: #333; border-left: 4px solid #ff6b35; padding-left: 10px; }
        p { font-size: 12px; line-height: 1.6; margin: 8px 0; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 11px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f5f5f5; font-weight: bold; color: #333; }
        tbody tr:nth-child(even) { background-color: #fafafa; }
        ul, ol { font-size: 12px; line-height: 1.8; margin: 10px 0; padding-left: 20px; }
        li { margin-bottom: 8px; }
        strong { color: #333; font-weight: bold; }
        .pdf-content { width: 100%; }
      </style>
      <div class="pdf-content">
        <h1>${recipe.details.name || 'Sem título'}</h1>
        <p><strong>Categoria:</strong> ${recipe.details.category || ''}</p>
        <p><strong>Rendimento:</strong> ${recipe.details.servings || 0} pessoas</p>
        
        <h2>Ingredientes</h2>
        <table>
          <thead>
            <tr>
              <th>Ingrediente</th>
              <th>Peso Líquido</th>
              <th>Fator Correção</th>
              <th>Peso Bruto</th>
              <th>Fator Cocção</th>
              <th>Quantidade Total</th>
            </tr>
          </thead>
          <tbody>
            ${ingredientsHtml}
          </tbody>
        </table>

        <h2>Valor Nutricional</h2>
        <ul>
          <li><strong>Calorias:</strong> ${recipe.nutritional.calories || '-'}</li>
          <li><strong>Proteínas:</strong> ${recipe.nutritional.protein || '-'}</li>
          <li><strong>Gorduras Totais:</strong> ${recipe.nutritional.totalFat || '-'}</li>
          <li><strong>Carboidratos:</strong> ${recipe.nutritional.carbs || '-'}</li>
        </ul>

        <h2>Modo de Preparo</h2>
        <ol>
          ${stepsHtml}
        </ol>
      </div>
    `;
  }
}

