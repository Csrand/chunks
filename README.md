-----

### ** 'Chunks': Sistema de Aprendizagem Modular via LLM**

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

RF-01: Criação de Tópicos de Estudo: O usuário deve ser capaz de criar um novo tópico de estudo fornecendo um nome (título) e uma descrição (o conteúdo textual completo a ser estudado).

RF-02: Processamento Automático do Conteúdo: Após a criação de um tópico, o sistema deve analisar a descrição fornecida e dividi-la automaticamente em múltiplos "módulos de estudo" menores e autocontidos.

RF-03: Feedback sobre o Processamento: Durante a análise e criação dos módulos, o usuário deve ver um status indicando que o tópico está "em processamento".

RF-04: Tratamento de Falhas no Processamento: Se o sistema não conseguir dividir o conteúdo em módulos, o tópico deve ser marcado com um status de "erro", informando o usuário sobre a falha.

RF-05: Visualização do Painel de Tópicos: O usuário deve ter acesso a um painel principal que lista todos os tópicos de estudo que ele criou.

2. Visualização e Aprendizagem
RF-06: Acesso ao Painel de Progresso: Ao selecionar um tópico, o usuário deve ser direcionado a um "Painel de Progresso", que exibe todos os módulos de estudo daquele tópico em um formato de grade.

RF-07: Interação com Módulos de Estudo: Cada célula na grade do Painel de Progresso representa um módulo de estudo e deve ser interativa (clicável).

RF-08: Consumo de Conteúdo: Ao clicar em uma célula, o conteúdo completo daquele módulo de estudo deve ser exibido para que o usuário possa estudá-lo.

RF-09: Registro de Progresso: Dentro da visualização de um módulo, o usuário deve ter uma ação clara para registrar que revisou ou aprendeu o conteúdo.

RF-10: Atualização Visual do Progresso: Sempre que o usuário registrar uma revisão, a cor da célula correspondente no Painel de Progresso deve ser atualizada instantaneamente para refletir o novo status.

3. Regras de Negócio
RN-01: Modelo de Progressão de Aprendizado: O progresso do usuário em cada módulo de estudo deve seguir um ciclo de vida visualmente claro, refletido pelas cores no Painel de Progresso:

Estado 1 (Não Iniciado): Cor padrão (ex: cinza).

Estado 2 (Primeira Revisão): Cor indicando progresso inicial (ex: verde claro).

Estado 3 (Múltiplas Revisões): Cor indicando reforço do conhecimento (ex: verde médio).

Estado 4 (Maestria): Cor indicando que o conteúdo foi dominado (ex: verde escuro).

RN-02: Privacidade e Isolamento de Dados: Todo o conteúdo e progresso de um usuário são estritamente privados e pessoais. Nenhum usuário pode ver ou interagir com os tópicos ou o progresso de outros usuários.

RN-03: Imutabilidade do Conteúdo: Uma vez que um tópico e seus módulos de estudo são criados, o conteúdo textual não pode ser editado. A única alteração permitida é a exclusão do tópico como um todo.

RN-04: Foco e Simplicidade da Interface: A interface do sistema deve ser minimalista e livre de distrações, priorizando a clareza das informações e a facilidade de interação com o Painel de Progresso.
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



