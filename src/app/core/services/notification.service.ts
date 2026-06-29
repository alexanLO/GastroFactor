import { Injectable } from '@angular/core';

type ToastKind = 'success' | 'validation' | 'server';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastOptions {
  durationMs?: number;
  action?: ToastAction;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly containerId = 'gf-toast-container';
  private readonly defaultDurationMs = 5000;

  showError(message: string, options?: ToastOptions): void {
    this.showToast(message, this.resolveErrorKind(message), options?.durationMs ?? this.defaultDurationMs, options);
  }

  showSuccess(message: string, options?: ToastOptions): void {
    this.showToast(message, 'success', options?.durationMs ?? 3000, options);
  }

  showErrorWithRetry(message: string, onRetry: () => void): void {
    this.showError(message, {
      action: {
        label: 'Tentar novamente',
        onClick: onRetry,
      },
    });
  }

  private showToast(message: string, kind: ToastKind, durationMs: number, options?: ToastOptions): void {
    if (typeof document === 'undefined') {
      return;
    }

    const container = this.getOrCreateContainer();

    const toast = document.createElement('article');
    toast.className = `gf-toast gf-toast--${kind}`;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', kind === 'success' ? 'polite' : 'assertive');

    const icon = document.createElement('span');
    icon.className = 'gf-toast__icon';
    icon.textContent = this.getIcon(kind);
    icon.setAttribute('aria-hidden', 'true');

    const content = document.createElement('div');
    content.className = 'gf-toast__content';

    const title = document.createElement('strong');
    title.className = 'gf-toast__title';
    title.textContent = this.getTitle(kind);

    const description = document.createElement('p');
    description.className = 'gf-toast__description';
    description.textContent = message;

    const closeButton = document.createElement('button');
    closeButton.className = 'gf-toast__close';
    closeButton.type = 'button';
    closeButton.textContent = 'Fechar';
    closeButton.setAttribute('aria-label', 'Fechar notificação');

    let actionButton: HTMLButtonElement | null = null;

    if (options?.action) {
      actionButton = document.createElement('button');
      actionButton.className = 'gf-toast__action';
      actionButton.type = 'button';
      actionButton.textContent = options.action.label;
      actionButton.setAttribute('aria-label', options.action.label);
    }

    const progress = document.createElement('span');
    progress.className = 'gf-toast__progress';
    progress.style.animationDuration = `${durationMs}ms`;

    content.appendChild(title);
    content.appendChild(description);
    toast.appendChild(icon);
    toast.appendChild(content);
    if (actionButton) {
      toast.appendChild(actionButton);
    }
    toast.appendChild(closeButton);
    toast.appendChild(progress);

    const removeToast = () => {
      toast.classList.add('gf-toast--closing');
      window.setTimeout(() => {
        toast.remove();

        if (container.childElementCount === 0) {
          container.remove();
        }
      }, 200);
    };

    closeButton.addEventListener('click', removeToast);

    if (actionButton && options?.action) {
      actionButton.addEventListener('click', () => {
        options.action?.onClick();
        removeToast();
      });
    }

    container.appendChild(toast);

    window.setTimeout(() => {
      removeToast();
    }, durationMs);
  }

  private getOrCreateContainer(): HTMLElement {
    const existing = document.getElementById(this.containerId);

    if (existing) {
      return existing;
    }

    const container = document.createElement('section');
    container.id = this.containerId;
    container.className = 'gf-toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-label', 'Notificações do sistema');

    document.body.appendChild(container);
    return container;
  }

  private resolveErrorKind(message: string): ToastKind {
    const normalized = message.toLowerCase();

    const validationHints = ['inval', 'campo', 'obrigat', 'revise', 'conflito'];
    if (validationHints.some((hint) => normalized.includes(hint))) {
      return 'validation';
    }

    return 'server';
  }

  private getIcon(kind: ToastKind): string {
    if (kind === 'success') {
      return 'ok';
    }

    if (kind === 'validation') {
      return 'i';
    }

    return '!';
  }

  private getTitle(kind: ToastKind): string {
    if (kind === 'success') {
      return 'Sucesso';
    }

    if (kind === 'validation') {
      return 'Atenção';
    }

    return 'Erro';
  }
}
