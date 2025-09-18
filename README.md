# Chunks — Especificação de Requisitos de Software
---
> **Versão**: 1.3  
> **Data**: 14 de Setembro de 2025  
> **Autor**: [Csrand]  
> **Projeto**: Material de apoio interativo para Fundamentos de Programação.
---

## 1. Introdução

### 1.1 Objetivo

Desenvolver um sistema web interativo como material de apoio para a disciplina **Fundamentos de Programação**, com:

- Autenticação de usuário (login e registro)
- Armazenamento persistente de dados do usuário
- Conteúdos organizados hierarquicamente: **Disciplinas → Módulos → Submódulos**
- Conceitos estruturados em **6 seções pré-definidas** por submódulo
- Questionários com **5 perguntas objetivas** por submódulo
- Revisões baseadas no **tempo de acesso (LAST_VIEWED)**
- Progresso visual via **grid colorido e barra de progresso**
- Gamificação com **badges** por desempenho

---

### 1.2 Escopo

- **MVP**: 1 disciplina, 1 módulo, 3 submódulos.
- **Funcionalidades principais**:
  - Autenticação de usuário
  - Navegação hierárquica
  - Estudo de conceitos + questionários
  - Visualização de progresso
  - Sugestão de revisão
  - Conquista de badges
- **Tecnologias**:
  - Backend: NestJS
  - Frontend: React
  - Banco de Dados: **PostgreSQL** (local via Docker ou instalação nativa)
- **Público-Alvo**: Alunos da disciplina *Fundamentos de Programação*

---

### 1.3 Definições, Acrônimos e Abreviações

| Termo           | Definição |
|-----------------|-----------|
| RF              | Requisito Funcional |
| RNF             | Requisito Não-Funcional |
| RN              | Regra de Negócio |
| STRENGTH        | Métrica interna de retenção de conteúdo (0 a 5) |
| LAST_VIEWED     | Timestamp do último acesso ao submódulo |
| QUIZ_SCORE      | Número de acertos no questionário (0 a 5) |
| MVP             | Minimum Viable Product |
| JWT             | JSON Web Token (autenticação) |
| bcrypt          | Algoritmo de hash para senhas |
| PostgreSQL      | Sistema de gerenciamento de banco de dados relacional open-source adotado neste projeto |

---

### 1.4 Visão Geral do Sistema

O sistema é composto por três camadas principais:

- **Frontend (React)**: Interface interativa para o aluno.
- **Backend (NestJS)**: Lógica de negócio, autenticação e API REST.
- **Banco de Dados (PostgreSQL)**: Armazenamento persistente de usuários, conteúdos, progresso e badges.

**Fluxo típico do usuário**:
> Login → Escolhe disciplina → Seleciona módulo → Estuda submódulo (6 seções + quiz) → Visualiza progresso → Recebe sugestões de revisão → Conquista badges.

---

## 2. Requisitos Gerais

### 2.1 Requisitos Funcionais

| ID    | Descrição | Detalhes |
|-------|-----------|----------|
| RF01  | Autenticação de Usuário | Login/registro, validação de campos, hash de senha (bcrypt), geração de JWT. |
| RF02  | Navegação Hierárquica | Disciplinas → Módulos → Submódulos (exibidos em grid). |
| RF03  | Submódulos | Cada submódulo contém 6 seções de conteúdo + 1 questionário de 5 perguntas. |
| RF04  | Armazenamento de Dados | Persistência de: usuários, disciplinas, módulos, submódulos, perguntas, respostas, progresso, badges. |
| RF05  | Progresso Visual | Grid colorido conforme QUIZ_SCORE + barra de progresso global. |
| RF06  | Revisão por Tempo de Acesso | Sistema sugere revisão de submódulos com LAST_VIEWED > 2 dias (intervalos: 2, 4, 7 dias). |
| RF07  | Gamificação | Concessão de badge único por submódulo ao atingir QUIZ_SCORE = 5. |
| RF08  | Acesso Irrestrito | Usuário autenticado pode acessar qualquer conceito ou questionário, independente da ordem. |

---

### 2.2 Requisitos Não-Funcionais

| ID    | Descrição |
|-------|-----------|
| RNF01 | Interface intuitiva: qualquer funcionalidade acessível em ≤3 cliques. |
| RNF02 | Configuração do PostgreSQL local concluída em <30min (via Docker ou script). |
| RNF03 | Backend responde queries simples em <500ms. |
| RNF04 | Frontend responsivo: suporte a telas de 320x480 até 1920x1080. |
| RNF05 | Clean code: funções com <20 linhas, modularidade e baixo acoplamento. |
| RNF06 | Cobertura de testes >80% (unitários com Jest, E2E com Cypress). |
| RNF07 | Índices criados em colunas de busca frequente (ex: USER_ID, SUBMODULE_ID). |
| RNF08 | Senhas armazenadas com hash bcrypt; senha mínima de 12 caracteres no registro. |

