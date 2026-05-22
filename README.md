# Hub Inteligência Agro

Plataforma frontend do Hub de Inteligência Agro, construída com TanStack Start (SSR), React 19, TypeScript e shadcn/ui.

---

## Stack Principal

| Camada | Tecnologia |
|---|---|
| Framework | TanStack Start + Nitro |
| UI | React 19 + shadcn/ui (radix-nova) |
| Estilização | Tailwind CSS 4 + tw-animate-css |
| Roteamento | TanStack Router (file-based) |
| Data Fetching | TanStack Query v5 + Axios |
| Estado Global | Zustand v5 |
| Animações | Motion (Framer Motion v12) |
| Ícones | Lucide React |
| Tipagem | TypeScript 5 (strict) |
| Bundler | Vite 7 |
| Testes | Vitest + Testing Library |
| Lint/Format | Biome + ESLint (TanStack config) |

---

## Estrutura de Pastas

```
src/
├── api/              # Instância Axios e funções de acesso à API
├── components/
│   ├── ui/           # Componentes shadcn/ui (gerados via CLI)
│   └── customs/      # Componentes de negócio reutilizáveis
├── hooks/
│   └── api/          # Hooks TanStack Query por domínio (ex: useUser.ts)
├── lib/
│   └── utils.ts      # Utilitários (cn, helpers)
├── routes/           # Rotas file-based (geração automática do routeTree)
│   ├── __root.tsx    # Layout raiz + providers globais
│   └── index.tsx     # Rota "/"
├── zustand/          # Stores Zustand por domínio
├── styles.css        # CSS global + tokens Tailwind/shadcn
└── router.tsx        # Configuração do TanStack Router
```

---

## Iniciando o projeto

### Pré-requisitos

- Node.js >= 20
- npm >= 10

### Instalação

```bash
npm install
```

### Variáveis de ambiente

Copie o arquivo de exemplo e preencha com os valores corretos:

```bash
cp .env.example .env
```

| Variável | Descrição |
|---|---|
| `VITE_URL_API` | URL base da API backend |

### Desenvolvimento

```bash
npm run dev
# Acesse http://localhost:1234
```

### Outros comandos

```bash
npm run build       # Build de produção
npm run preview     # Pré-visualizar o build
npm run typecheck   # Checagem de tipos TypeScript
npm run lint        # ESLint
npm run format      # Prettier (formata todos os .ts/.tsx)
npm run test        # Testes com Vitest
```

---

## Adicionando componentes shadcn/ui

```bash
npx shadcn@latest add <nome-do-componente>
# Exemplo:
npx shadcn@latest add dialog
npx shadcn@latest add data-table
```

Os componentes são instalados em `src/components/ui/` e importados via alias:

```tsx
import { Button } from "@/components/ui/button";
```

---

## Convenções e Boas Práticas

### Roteamento

- Toda rota vive dentro de `src/routes/` seguindo a estrutura de pastas → URL.
- **Nunca edite** `src/routeTree.gen.ts` manualmente — ele é gerado automaticamente pelo TanStack Router.
- Layouts aninhados são feitos via `__root.tsx` ou arquivos `_layout.tsx`.

### Data Fetching

- Toda comunicação com a API passa pela instância Axios em `src/api/instance.ts`.
- Crie hooks em `src/hooks/api/` agrupados por domínio (ex: `useProduct.ts`, `useOrder.ts`).
- Use `useQuery` para leitura e `useMutation` + `invalidateQueries` para escrita.

```ts
// src/hooks/api/useProduct.ts
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => instance.get<Product[]>("/products").then(r => r.data),
  });
}
```

### Estado Global

- Use Zustand apenas para estado que precisa persistir entre rotas ou é compartilhado entre múltiplos componentes desconectados.
- Prefira TanStack Query como fonte da verdade para dados do servidor.
- Uma store por domínio em `src/zustand/`.

### Estilização

- Use as classes Tailwind e as variáveis CSS do shadcn (ex: `bg-primary`, `text-muted-foreground`).
- Combine classes com o utilitário `cn()` de `@/lib/utils`.
- Não crie CSS custom sem necessidade — explore os tokens já definidos em `styles.css`.

### TypeScript

- Modo `strict` ativado. Sem `any` implícito.
- Defina tipos/interfaces próximos de onde são usados; mova para `src/types/` quando compartilhados.
- Use `import type` para importações de apenas tipo.

### Lint e Formatação

- **Biome**: formatação com tabs, aspas duplas. Rode `npx biome check --write .` para auto-fix.
- **ESLint**: configuração TanStack. Rode `npm run lint` antes de abrir PRs.
- **Prettier**: apenas para arquivos não cobertos pelo Biome (configuração paralela).

---

## Branches e Fluxo de Trabalho

| Branch | Propósito |
|---|---|
| `main` | Produção — PRs apenas via `release/*` |
| `release/develop` | Staging / integração |
| `feat/*` | Novas funcionalidades |
| `fix/*` | Correções de bugs |

1. Crie sua branch a partir de `release/develop`.
2. Abra PR para `release/develop` com descrição clara.
3. Após validação, `release/develop` → `main` via PR.
