-----

### ** 'Chunks': Sistema de Aprendizagem Modular via LLM**

**Autor:** [Chrystian Andrade]

-----

#### **1. Visão Geral e Justificativa**

Este documento detalha o projeto e a arquitetura de um sistema de aprendizagem inovador, cujo objetivo é transformar conteúdo textual denso em módulos de estudo interativos e visualmente gamificados. A principal inovação do sistema reside na sua arquitetura desacoplada, que delega a complexa tarefa de Processamento de Linguagem Natural (PLN) para uma API de um Modelo de Linguagem Grande (LLM) de ponta, a **DeepSeek API**.

O sistema se diferencia ao focar na experiência do usuário, apresentando o progresso de aprendizado através de uma interface inspirada no painel de atividades do GitHub, promovendo o engajamento e a motivação através de feedback visual claro e contínuo.

-----

#### **2. Conceitos Fundamentais**

Para a clareza deste documento, os seguintes termos são definidos:

  * **Tópico:** A unidade de estudo principal, criada pelo usuário. É definida por um **Nome** e uma **Descrição** textual. A descrição é o conteúdo bruto que será enviado à API externa para análise e modularização.
  * **Chunk:** A unidade de aprendizado atômica. São blocos de informação menores, gerados pela DeepSeek API a partir da descrição do Tópico. Cada chunk é autocontido e projetado para ser consumido em uma única sessão de estudo. Os chunks de um mesmo tópico podem ser explorados livremente, sem uma ordem predefinida.
  * **Painel de Atividade:** A representação visual do progresso do usuário dentro de um Tópico. Consiste em uma grade de quadrados, onde cada quadrado representa um único **Chunk**. A cor de cada quadrado evolui dinamicamente para refletir o nível de maestria do usuário sobre aquele chunk específico.

-----
#### **3. Requisitos e Regras

Esta seção define o escopo do produto sob a filosofia de ser **minimalista e poderoso**. O objetivo é construir um núcleo funcional robusto, evitando funcionalidades secundárias na versão inicial.

**3.1. Requisitos Funcionais (RF)**

Os requisitos funcionais descrevem as capacidades que o sistema *deve* executar.

**Backend (API Service):**
* **RF-B01:** A API deve prover um endpoint seguro para receber a submissão de um novo `Tópico` (nome e descrição textual).
  **Entrada esperada:** JSON com `name: string` e `description: string`
  - **Resposta imediata:** `202 Accepted` com um ID de tópico e status `"processing"`
  - **Ação subsequente:** O backend inicia uma *task assíncrona* para enviar o texto à DeepSeek API.
* **RF-B02:** A API deve ser capaz de construir um prompt estruturado e se comunicar com a API externa da DeepSeek, enviando a descrição do tópico para processamento.
  - **Prompt:** Deve forçar o modelo a:
  - Responder **exclusivamente** com JSON
  - Não incluir explicações, comentários ou textos fora do JSON
* **RF-B03:** A API deve ser capaz de validar e parsear a resposta JSON retornada pela DeepSeek para extrair a lista de `Chunks`.

- **Validações esperadas:**
  - A resposta deve ser JSON válido
  - Deve conter a chave `"chunks"`
  - Cada chunk deve conter `title` e `content` não vazios

  | Situação de erro | Ação |
  |------------------|------|
  | Resposta não é JSON | Marcar tópico como `error`, registrar mensagem |
  | JSON sem `chunks` | Marcar como `error` |
  | Chunks inválidos ou vazios | Marcar como `error` |
  | API falha (timeout, etc) | Retry N vezes → depois `failed` |

* **RF-B04:** A API deve persistir as entidades `Tópico` e seus `Chunks` correspondentes no banco de dados SQL.
O tópico só é salvo **após a resposta ser validada**
  - Status no banco:
    - `processing` → `ready` (sucesso)
    - `processing` → `error` / `failed` (erro)
  - Erros devem ser **logados** (banco ou sistema externo)
* **RF-B05:** A API deve prover um endpoint para consultar todos os dados de um `Tópico` específico, incluindo a lista de `Chunks` e o progresso do usuário associado a cada um.
* **RF-B06:** A API deve prover um endpoint para que o frontend possa registrar ou atualizar o status de progresso de um usuário em um `Chunk` específico.
**Frontend (Aplicação Cliente):**
* **RF-F01:** A interface deve apresentar um formulário claro para que o usuário possa criar um novo `Tópico`, inserindo seu nome e a descrição.
* **RF-F02:** A interface deve exibir uma tela principal (dashboard) que lista todos os `Tópicos` criados pelo usuário.
* **RF-F03:** Ao selecionar um `Tópico`, a interface deve renderizar o `Painel de Atividade`, exibindo uma grade onde cada célula representa um `Chunk`.
* **RF-F04:** Cada célula (representando um `Chunk`) no `Painel de Atividade` deve ser um elemento interativo (clicável).
* **RF-F05:** O clique em uma célula deve acionar a exibição do conteúdo do `Chunk` correspondente (ex: em um modal ou painel lateral).

