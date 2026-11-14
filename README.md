# TaskFlow ⚡ — Productivity & Task Management

Aplicação web de gerenciamento de tarefas (*To-Do List*) de alta performance, projetada para profissionais e equipes focados em produtividade contínua. Desenvolvida estritamente com **HTML5**, **CSS3** e **JavaScript Vanilla (ES6+)**, reproduzindo fielmente os protótipos visuais de UI/UX e o sistema de design especificado.

---

## 🎯 Visão Geral do Projeto

O **TaskFlow** combina a agilidade baseada em atalhos de teclado (estilo *Linear*) com a flexibilidade modular de gerenciamento de projetos e tarefas (estilo *Notion* e *Todoist*).

A aplicação opera 100% no navegador (Client-side), sem necessidade de compiladores, gerenciadores de pacotes ou servidores de backend, utilizando `localStorage` para persistência robusta dos dados.

---

## 📸 Referências e Telas Implementadas

A interface foi estruturada e estilizada com fidelidade aos protótipos da pasta `Referência/`:

1. **Dashboard Principal (`Dashboard.png`)**:
   - Barra lateral (*Sidebar*) persistente com alternador de workspace, contadores dinâmicos de tarefas e listagem de projetos.
   - Topbar com busca global e atalho `⌘K` / `Ctrl+K`.
   - Cards de indicadores KPI em tempo real (*Total Tasks*, *Completed*, *Pending Active*, *Overdue*).
   - Feed de tarefas com badges de prioridade, etiquetas de projeto, contagem de subtarefas e avatares.
   - Barra inferior de inserção rápida (*Inline Quick-Add*).
   - Widgets auxiliares: Produtividade diária com progresso radial SVG, *Focus Schedule*, *Upcoming Deadlines* e *Pro Tip*.

2. **Modal de Criação / Edição (`Modal.png`)**:
   - Janela flutuante com backdrop blur translúcido e foco automático.
   - Editor com suporte a títulos, contexto e barra de formatação.
   - Seletores de data e horário com atalhos rápidos (*Today*, *Tomorrow*, *Next Week*).
   - Controle segmentado de prioridade (*Low*, *Med*, *High*, *Urgent*) com indicador de SLA.
   - Seletor de responsáveis, lembrete de notificação e nuvem de tags de projeto.
   - Checklist interativo de subtarefas com contador de progresso.

3. **Estado de Conclusão / Celebração (`Completo.png`)**:
   - Painel comemorativo (*"All Caught Up! You're an absolute rockstar 🥳"*).
   - Registro de tarefas concluídas nas últimas 24 horas com opção de reabertura rápida.
   - Widgets de análise: Streak de 7 dias (*Momentum*), resumo semanal, pontuação de produtividade (*Productivity Score*) e gráfico de velocidade (*Velocity by day*).
   - Exportação de relatório de auditoria em formato CSV.

4. **Painel do Editor de Projeto (`Editor.png`)**:
   - Visão aprofundada de tarefas por projeto (*Product Roadmap*, *Marketing Launch*, *Engineering Sprint*, etc.).
   - Agrupamento de tarefas por seções sanfonadas (*High Priority Tasks* e *In Progress*).
   - *Drawer* lateral interativo para inspeção e edição detalhada de propriedades, datas, checklist de requisitos arquiteturais e exclusão assistida.

---

## 🎨 Sistema de Design & Paleta de Cores

Construído a partir das especificações de `Referência/Paleta.md`:

| Token | Hex | Aplicação |
| :--- | :--- | :--- |
| `--color-surface` | `#faf8ff` | Fundo principal da aplicação |
| `--color-primary` | `#4648d4` | Ações principais, botões focais, seleção ativa |
| `--color-primary-container` | `#6063ee` | Destaques e badges de marca |
| `--color-on-surface` | `#131b2e` | Tipografia principal de alto contraste |
| `--color-tertiary-container` | `#00885d` | Indicadores de sucesso, checkmarks e status |
| `--color-error` | `#ba1a1a` | Alertas críticos, prazos vencidos e exclusão |
| `--color-divider` | `#e2e8f0` | Linhas de divisão e contornos sutis |

