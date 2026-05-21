# CLAUDE.md — Hub Inteligência Agro

Guia de referência para Claude Code neste projeto.

---

## Comandos Essenciais

```bash
npm run dev          # Dev server em http://localhost:1234
npm run build        # Build de produção
npm run typecheck    # Checagem TypeScript sem emitir arquivos
npm run lint         # ESLint (config TanStack)
npm run format       # Prettier em todos os .ts/.tsx
npm run test         # Vitest (modo run, sem watch)
npx biome check --write .   # Lint + format via Biome (preferido)
npx shadcn@latest add <component>  # Adicionar componente shadcn
```

---

## Stack e Versões

- **React 19** + **TypeScript 5** (strict)
- **TanStack Start 1.x** — meta-framework SSR sobre Vite + Nitro
- **TanStack Router 1.x** — roteamento file-based, tipado
- **TanStack Query 5.x** — server state, cache, mutations
- **Zustand 5** — client state global
- **Tailwind CSS 4** + **shadcn/ui** (estilo `radix-nova`)
- **Axios** — cliente HTTP com instância central
- **Motion 12** — animações (Framer Motion)
- **Biome 2** — lint e formatação principal
- **Vitest 3** + **Testing Library** — testes

---

## Arquitetura

### Roteamento (File-based)

```
src/routes/
├── __root.tsx          # Layout raiz + QueryClientProvider global
├── index.tsx           # Rota "/"
└── <domínio>/
    └── index.tsx       # Rota "/<domínio>"
```

- `routeTree.gen.ts` é **gerado automaticamente** — nunca editar manualmente.
- O TanStack Router regenera o arquivo ao salvar qualquer arquivo em `src/routes/`.
- Layouts aninhados via `_layout.tsx` ou arquivos `__root.tsx` internos.

### Camada de API

```
src/api/instance.ts     # Instância Axios com baseURL via VITE_URL_API
src/hooks/api/          # Hooks TanStack Query agrupados por domínio
```

Pattern obrigatório para hooks de API:
```ts
// src/hooks/api/useFoo.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "@/api/instance";

export function useFoos() {
  return useQuery({
    queryKey: ["foos"],
    queryFn: () => instance.get<Foo[]>("/foos").then(r => r.data),
  });
}

export function useCreateFoo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Omit<Foo, "id">) =>
      instance.post<Foo>("/foos", payload).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["foos"] }),
  });
}
```

### Estado Global (Zustand)

```
src/zustand/            # Uma store por domínio
```

- Zustand apenas para estado UI global ou cross-route.
- TanStack Query é a fonte da verdade para dados do servidor.
- Sempre tipar a store com interface explícita.

### Componentes

```
src/components/ui/      # Componentes shadcn — gerados via CLI, não editar diretamente
src/components/customs/ # Componentes de negócio reutilizáveis
```

---

## Convenções de Código

### Imports e Alias

- Sempre usar `@/` para imports internos: `import { cn } from "@/lib/utils"`.
- Usar `import type` para tipos TypeScript: `import type { Foo } from "@/types/foo"`.

### Estilização

- Combinar classes com `cn()` de `@/lib/utils`.
- Usar tokens CSS do shadcn: `bg-primary`, `text-muted-foreground`, `border-border`, etc.
- Não criar CSS custom salvo quando absolutamente necessário.

### TypeScript

- Sem `any`. Sem type assertions desnecessárias.
- Tipos de resposta da API definidos próximo ao hook, ou em `src/types/` se compartilhados.
- `noUnusedLocals` e `noUnusedParameters` ativos — limpar o que não usa.

### Biome (formatação principal)

- Indentação: **tabs**.
- Aspas: **duplas**.
- Organização de imports: automática (Biome Assist).
- Rodar `npx biome check --write .` antes de commitar.

---

## Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|---|---|---|
| `VITE_URL_API` | URL base da API REST | Sim |

Todas as variáveis Vite devem começar com `VITE_` para ficarem disponíveis no cliente.

---

## Testes

- Usar Vitest + Testing Library.
- Testar hooks com `renderHook` e componentes com `render`.
- Mockar `src/api/instance.ts` nos testes de hook para não fazer chamadas reais.
- Rodar com `npm run test` (modo `run`, sem watch).

---

## O que NÃO Fazer

- Não editar `src/routeTree.gen.ts` — gerado automaticamente.
- Não editar componentes em `src/components/ui/` diretamente — reinstale via `npx shadcn@latest add`.
- Não usar `any` em TypeScript.
- Não commitar `.env` — usar `.env.example` para documentar variáveis.
- Não criar lógica de fetch direto em componentes — sempre via hooks em `src/hooks/api/`.
- Não usar `useEffect` para buscar dados — usar TanStack Query.
- Não criar store Zustand para dados do servidor — TanStack Query cuida disso.
