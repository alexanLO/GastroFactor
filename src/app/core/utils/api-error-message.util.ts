import { HttpErrorResponse } from '@angular/common/http';

const STATUS_MESSAGES: Record<number, string> = {
  0: 'Nao foi possivel conectar ao servidor. Verifique sua conexao e tente novamente.',
  400: 'A requisicao enviada e invalida. Revise os dados e tente novamente.',
  401: 'Sua sessao expirou. Faça login novamente para continuar.',
  403: 'Voce nao tem permissao para executar esta acao.',
  404: 'O recurso solicitado nao foi encontrado.',
  409: 'Conflito de dados detectado. Atualize a tela e tente novamente.',
  422: 'Alguns dados informados sao invalidos. Revise os campos e tente novamente.',
  429: 'Muitas tentativas em pouco tempo. Aguarde alguns instantes e tente de novo.',
  500: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.',
  502: 'Servico temporariamente indisponivel. Tente novamente em instantes.',
  503: 'Servico em manutencao ou indisponivel. Tente novamente mais tarde.',
  504: 'Tempo limite excedido no servidor. Tente novamente.',
};

export function resolveApiErrorMessage(error: HttpErrorResponse): string {
  if (error.error instanceof ErrorEvent) {
    return `Erro de rede: ${error.error.message}`;
  }

  if (typeof error.error === 'string' && error.error.trim().length > 0) {
    return error.error.trim();
  }

  if (error.error && typeof error.error === 'object' && typeof error.error.message === 'string') {
    const message = error.error.message.trim();
    if (message.length > 0) {
      return message;
    }
  }

  return STATUS_MESSAGES[error.status] || 'Nao foi possivel concluir a operacao. Tente novamente.';
}

export function resolveUnknownErrorMessage(
  error: unknown,
  fallback = 'Nao foi possivel concluir a operacao. Tente novamente.',
): string {
  if (error instanceof HttpErrorResponse) {
    return resolveApiErrorMessage(error);
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'string' && error.trim().length > 0) {
    return error.trim();
  }

  return fallback;
}
