Excelente. Com essa direção clara, podemos construir um esqueleto de documentação muito mais robusto, formal e alinhado à sua visão. A abordagem de usar um LLM para a lógica central e focar na experiência de visualização é moderna e tem grande potencial acadêmico e prático.

A seguir, apresento um esqueleto de documentação de projeto. Ele está estruturado para ser preenchido, servindo como um guia formal para o desenvolvimento. Os pontos marcados com `[A ser definido]` são sugestões ou locais para você detalhar com suas próprias escolhas técnicas.

-----

### **Documentação de Projeto: Sistema de Aprendizagem Modular via LLM**

**Versão:** 1.0
**Data:** 01 de Julho de 2025
**Autor:** [Seu Nome/Nome da Equipe]

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
#### **6. Requisitos e Regras

Esta seção define o escopo do produto sob a filosofia de ser **minimalista e poderoso**. O objetivo é construir um núcleo funcional robusto, evitando funcionalidades secundárias na versão inicial.

**6.1. Requisitos Funcionais (RF)**

Os requisitos funcionais descrevem as capacidades que o sistema *deve* executar.

**Backend (API Service):**
* **RF-B01:** A API deve prover um endpoint seguro para receber a submissão de um novo `Tópico` (nome e descrição textual).
* **RF-B02:** A API deve ser capaz de construir um prompt estruturado e se comunicar com a API externa da DeepSeek, enviando a descrição do tópico para processamento.
* **RF-B03:** A API deve ser capaz de validar e parsear a resposta JSON retornada pela DeepSeek para extrair a lista de `Chunks`.
* **RF-B04:** A API deve persistir as entidades `Tópico` e seus `Chunks` correspondentes no banco de dados SQL.
* **RF-B05:** A API deve prover um endpoint para consultar todos os dados de um `Tópico` específico, incluindo a lista de `Chunks` e o progresso do usuário associado a cada um.
* **RF-B06:** A API deve prover um endpoint para que o frontend possa registrar ou atualizar o status de progresso de um usuário em um `Chunk` específico.

**Frontend (Aplicação Cliente):**
* **RF-F01:** A interface deve apresentar um formulário claro para que o usuário possa criar um novo `Tópico`, inserindo seu nome e a descrição.
* **RF-F02:** A interface deve exibir uma tela principal (dashboard) que lista todos os `Tópicos` criados pelo usuário.
* **RF-F03:** Ao selecionar um `Tópico`, a interface deve renderizar o `Painel de Atividade`, exibindo uma grade onde cada célula representa um `Chunk`.
* **RF-F04:** Cada célula (representando um `Chunk`) no `Painel de Atividade` deve ser um elemento interativo (clicável).
* **RF-F05:** O clique em uma célula deve acionar a exibição do conteúdo do `Chunk` correspondente (ex: em um modal ou painel lateral).
* **RF-F06:** A interface de visualização do `Chunk` deve conter um mecanismo explícito para o usuário registrar seu progresso (ex: um botão "Marcar como Revisado").
* **RF-F07:** A cor da célula no `Painel de Atividade` deve ser atualizada dinamicamente, sem a necessidade de recarregar a página, sempre que o progresso do `Chunk` correspondente for alterado.

**6.2. Regras de Negócio (RN)**

As regras de negócio são políticas e restrições que governam a lógica do sistema.

* **RN-01 (Delegação de IA):** A lógica de criação e segmentação de `Chunks` é de responsabilidade exclusiva e total da API externa da DeepSeek. O backend atua como um orquestrador e não contém lógica própria de Processamento de Linguagem Natural.
* **RN-02 (Modelo de Progressão):** O progresso de um usuário em um `Chunk` segue um ciclo de vida predefinido que impacta diretamente a visualização. Os estados são:
    * `not_started` (Cor: Cinza) - Estado inicial.
    * `reviewed_once` (Cor: Verde Claro) - Após a primeira interação de revisão.
    * `reviewed_multiple` (Cor: Verde Médio) - Após a segunda ou terceira interação.
    * `mastered` (Cor: Verde Escuro) - Após N interações ou uma ação explícita do usuário.
* **RN-03 (Imutabilidade de Conteúdo):** Para manter a simplicidade do MVP (Produto Mínimo Viável), um `Tópico` ou `Chunk`, uma vez criado, não poderá ser editado. A única ação permitida será a exclusão do `Tópico` como um todo.
* **RN-04 (Isolamento de Dados - *Tenancy*):** Os `Tópicos` e todo o progresso associado são estritamente vinculados a um único usuário. Um usuário não pode, sob nenhuma circunstância, visualizar ou interagir com os dados de outro usuário.
* **RN-05 (Contrato com a IA):** O prompt enviado à DeepSeek API deve obrigatoriamente instruir o modelo a retornar os dados em um formato JSON estrito e previsível, para garantir a robustez do parsing da resposta.

**6.3. Requisitos Não-Funcionais (RNF)**

Os requisitos não-funcionais definem os atributos de qualidade e restrições técnicas do sistema.

