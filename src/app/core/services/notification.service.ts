import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly defaultDurationMs = 5000;

  showError(message: string): void {
    this.showToast(message, this.defaultDurationMs, '#b91c1c');
  }

  showSuccess(message: string): void {
    this.showToast(message, 3000, '#166534');
  }

  private showToast(message: string, durationMs: number, backgroundColor: string): void {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.top = '16px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.zIndex = '9999';
    toast.style.background = backgroundColor;
    toast.style.color = '#ffffff';
    toast.style.padding = '10px 14px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
    toast.style.fontSize = '14px';
    toast.style.maxWidth = '90vw';

    document.body.appendChild(toast);
    window.setTimeout(() => {
      toast.remove();
    }, durationMs);
  }
}