* **RF-F06:** A interface de visualização do `Chunk` deve conter um mecanismo explícito para o usuário registrar seu progresso (alterar a cor do Chunk a cada (n) interação do usuário).
* **RF-F07:** A cor da célula no `Painel de Atividade` deve ser atualizada dinamicamente, sem a necessidade de recarregar a página, sempre que o progresso do `Chunk` correspondente for alterado.

**3.2. Regras de Negócio (RN)**

As regras de negócio são políticas e restrições que governam a lógica do sistema.

* **RN-01 (Delegação de IA):** A lógica de criação e segmentação de `Chunks` é de responsabilidade exclusiva e total da API externa da DeepSeek. O backend atua como um orquestrador e não contém lógica própria de Processamento de Linguagem Natural. O backend não tenta corrigir respostas inválidos
da IA, ele apenas rejeita e registra o erro.
* **RN-02 (Modelo de Progressão):** O progresso de um usuário em um `Chunk` segue um ciclo de vida predefinido que impacta diretamente a visualização. Os estados são:
    * `not_started` (Cor: Cinza) - Estado inicial.
    * `reviewed_once` (Cor: Verde Claro) - Após a primeira interação de revisão.
    * `reviewed_multiple` (Cor: Verde Médio) - Após a segunda ou terceira interação.
    * `mastered` (Cor: Verde Escuro) - Após N interações ou uma ação explícita do usuário.
* **RN-03 (Imutabilidade de Conteúdo):** Para manter a simplicidade do MVP (Produto Mínimo Viável), um `Tópico` ou `Chunk`, uma vez criado, não poderá ser editado. A única ação permitida será a exclusão do `Tópico` como um todo.
* **RN-04 (Isolamento de Dados - *Tenancy*):** Os `Tópicos` e todo o progresso associado são estritamente vinculados a um único usuário. Um usuário não pode, sob nenhuma circunstância, visualizar ou interagir com os dados de outro usuário.
* **RN-05 (Contrato com a IA):** O prompt enviado à DeepSeek API deve obrigatoriamente instruir o modelo a retornar os dados em um formato JSON estrito e previsível, para garantir a robustez do parsing da resposta.

**3.3. Requisitos Não-Funcionais (RNF)**

Os requisitos não-funcionais definem os atributos de qualidade e restrições técnicas do sistema.

* **RNF-01 (Performance Percebida):** A criação de um novo `Tópico` deve ser uma operação assíncrona. A API deve retornar uma resposta de sucesso ao frontend imediatamente (`202 Accepted`), enquanto o processamento com a DeepSeek ocorre em background. O frontend deve exibir um estado de "processando" para o usuário.
* **RNF-02 (Usabilidade Minimalista):** A interface deve ser livre de distrações. O design deve priorizar a clareza da informação e a centralidade do `Painel de Atividade` como ferramenta principal de interação.
* **RNF-03 (Segurança):** Chaves de API para serviços externos (DeepSeek) devem ser gerenciadas de forma segura, utilizando variáveis de ambiente ou um serviço de gerenciamento de segredos, e nunca devem ser expostas no código-fonte ou no lado do cliente.
* **RNF-04 (Dependência Externa):** A funcionalidade central do sistema é criticamente dependente da disponibilidade, latência e políticas de uso da DeepSeek API. O sistema deve ser resiliente a falhas temporárias da API externa, informando o usuário de forma clara quando o serviço estiver indisponível.

#### **3. Jornada do Usuário (User Flow)**

1.  **Criação do Tópico:**

      * O usuário acessa a tela principal e clica no botão "Criar Tópico".
      * Ele é direcionado para uma página de criação, onde insere um **Nome** para o tópico (ex: "História da Computação") e uma **Descrição** (um texto longo sobre o assunto).
      * Ao submeter, o sistema envia a Descrição para a DeepSeek API e aguarda a geração dos Chunks.

2.  **Visualização e Interação:**

      * Após o processamento, o usuário é levado à página do Tópico recém-criado.
      * A tela exibe o **Painel de Atividade**: uma grade de quadrados cinzas, cada um representando um chunk gerado.
      * Ao clicar em um quadrado, um modal ou painel lateral se abre, exibindo o conteúdo daquele Chunk para estudo.

3.  **Registro de Progresso:**

      * Após estudar o Chunk, o usuário realiza uma ação para indicar seu progresso (ex: clica em um botão "Revisei" ou "Entendi").
      * O sistema registra essa interação no banco de dados.
      * O quadrado correspondente no Painel de Atividade muda de cor, refletindo o novo status (ex: de cinza para verde claro), fornecendo feedback visual imediato.