- **Tipografia**: Família `Inter`, com números alinhados tabularmente (`tabular-nums`) para consistência em datas e métricas.
- **Elevações**: Sombras difusas multicamadas com transições suaves (`cubic-bezier`).

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica, acessibilidade e atributos ARIA.
- **CSS3 Moderno**: Flexbox, CSS Grid (layout responsivo de 12 colunas), Variáveis CSS (Custom Properties) e Media Queries.
- **JavaScript Vanilla (ES6+)**: Modular, orientado a eventos, sem bibliotecas externas ou frameworks.
- **Armazenamento**: Web Storage API (`localStorage`).

> **Restrições respeitadas:** Projeto livre de React, Vue, Angular, Bootstrap, Tailwind, jQuery, Vite, Webpack, npm ou quaisquer dependências externas.

---

## ⚡ Funcionalidades Principais

- [x] **CRUD Completo de Tarefas**: Criar, listar, visualizar detalhes, editar e remover.
- [x] **Modal de Confirmação**: Prevenção contra exclusões acidentais de tarefas.
- [x] **Alternância de Conclusão**: Marcar como feito ou reabrir tarefas com recálculo instantâneo das métricas.
- [x] **Métricas Dinâmicas**: Atualização em tempo real de KPIs, contadores da barra lateral e gráfico radial de produtividade.
- [x] **Busca e Filtros Cumulativos**: Pesquisa textual combinada com filtros de status (*All*, *Today*, *Upcoming*, *Completed*) e projetos.
- [x] **Ordenação Inteligente**: Por prazo de entrega (*Due Date*), prioridade (*Priority*) ou título (*Title*).
- [x] **Subtarefas**: Adição dinâmica e marcação de itens de checklist dentro de cada tarefa.
- [x] **Atalhos de Teclado**:
  - `N`: Abrir modal de criação de nova tarefa.
  - `⌘K` / `Ctrl+K`: Focar na barra de busca global.
  - `Esc`: Fechar modais abertos.
  - `⌘+Enter` / `Ctrl+Enter`: Salvar tarefa dentro do modal.
  - `Enter`: Adicionar tarefa instantaneamente na barra rápida inferior.
- [x] **Exportação de Dados**: Download de relatório CSV de auditoria.
- [x] **Design Totalmente Responsivo**: Otimizado para telas Desktop (1440px+), Laptops (1280px), Tablets (768px) e Smartphones (375px / 320px).

---

## 📂 Estrutura de Arquivos

```text
To do/
│
├── Referência/              # Arquivos oficiais de especificação de UI/UX
│   ├── Paleta.md            # Tokens de cor, tipografia e espaçamentos
│   ├── Dashboard.png        # Protótipo do Dashboard
│   ├── Modal.png            # Protótipo do Modal de criação
│   ├── Completo.png         # Protótipo do estado de tarefas concluídas
│   └── Editor.png           # Protótipo do editor e visualização por projetos
│
├── public/                  # Arquivos da aplicação prontos para execução
│   ├── index.html           # Estrutura e marcação semântica
│   ├── style.css            # Folha de estilos e responsividade
│   └── script.js            # Lógica de negócio, estado e DOM
│
└── README.md                # Documentação técnica do projeto
```

---

## 🚀 Como Executar o Projeto

Como o projeto utiliza tecnologias nativas da web, não é necessária nenhuma etapa de instalação ou build:

1. Clone ou baixe este repositório.
2. Navegue até a pasta `public/`.
3. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox, Safari ou Opera):
   - Dê um duplo clique em `public/index.html`, ou
   - Arraste o arquivo `index.html` para a janela do seu navegador.
