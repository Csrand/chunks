# Sistema de Aprendizado Didático Baseado em Serviços

## Sumário

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Funcionalidades](#funcionalidades)
- [Design & UX](#design--ux)
- [Requisitos](#requisitos)
- [Ciclo de Vida do Software](#ciclo-de-vida-do-software)
- [Instalação](#instalação)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Visão Geral

Este sistema visa facilitar o aprendizado personalizado por meio da divisão de tópicos didáticos em pequenos chunks, revisões espaçadas automáticas e gamificação do progresso, utilizando arquitetura baseada em microsserviços e consumo de APIs de LLM.

---

## Arquitetura

- **Serviço de Autenticação:** Cadastro, login e recuperação de senha.
- **Serviço de Chunking:** Consome API de LLM para dividir tópicos didáticos.
- **Serviço de Revisão Espaçada:** Agenda e gerencia revisões baseadas em chunks concluídos.
- **Serviço de Perfil & Gamificação:** Gerencia progresso, chunks concluídos e medalhas.
- **Frontend:** Interfaces para login, cadastro, home, perfil, revisões e criação de chunks.

---

## Funcionalidades

- Cadastro e autenticação de usuários.
- Criação e acompanhamento de chunks didáticos.
- Revisões espaçadas automáticas.
- Exibição de progresso, chunks concluídos e medalhas.
- Design minimalista e responsivo.

---

## Design & UX

- Interface minimalista com foco na usabilidade.
- Telas principais: Login, Cadastro, Home, Perfil, Revisões, Criação de Chunk.
- Responsividade e acessibilidade consideradas desde o início.

---

## Requisitos

- O sistema deve permitir que o usuário realize cadastro informando seu nome, e-mail (único) e senha.
- O sistema deve exibir mensagem de erro caso o e-mail já esteja cadastrado.
- O sistema deve permitir login informando e-mail e senha.
- O sistema deve permitir recuperação de senha através do e-mail cadastrado.
- O sistema deve permitir ao usuário informar um tópico de estudo em uma caixa de texto.
- O sistema deve dividir automaticamente o tópico em chunks didáticos utilizando uma API de LLM.
- O sistema deve exibir, na tela inicial, os chunks em andamento e o progresso de cada um.
- O sistema deve permitir ao usuário marcar um chunk como concluído.
- O sistema deve gerar revisões espaçadas automaticamente após a conclusão de um chunk.
- O sistema deve exibir as revisões planejadas em uma tela específica, permitindo ao usuário realizar e registrar seu progresso.
- O sistema deve exibir o progresso geral do usuário, chunks concluídos e medalhas em uma tela de perfil.
- O sistema deve apresentar design minimalista, responsivo e agradável.

---

## Ciclo de Vida do Software

1. **Planejamento**

   - Levantamento de requisitos funcionais e não funcionais.
   - Definição da arquitetura e escolha de tecnologias.

2. **Análise**

   - Detalhamento dos fluxos de usuário e casos de uso.
   - Modelagem dos dados e APIs.

3. **Projeto**

   - Prototipação das interfaces (wireframes).
   - Especificação de endpoints e contratos entre serviços.

4. **Implementação**

   - Desenvolvimento dos serviços e frontend.
   - Integração com APIs de LLM.

5. **Testes**

   - Testes unitários, de integração e de usabilidade.
   - Validação dos fluxos principais.

6. **Deploy**

   - Configuração de ambiente (Docker, CI/CD).
   - Monitoramento e logging.

7. **Manutenção**
   - Correção de bugs, melhorias e evolução contínua.

---

## Instalação

1. Clone o repositório.
2. Instale as dependências de cada serviço.
3. Configure variáveis de ambiente (exemplo em `.env.example`).
4. Execute os serviços conforme instruções específicas de cada pasta.

---

## Contribuição

- Faça um fork do projeto.
- Crie uma branch para sua feature/bugfix.
- Envie um pull request com a descrição detalhada.

---

## Licença

MIT
