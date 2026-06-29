# Guia de Ambientes

Este guia descreve como o frontend seleciona configuracoes por ambiente.

## Arquivos de ambiente

Localizados em `src/environments/`:

- `environment.ts` (base)
- `environment.local.ts`
- `environment.hom.ts`
- `environment.prod.ts`

Cada arquivo exporta:

- `production: boolean`
- `baseAddress: string`

## Mapeamento no angular.json

### Build

- `production`: substitui `environment.ts` por `environment.prod.ts`
- `homologation`: substitui por `environment.hom.ts`
- `local`: substitui por `environment.local.ts`

### Serve

- `ng serve --configuration production`
- `ng serve --configuration homologation`
- `ng serve --configuration local`

## Exemplos de baseAddress

Use valores coerentes com sua infraestrutura:

- local: `http://localhost:8080`
- homologacao: `https://api-hom.seudominio.com`
- producao: `https://api.seudominio.com`

## Boas praticas

- Nao commitar segredos em arquivos de ambiente
- Manter apenas endpoint/base URL no frontend
- Centralizar autenticao sensivel no backend (cookie HttpOnly)
- Revisar `production: true` apenas no arquivo de producao

## Checklist rapido

- Arquivo de ambiente existe em `src/environments/`
- `fileReplacements` configurado no `angular.json`
- `baseAddress` validado para cada ambiente
- Build e teste executados apos alterar endpoints
