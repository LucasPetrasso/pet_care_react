# PetCare

Aplicação demonstrativa para solicitar e organizar agendamentos de serviços para pets. Construída com Next.js App Router, React e TypeScript, com interface responsiva e dados persistidos localmente no navegador.

## Tecnologias

- Next.js com App Router e React
- TypeScript
- CSS Modules e CSS global para tokens e estilos-base
- Context API e React Hooks
- `localStorage` para persistência no navegador

## Funcionalidades

- Solicitação de banho, tosa e consulta veterinária com validação de formulário.
- Página de confirmação que recupera o último agendamento após recarregar.
- Painel com estatísticas calculadas dos agendamentos, pesquisa e ordenação.
- Ações para confirmar, cancelar e remover registros.
- Sincronização de alterações entre abas do mesmo navegador.
- Layout adaptável para celular, tablet e desktop, com suporte a navegação por teclado.

## Estrutura

- `src/app/`: páginas das rotas `/`, `/confirm` e `/dashboard`, layout global e estilos base.
- `src/components/`: navegação, formulário, cartões, painel e provider de estado.
- `src/data/`: serviços e tipos de animais disponíveis.
- `src/hooks/`: hook de acesso ao estado compartilhado.
- `src/lib/`: leitura e gravação centralizadas no armazenamento local.
- `src/styles/`: CSS Modules por página ou componente.
- `src/types/`: contratos tipados para agendamentos.

## Requisitos

- Node.js 20.9 ou superior
- npm

## Instalação e execução

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Validação

```bash
npm run lint
npm run typecheck
npm run build
```

## Persistência e limitações

Os agendamentos são armazenados apenas no `localStorage` do navegador utilizado. Não há backend, autenticação nem compartilhamento automático de dados entre dispositivos ou navegadores. Se o navegador bloquear o armazenamento local, operações que exigem persistência exibem uma mensagem de erro.