-----
![image](https://github.com/user-attachments/assets/3ec3d2d9-1ea7-4aa3-8614-bc18a22d3b6e)


#### **4. Arquitetura da Solução**

# 🏛 Arquitetura do Sistema "Chunks"

---

## Visão Geral

O sistema "Chunks" adota uma arquitetura **cliente-servidor desacoplada**, com uso estratégico de uma **API de IA externa (DeepSeek)** para modularização de conteúdo. O backend atua como **orquestrador**, mantendo controle da persistência, segurança e progressão do usuário. O frontend é responsivo e gamificado, inspirado na interface do GitHub Contributions Grid.

---

## Componentes da Arquitetura

```text
+----------------------+     HTTPS      +------------------------+
|                      |<==============>|                        |
|     Frontend (Web)   |                |    Backend (FastAPI)   |
|  Next.js + Tailwind  |                |  Python + PostgreSQL   |
|                      |===============>|                        |
+----------------------+    REST API    +------------------------+
                                            ||
                                            || HTTP POST
                                            \/
                                +------------------------+
                                |                        |
                                |    DeepSeek API (LLM)  |
                                |  IA para segmentação   |
                                +------------------------+
```
```
```



## Backend (FastAPI + PostgreSQL)

### Responsabilidades

- **Expor uma API REST segura para o frontend**
  - Endpoints protegidos por autenticação (JWT)
  - Respostas consistentes e versionadas

- **Orquestrar a comunicação com a DeepSeek API**
  - Construção de prompt estruturado
  - Envio via HTTP POST com chave de API
  - Validação rigorosa da resposta JSON
  - Fallbacks em caso de erro (retries, marcação como `error`, logs)

- **Persistir entidades**
  - Usuários, Tópicos, Chunks, Progresso
  - Uso de UUIDs como identificadores
  - Relacionamentos claros entre as entidades
  - Enum para status de progresso (`not_started`, etc)

- **Gerenciar tarefas assíncronas**
  - Enfileirar e executar a chamada à DeepSeek em background
  - Atualizar status do Tópico ao final (`ready`, `error`, etc)
  - Exemplo de libs: `BackgroundTasks`, `Celery`, ou `dramatiq`

- **Garantir isolamento de dados (multi-tenancy)**
  - Cada recurso pertence a um `user_id`
  - Nenhum dado pode ser acessado por outro usuário
  - Filtros aplicados em todas as queries e endpoints

- **Expor estado e erros ao frontend**
  - Campos como `status` e `error_message` na entidade `Topic`
  - Endpoints de leitura retornam estado atual e mensagem amigável
  - Permite ao frontend renderizar corretamente as mensagens para o usuário

### Endpoints REST esperados

| Método | Endpoint                       | Ação |
|--------|--------------------------------|------|
| `POST` | `/topics`                      | Cria um novo tópico (resposta: 202 Accepted) |
| `GET`  | `/topics/{topic_id}`           | Consulta chunks e progresso de um tópico |
| `GET`  | `/users/me/topics`             | Lista os tópicos do usuário autenticado |
| `DELETE` | `/topics/{topic_id}`         | Exclui um tópico (e seus chunks) |
| `POST` | `/chunks/{chunk_id}/progress`  | Atualiza progresso de um chunk |


### 🗃 Modelo de Dados

- Tabelas:
  - `Users` — Autenticação e controle de acesso
  - `Topics` — Nome, descrição, status, user_id
  - `Chunks` — Título, conteúdo, ordem, pertence a um tópico
  - `ChunkProgress` — user_id + chunk_id + status + timestamp
- Campos importantes:
  - `status` do Tópico: `processing`, `ready`, `error`, `failed`
  - `error_message`: campo texto para explicar falhas de processamento

![image](https://github.com/user-attachments/assets/7a4c7422-298a-47ed-96e3-1f37ce408100)
![image](https://github.com/user-attachments/assets/f5f90bd8-b865-45d5-88c8-a643d684e77c)


### Segurança

- JWT para autenticação
- Verificação de `user_id` em todas as operações
- Sanitização e validação de entrada com `pydantic`
- Chave da DeepSeek mantida em `.env` (nunca exposta)

### 🛠 Bibliotecas e Ferramentas Sugeridas

- **FastAPI** — API moderna, rápida e tipada
- **Pydantic** — Validação e serialização de dados
- **SQLModel** ou **SQLAlchemy** — ORM relacional
- **PostgreSQL** — Banco de dados relacional
- **Async HTTP Client** — `httpx` para chamadas à DeepSeek
- **Tarefas Assíncronas** — `BackgroundTasks` (simples) ou `Celery` (escalável)



