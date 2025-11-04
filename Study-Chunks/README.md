# Study Chunks API

API de uma plataforma de aprendizado baseada em micro-conteúdos (chunks). O objetivo é fornecer uma estrutura de backend robusta para gerenciar usuários, disciplinas, módulos de estudo, progresso e gamificação.

## Conceito Principal

A plataforma é construída sobre a ideia de dividir o conhecimento em pequenas partes gerenciáveis (chunks):

- **Disciplinas:** Grandes áreas de conhecimento (ex: Cálculo, Programação Web).
- **Módulos:** Tópicos específicos dentro de uma disciplina (ex: Derivadas, HTML Básico).
- **Submódulos:** Conteúdo detalhado e explicativo sobre um tópico, acompanhado de um quiz para validação do conhecimento.

O progresso do usuário é monitorado por submódulo, medindo sua força e pontuação, e recompensando-o com medalhas.

## Tecnologias Utilizadas

- **Framework:** [NestJS](https://nestjs.com/) (v11)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Banco de Dados:** [OracleDB](https://www.oracle.com/database/)
- **Validação:** [Joi](https://joi.dev/) e [class-validator](https://github.com/typestack/class-validator)
- **Autenticação (a ser implementado):** JWT

---

## Como Começar

Siga os passos abaixo para configurar e executar o projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v22.x ou superior)
- [Git](https://git-scm.com/)
- [Oracle Instant Client](https://www.oracle.com/database/technologies/instant-client.html): O TypeORM precisa do client para se conectar ao banco de dados Oracle. Certifique-se de que ele esteja instalado e acessível na sua máquina.

### 1. Clone o Repositório

Assumindo que o nome do diretório do repositório seja `study-chunks`:

```bash
git clone <url-do-seu-repositorio>
cd study-chunks
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.

```bash
cp .env.example .env
```

Agora, abra o arquivo `.env` e preencha com as suas configurações locais, especialmente o caminho para o Oracle Instant Client e as credenciais do seu banco de dados.

```dotenv
# Porta em que a aplicação vai rodar
PORT=3000

# Caminho para a pasta do Oracle Instant Client
ORACLE_LIB_DIR=/home/lucas/faculdade/oracle/instantclient

# Configuração do Banco de Dados
DB_TYPE=oracle
DB_HOST=localhost
DB_PORT=1521
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=seu_sid

DB_AUTOLOADENTITIES=true
DB_SYNCHRONIZE=false
DB_LOGGING=true
```

### 4. Execute a Aplicação

Para iniciar o servidor em modo de desenvolvimento com hot-reload:

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

---

## Estrutura do Projeto

O projeto segue a arquitetura padrão do NestJS, com uma clara separação de responsabilidades:

- `src/main.ts`: Ponto de entrada da aplicação, onde o client Oracle é inicializado.
- `src/app.module.ts`: Módulo raiz que importa todos os outros módulos e configurações.
- `src/commons/`: Diretório para código reutilizável (constantes, mensagens, etc.).
- `src/modules/`: Cada funcionalidade (módulo de negócio) tem sua própria pasta, contendo:
  - `controller/`: Define as rotas da API e lida com as requisições HTTP.
  - `service/`: Contém a lógica de negócio.
  - `entity/`: Define a estrutura da tabela do banco de dados (TypeORM).
  - `dto/`: Define os objetos de transferência de dados (Request/Response).
  - `*.module.ts`: Une todas as partes do módulo.

---

## Endpoints da API (Módulo Discipline)

#### `POST /discipline/create`

Cria uma nova disciplina.

- **Corpo da Requisição:**
  ```json
  {
    "name": "Engenharia de Software",
    "description": "Princípios e práticas da construção de software."
  }
  ```
- **Resposta de Sucesso (201 Created):**
  ```json
  {
    "statusCode": 201,
    "message": "Disciplina cadastrada com sucesso!",
    "data": {
      "disciplineId": 1,
      "name": "Engenharia de Software",
      "description": "Princípios e práticas da construção de software."
    },
    "path": "/discipline/create",
    "error": null
  }
  ```

#### `GET /discipline/list`

Lista todas as disciplinas cadastradas.

- **Resposta de Sucesso (200 OK):**
  ```json
  {
    "statusCode": 200,
    "message": "Listagem de disciplinas!",
    "data": [
      {
        "disciplineId": 1,
        "name": "Engenharia de Software",
        "description": "Princípios e práticas da construção de software."
      }
    ],
    "path": "/discipline/list",
    "error": null
  }
  ```

#### `PUT /discipline/update/:disciplineId`

Atualiza uma disciplina existente.

- **Corpo da Requisição:**
  ```json
  {
    "name": "Engenharia de Software Avançada",
    "description": "Tópicos avançados em engenharia de software."
  }
  ```
- **Resposta de Sucesso (200 OK):**
  ```json
  {
    "statusCode": 200,
    "message": "Disciplina atualizada com sucesso!",
    "data": {
      "disciplineId": 1,
      "name": "Engenharia de Software Avançada",
      "description": "Tópicos avançados em engenharia de software."
    },
    "path": "/discipline/update/1",
    "error": null
  }
  ```

#### `DELETE /discipline/delete/:disciplineId`

Remove uma disciplina.

- **Resposta de Sucesso (204 No Content):** Nenhum corpo de resposta.

---

## Próximos Passos

- [ ] Implementar o módulo de `Users` com autenticação e autorização (JWT).
- [ ] Desenvolver os módulos `Modules` e `Submodules`.
- [ ] Criar os módulos `Questions` e `Answers` para o sistema de quiz.
- [ ] Implementar o sistema de `UserProgress` e `Badges`.
