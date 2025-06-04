# Documentação do Projeto: Assistente Inteligente para Estudos

## 1. Introdução

Este documento descreve todas as etapas do ciclo de vida do software para o projeto de um assistente inteligente para estudos, seguindo uma arquitetura orientada a serviços (SOA). O sistema visa facilitar a organização, aprendizado e acompanhamento dos estudos dos usuários por meio de resumos, cronogramas inteligentes e notificações baseadas em métodos de aprendizagem modernos (chunking e beacons).

---

## 2. Análise de Requisitos

### 2.1 Requisitos Funcionais

1. **Login e Cadastro**
   - O sistema deve permitir que o usuário realize login informando seu e-mail e senha.
   - O sistema deve permitir que o usuário realize cadastro informando seu nome, e-mail e senha.
 
2. **Montar Resumos**
   - O sistema deve permitir que o usuário informe conteúdos de estudo e solicite a geração de resumos automáticos.
   - O sistema deve exibir para o usuário o resumo gerado para revisão e edição.

3. **Definir Cronogramas**
   - O sistema deve permitir que o usuário informe suas disciplinas/conteúdos e datas disponíveis e solicite a geração de um cronograma de estudos personalizado.
   - O sistema deve exibir o cronograma gerado, permitindo ajustes pelo usuário.

4. **Chunking (Divisão de Conteúdo)**
   - O sistema deve dividir automaticamente grandes conteúdos informados pelo usuário em blocos menores (chunks) para facilitar o aprendizado.
   - O sistema deve exibir ao usuário os blocos (chunks) gerados para cada conteúdo do cronograma.

5. **Beacons (Notificações de Reforço)**
   - O sistema deve enviar notificações (beacons) ao usuário relacionadas aos conteúdos estudados, reforçando pontos importantes e revisões programadas.
   - O sistema deve permitir que o usuário configure preferências para recebimento de notificações.

### 2.2 Requisitos Não Funcionais

- O sistema deve ser acessível via web.
- O sistema deve garantir a segurança dos dados do usuário (criptografia de senha).
- O sistema deve ter boa performance, respondendo em até 2 segundos para cada requisição de resumo, cronograma ou chunking.
- O sistema deve estar disponível 99% do tempo.

---

## 3. Projeto/Arquitetura do Sistema

### 3.1 Visão Geral da Arquitetura

O sistema será baseado em uma arquitetura orientada a serviços (SOA), onde cada funcionalidade principal será um serviço independente, comunicando-se via APIs REST.

#### Serviços Principais:
- **Serviço de Autenticação**: Responsável por login, cadastro e gerenciamento de usuários.
- **Serviço de Resumos**: Responsável por receber conteúdos e gerar resumos automáticos.
- **Serviço de Cronogramas**: Responsável por criar cronogramas personalizados.
- **Serviço de Chunking**: Responsável por dividir conteúdos em blocos menores.
- **Serviço de Beacons**: Responsável por enviar notificações relacionadas aos conteúdos estudados.

#### Diagrama de Alto Nível
```
[Frontend Web] <---> [API Gateway] <---> [Serviço de Autenticação]
                                             |-> [Serviço de Resumos]
                                             |-> [Serviço de Cronogramas] -> [Serviço de Chunking]
                                             |-> [Serviço de Beacons]
```

### 3.2 Modelos de Dados (Exemplo Simplificado)

- **Usuário**: id, nome, email, senha_hash
- **Resumo**: id, user_id, conteudo_original, resumo_gerado
- **Cronograma**: id, user_id, lista_disciplinas, datas, cronograma_gerado
- **Chunk**: id, cronograma_id, conteudo, chunk_texto
- **Beacon**: id, user_id, conteudo, data_envio, status

---

## 4. Implementação

- **Tecnologias Sugeridas**: 
  - Backend: Node.js (Express) ou Python (Flask/FastAPI)
  - Frontend: React.js ou Vue.js
  - Banco de Dados: PostgreSQL ou MongoDB

- **Padrão de APIs REST**:
  - **POST /auth/login** — Login do usuário
  - **POST /auth/register** — Cadastro do usuário
  - **POST /resumos** — Gerar resumo
  - **POST /cronogramas** — Gerar cronograma
  - **POST /chunking** — Dividir conteúdo em chunks
  - **POST /beacons** — Enviar notificação (interno)

- **Exemplo de Implementação de Chunking**:
  - Receber texto longo via API
  - Dividir texto em parágrafos ou tópicos menores (~300 palavras cada)
  - Retornar lista de chunks

---

## 5. Testes

- **Testes de Unidade**: Testar cada serviço isoladamente (ex: chunking divide corretamente?).
- **Testes de Integração**: Testar fluxo completo (ex: gerar cronograma → chunking → receber beacons).
- **Testes de Aceitação**: Validar requisitos funcionais junto ao usuário.
- **Testes de Segurança**: Garantir que senhas estão criptografadas, APIs protegidas.

---

## 6. Implantação

- **Deploy em Nuvem**: Sugestão de uso de Heroku, Vercel ou AWS.
- **CI/CD**: Integração contínua para testes automáticos e deploy.
- **Backup**: Rotina diária do banco de dados.

---

## 7. Manutenção

- **Monitoramento**: Uso de ferramentas como Sentry ou Datadog para logs e alertas.
- **Atualizações**: Planejamento de releases quinzenais.
- **Suporte**: Canal de feedback para usuários.

---

## 8. Conclusão

O Assistente Inteligente para Estudos cobre todas as etapas do ciclo de vida do software, desde requisitos claros até manutenção e evolução contínua. A arquitetura orientada a serviços facilita escalabilidade e manutenção, garantindo flexibilidade para futuras melhorias.

---