---

### 2.3 Regras de Negócio

| ID    | Regra |
|-------|-------|
| RN01  | **Autenticação**: Username (4–50 chars), email válido e único, senha ≥8 caracteres. Bloqueio de conta após 5 tentativas falhas em 5 minutos (liberação após 15 min). |
| RN02  | **Navegação**: Apenas usuários autenticados acessam módulos/submódulos. Grid exibe até 12 itens por página. |
| RN03  | **Submódulos**: 6 seções obrigatórias. Questionário com 5 perguntas. QUIZ_SCORE varia de 0 a 5. |
| RN04  | **Progresso**: QUIZ_SCORE atualiza o campo STRENGTH. LAST_VIEWED é atualizado sempre que o submódulo é acessado. |
| RN05  | **Revisão**: Sistema sugere revisão nos dias 2, 4 e 7 após último acesso. Limite de 5 submódulos sugeridos por vez. |
| RN06  | **Gamificação**: Badge concedido por submódulo, com nome único baseado em submódulo + data de conquista (ex: “Variáveis_20250915”). |

---

## 3. Modelo de Dados (PostgreSQL)

### 3.1 Tabelas

```sql
Users (
  USER_ID SERIAL PRIMARY KEY,
  USERNAME VARCHAR(50) UNIQUE NOT NULL,
  EMAIL VARCHAR(255) UNIQUE NOT NULL,
  PASSWORD_HASH TEXT NOT NULL
)

Disciplines (
  DISCIPLINE_ID SERIAL PRIMARY KEY,
  NAME VARCHAR(100) NOT NULL,
  DESCRIPTION TEXT
)

Modules (
  MODULE_ID SERIAL PRIMARY KEY,
  DISCIPLINE_ID INT REFERENCES Disciplines(DISCIPLINE_ID),
  TITLE VARCHAR(100) NOT NULL,
  DESCRIPTION TEXT
)

Submodules (
  SUBMODULE_ID SERIAL PRIMARY KEY,
  MODULE_ID INT REFERENCES Modules(MODULE_ID),
  TITLE VARCHAR(100) NOT NULL,
  EXPLANATION TEXT
)

Questions (
  QUESTION_ID SERIAL PRIMARY KEY,
  SUBMODULE_ID INT REFERENCES Submodules(SUBMODULE_ID),
  QUESTION_TEXT TEXT NOT NULL,
  OPTIONS JSONB NOT NULL, -- Ex: ["Opção A", "Opção B", ...]
  CORRECT_ANSWER INT NOT NULL -- Índice da opção correta (0-based)
)

UserProgress (
  PROGRESS_ID SERIAL PRIMARY KEY,
  USER_ID INT REFERENCES Users(USER_ID),
  SUBMODULE_ID INT REFERENCES Submodules(SUBMODULE_ID),
  QUIZ_SCORE SMALLINT CHECK (QUIZ_SCORE BETWEEN 0 AND 5),
  LAST_VIEWED TIMESTAMP DEFAULT NOW(),
  STRENGTH SMALLINT CHECK (STRENGTH BETWEEN 0 AND 5)
)

Answers (
  ANSWER_ID SERIAL PRIMARY KEY,
  PROGRESS_ID INT REFERENCES UserProgress(PROGRESS_ID),
  QUESTION_ID INT REFERENCES Questions(QUESTION_ID),
  USER_ANSWER INT,
  CORRECT BOOLEAN,
  TIMESTAMP TIMESTAMP DEFAULT NOW()
)

Badges (
  BADGE_ID SERIAL PRIMARY KEY,
  USER_ID INT REFERENCES Users(USER_ID),
  SUBMODULE_ID INT REFERENCES Submodules(SUBMODULE_ID),
  NAME VARCHAR(100) UNIQUE NOT NULL, -- Ex: "Condicionais_20250914"
  AWARDED_AT TIMESTAMP DEFAULT NOW()
)
```

### 3.2 Índices (PostgreSQL)

```sql
CREATE INDEX idx_users_username_email ON Users(USERNAME, EMAIL);
CREATE INDEX idx_user_progress_lookup ON UserProgress(USER_ID, SUBMODULE_ID);
CREATE INDEX idx_answers_by_progress ON Answers(PROGRESS_ID, QUESTION_ID);
```

---

## 4. Arquitetura do Sistema

### 4.1 Backend (NestJS + PostgreSQL)

- **Módulos principais**:
  - `AuthModule`: login, registro, JWT
  - `ContentModule`: disciplinas, módulos, submódulos, questões
  - `ProgressModule`: progresso, revisões, badges
- **Endpoints principais**:
  - `POST /auth/login`
  - `POST /auth/register`
  - `GET /disciplines`
  - `GET /modules/:id`
  - `GET /submodules/:id`
  - `POST /submit-answers`
  - `GET /progress/:userId`
  - `GET /review/:userId`
  - `GET /badges/:userId`