* **RNF-01 (Performance Percebida):** A criação de um novo `Tópico` deve ser uma operação assíncrona. A API deve retornar uma resposta de sucesso ao frontend imediatamente (`202 Accepted`), enquanto o processamento com a DeepSeek ocorre em background. O frontend deve exibir um estado de "processando" para o usuário.
* **RNF-02 (Usabilidade Minimalista):** A interface deve ser livre de distrações. O design deve priorizar a clareza da informação e a centralidade do `Painel de Atividade` como ferramenta principal de interação.
* **RNF-03 (Segurança):** Chaves de API para serviços externos (DeepSeek) devem ser gerenciadas de forma segura, utilizando variáveis de ambiente ou um serviço de gerenciamento de segredos, e nunca devem ser expostas no código-fonte ou no lado do cliente.
* **RNF-04 (Pilha Tecnológica - *Tech Stack*):**
    * **Backend:** Python 3.9+ com o framework FastAPI.
    * **Banco de Dados:** Qualquer SGBD compatível com SQL, com preferência para PostgreSQL devido ao suporte nativo a `JSONB`.
    * **Frontend:** Um framework JavaScript moderno e reativo (ex: React, Vue.js, Svelte).
* **RNF-05 (Dependência Externa):** A funcionalidade central do sistema é criticamente dependente da disponibilidade, latência e políticas de uso da DeepSeek API. O sistema deve ser resiliente a falhas temporárias da API externa, informando o usuário de forma clara quando o serviço estiver indisponível.

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

#### **4. Arquitetura da Solução**

A solução é baseada em uma arquitetura cliente-servidor, com uma dependência externa crítica.

**4.1. Design do Frontend**

  * **Tecnologia:** [A ser definido: Sugestão: React, Vue.js ou Svelte para reatividade e componentização.]
  * **Componentes Chave:**
      * `TopicCreationForm.jsx`: Formulário com campos para nome e descrição do tópico.
      * `TopicDashboard.jsx`: Tela principal que lista todos os tópicos criados pelo usuário.
      * `ActivityPanelView.jsx`: Componente principal que renderiza a grade de quadrados (chunks) para um tópico selecionado.
      * `ChunkModal.jsx`: Modal que exibe o conteúdo de um chunk quando um quadrado é clicado.

**4.2. Design do Backend**

  * **Tecnologia:** [A ser definido: Sugestão: Python com FastAPI pela sua performance e facilidade em lidar com APIs.]
  * **Responsabilidades:**
    1.  Prover uma API RESTful segura para o frontend.
    2.  Orquestrar a comunicação com a DeepSeek API.
    3.  Persistir todos os dados (usuários, tópicos, chunks, progresso) no banco de dados.
  * **Endpoints da API (Contrato):**
      * `POST /topics`: Recebe nome e descrição, chama a DeepSeek, persiste os resultados e retorna o tópico criado.
      * `GET /topics/{topic_id}`: Retorna os dados de um tópico, incluindo todos os seus chunks e o progresso do usuário em cada um.
      * `POST /chunks/{chunk_id}/progress`: Recebe uma atualização de status para um chunk (ex: `{"status": "reviewed"}`) e atualiza o banco de dados.

**4.3. Interação com a API Externa (DeepSeek)**

Esta é a lógica central do serviço.

  * **Fluxo:** Quando o endpoint `POST /topics` é chamado, o backend constrói um *prompt* estruturado para a DeepSeek API.
  * **Exemplo de Prompt:**
    ```
    Você é um assistente educacional especialista em modularização de conteúdo.
    Sua tarefa é dividir o texto a seguir em pequenos blocos de aprendizado, chamados "chunks".
    Para cada chunk, crie um título curto e o conteúdo correspondente.
    O texto a ser processado é: "{texto_da_descricao_inserido_pelo_usuario}"

    Retorne sua resposta estritamente no seguinte formato JSON, dentro de um único bloco de código, sem nenhum texto ou explicação adicional:
    {
      "chunks": [
        {
          "title": "Título do primeiro chunk",
          "content": "Conteúdo do primeiro chunk, que deve ser um parágrafo ou dois."
        },
        {
          "title": "Título do segundo chunk",
          "content": "Conteúdo do segundo chunk."
        }
      ]
    }
    ```
  * **Tratamento da Resposta:** O backend irá parsear a resposta JSON da API e usar esses dados para popular as tabelas `Chunks` no banco de dados.

-----

#### **5. Modelo de Dados (SQL)**

A persistência será feita em um banco de dados relacional (ex: PostgreSQL) com o seguinte esquema:

```sql
-- Tabela para armazenar os Tópicos criados pelos usuários
CREATE TABLE Topics (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL, -- Chave estrangeira para a tabela de usuários
    name VARCHAR(255) NOT NULL,
    original_description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para armazenar os Chunks gerados pela IA para cada Tópico
CREATE TABLE Chunks (
    id UUID PRIMARY KEY,
    topic_id UUID NOT NULL REFERENCES Topics(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    sequence_order INT NOT NULL -- Ordem para renderização na grade
);

-- Tabela para rastrear o progresso de cada usuário em cada chunk
CREATE TABLE ChunkProgress (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL, -- Chave estrangeira para a tabela de usuários
    chunk_id UUID NOT NULL REFERENCES Chunks(id) ON DELETE CASCADE,
    -- O status determina a cor do quadrado no painel
    status VARCHAR(50) NOT NULL DEFAULT 'not_started', -- Ex: 'not_started', 'reviewed_once', 'reviewed_multiple', 'mastered'
    last_reviewed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, chunk_id) -- Garante que cada usuário tenha apenas um registro de progresso por chunk
);
```
