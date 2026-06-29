# Seguranca de Autenticacao - Migracao para Cookie HttpOnly

Este guia define o plano para migrar a autenticacao atual (tokens em localStorage) para um modelo mais seguro com cookie HttpOnly para refresh token, access token de curta duracao e renovacao controlada.

## Objetivos

- Reduzir risco de exfiltracao de tokens por XSS.
- Padronizar expiracao e renovacao de sessao.
- Implementar logout local e logout global.
- Garantir compatibilidade entre frontend Angular e backend.

## Modelo Alvo

- Access token:
  - Curta duracao (ex.: 10 a 15 minutos).
  - Pode ficar em memoria (frontend) ou ser retornado em resposta e reutilizado ate expirar.
- Refresh token:
  - Cookie HttpOnly, Secure, SameSite adequado.
  - Rotacao em cada renovacao.
  - Nunca exposto para JavaScript.
- Sessao:
  - Backed por storage de sessao no backend (ou blacklist/whitelist de refresh tokens).

## Mudancas Necessarias no Backend

1. Endpoints de autenticacao
- POST /v1/auth/login:
  - Retorna access token no body.
  - Seta refresh token em cookie HttpOnly.
- POST /v1/auth/refresh:
  - Le refresh token via cookie HttpOnly.
  - Valida e rotaciona refresh token.
  - Retorna novo access token e atualiza cookie.
- POST /v1/auth/logout:
  - Invalida sessao/refresh token no servidor.
  - Expira cookie no response.
- POST /v1/auth/logout-all:
  - Invalida todas as sessoes do usuario.

2. Configuracoes de cookie
- HttpOnly: true
- Secure: true em producao
- SameSite:
  - Lax para mesmo dominio/subdominio simples
  - None + Secure para cenario cross-site
- Path: /v1/auth (ou / se necessario)
- Max-Age alinhado a politica de sessao

3. CORS e credenciais
- Access-Control-Allow-Credentials: true
- Origem explicita (sem wildcard) para frontend
- Frontend deve enviar withCredentials: true

4. Persistencia e revogacao
- Armazenar refresh token hasheado no servidor.
- Rotacionar refresh token por uso.
- Detectar reutilizacao de token rotacionado e invalidar cadeia.

## Mudancas Necessarias no Frontend

1. AuthService
- Parar de persistir refresh token em localStorage.
- Opcional: manter access token apenas em memoria.
- Login com withCredentials habilitado.
- Fluxo de refresh via endpoint dedicado quando houver 401 por expiracao.

2. Http Interceptor de autenticacao
- Em 401 por expiracao de access token:
  - Tentar refresh uma vez.
  - Repetir request original se refresh funcionar.
  - Fazer logout se refresh falhar.
- Evitar loops de refresh.

3. Logout
- Logout local:
  - Limpar estado em memoria.
  - Chamar endpoint de logout para expirar cookie.
- Logout global:
  - Chamar endpoint logout-all.
  - Redirecionar para tela publica.

## Politica de Expiracao e Renovacao

- Access token:
  - TTL: 10 a 15 minutos.
  - Sem renovacao silenciosa continua alem do limite de sessao.
- Refresh token:
  - TTL: 7 a 30 dias (conforme regra de negocio).
  - Rotacao obrigatoria por renovacao.
- Sessao maxima (absolute timeout):
  - Ex.: 8 a 24 horas para sessao ativa web.
- Idle timeout:
  - Ex.: 30 a 60 minutos sem atividade invalida sessao.
- Clock skew:
  - Tolerancia de 30 a 60 segundos nas validacoes de exp.

## Politica de Logout Global

- Definicao:
  - Encerrar todas as sessoes ativas do usuario em todos os dispositivos.
- Disparadores:
  - Acao manual do usuario em seguranca da conta.
  - Evento de risco (reutilizacao de refresh token, troca de senha, suspeita de invasao).
- Efeito esperado:
  - Invalidacao server-side de todas as sessoes.
  - Tokens antigos deixam de funcionar imediatamente.

## Plano de Migracao por Fases

Fase 1 - Preparacao
- Implementar endpoint /refresh com cookie HttpOnly.
- Ajustar CORS para credenciais.
- Adicionar flag de rollout no backend.

Fase 2 - Dual mode
- Aceitar modelo atual e novo temporariamente.
- Frontend passa a usar withCredentials e fluxo de refresh.
- Medir taxa de sucesso de renovacao e erros 401.

Fase 3 - Cutover
- Descontinuar refresh token em localStorage.
- Forcar renovacao somente por cookie HttpOnly.
- Monitorar erros e rollback plan.

Fase 4 - Hardening
- Rotacao obrigatoria + deteccao de reutilizacao.
- Auditoria e alertas de seguranca.
- Revisao de headers de seguranca (CSP, X-Frame-Options, etc.).

## Checklist de Implementacao

Backend
- [ ] Login seta refresh token em cookie HttpOnly.
- [ ] Endpoint refresh implementado com rotacao.
- [ ] Endpoint logout invalida sessao e expira cookie.
- [ ] Endpoint logout-all invalida todas as sessoes.
- [ ] CORS com credentials configurado corretamente.

Frontend
- [ ] Requests de auth com withCredentials.
- [ ] Interceptor de refresh com retry unico.
- [ ] Sem refresh token em localStorage/sessionStorage.
- [ ] Logout local e global integrados com backend.
- [ ] Tratamento de falha de refresh com redirecionamento seguro.

Governanca
- [ ] Politica de expiracao aprovada.
- [ ] Politica de logout global publicada.
- [ ] Runbook de incidentes de autenticacao documentado.