- **TypeORM**: Configurado para PostgreSQL, com migrations via CLI.
- **Variáveis de ambiente**:
  ```env
  DATABASE_URL=postgres://user:pass@localhost:5432/chunks_db
  JWT_SECRET=your_strong_secret_here
  ```

---

### 4.2 Frontend (React)

- **Rotas principais**:
  - `/login`
  - `/register`
  - `/disciplines`
  - `/discipline/:id/modules`
  - `/module/:id/submodules`
  - `/submodule/:id/study`
- **Componentes principais**:
  - `LoginForm`, `RegisterForm`
  - `DisciplineList`, `ModuleList`, `SubmoduleGrid`
  - `SubmoduleStudy` (6 seções + quiz)
  - `ProgressBar`, `BadgeCard`
- **Estilização**:
  - Layout com CSS Grid
  - Componentes com Material-UI
  - Gráficos com Recharts (opcional para progresso)

---

### 4.3 Banco de Dados

- **SGBD**: PostgreSQL (versão 14+ recomendada)
- **Deploy local**: via Docker (`docker-compose.yml`) ou instalação nativa
- **Migrations**: Gerenciadas via TypeORM CLI
- **Queries críticas otimizadas**:
  - Login (por username/email)
  - Cálculo de progresso por usuário
  - Sugestão de revisão (filtro por LAST_VIEWED)
  - Verificação de badges conquistadas

---

## 5. Fluxo do Usuário

1. **Login ou Registro** → Autenticação JWT
2. **Tela Inicial** → Lista de Disciplinas
3. **Seleção de Disciplina** → Lista de Módulos
4. **Seleção de Módulo** → Grid de Submódulos
5. **Acesso a Submódulo**:
   - Estudo das 6 seções de conteúdo
   - Resolução do questionário (5 perguntas)
6. **Feedback Imediato**:
   - Atualização de QUIZ_SCORE e STRENGTH
   - Badge concedida se QUIZ_SCORE = 5
   - LAST_VIEWED atualizado
7. **Dashboard de Progresso**:
   - Grid colorido por desempenho
   - Barra de progresso global
8. **Revisão Inteligente**:
   - Submódulos sugeridos com base em LAST_VIEWED (>2 dias)
9. **Gamificação**:
   - Visualização de badges conquistadas

---

## 6. Conteúdo do MVP

- **Disciplina**: Fundamentos de Programação
- **Módulo**: Programação Básica
- **Submódulos**:
  1. Variáveis
  2. Condicionais
  3. Loops
- **Cada submódulo contém**:
  - 6 seções de conteúdo (placeholders no MVP)
  - 5 perguntas objetivas (placeholders no MVP)

---

## 7. Cronograma

| Sprint | Dias   | Tarefas |
|--------|--------|---------|
| 1      | 1–7    | Conteúdo inicial, configurar PostgreSQL, backend (Auth, Content, Progress) |
| 2      | 8–14   | Frontend (login, grid, formulários), integração, testes, documentação final |

---

## 8. Testes

### 8.1 Unitários (Jest)

- `POST /auth/login` → Valida credenciais, gera JWT
- `POST /submit-answers` → Calcula QUIZ_SCORE, atualiza STRENGTH e LAST_VIEWED
- `GET /review/:userId` → Retorna submódulos com LAST_VIEWED > 2 dias

### 8.2 End-to-End (Cypress)

- Fluxo completo de login e registro
- Navegação entre disciplinas, módulos e submódulos
- Resolução de questionário e verificação de badge
- Verificação da lista de revisões sugeridas

---

## 9. Riscos e Mitigações

| Risco                          | Mitigação |
|--------------------------------|-----------|
| Criação de conteúdo demorada   | Começar com 1 submódulo e expandir |
| Queries lentas no PostgreSQL   | Uso de índices adequados, evitar SELECT *, monitorar com EXPLAIN ANALYZE |
| Integração NestJS/React falha  | Testar endpoints com Postman/Thunder Client antes da integração |
| Falhas em login/autenticação   | Usar bibliotecas consolidadas (passport-jwt, bcrypt) e validar JWT rigorosamente |
| Curva de aprendizado do PostgreSQL | Utilizar Docker + GUI (ex: pgAdmin, DBeaver) para facilitar |

---

## 10. Referências
- Documentação NestJS + TypeORM + PostgreSQL
- React Router, Material-UI, Recharts
- Cypress, Jest

---


Você pode salvar este arquivo como `SRS_Chunks_v1.3.md` e gerar PDF com ferramentas como **Pandoc** ou **Markdown Preview Enhanced (VS Code)**.

Precisa de versão em PDF, diagramas (UML, fluxo), ou modelo de tabela pronto para PostgreSQL? É só pedir!

Parabéns — excelente trabalho! 🎉
