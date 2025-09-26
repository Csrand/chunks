-- Usuários
INSERT INTO BD2_Users (USER_ID, USERNAME, EMAIL, PASSWORD_HASH)
VALUES (1, 'João Magno', 'jaoMagno@email.com', 'hash_simulado_senha123');

INSERT INTO BD2_Users (USER_ID, USERNAME, EMAIL, PASSWORD_HASH)
VALUES (2, 'Chrystian cena', 'cena@email.com', 'hash_simulado_senha456');


-- Disciplinas
INSERT INTO BD2_Disciplines (DISCIPLINE_ID, NAME, DESCRIPTION)
VALUES (1, 'Logica de programação', 'Conceitos iniciais de lógica, algoritmos e sintaxe de programação.');

INSERT INTO BD2_Disciplines (DISCIPLINE_ID, NAME, DESCRIPTION)
VALUES (2, 'Estrutura de Dados', 'Estudo de formas de organizar e armazenar dados para uso eficiente.');


-- Módulos (corrigido: DISCIPLINE_ID é número, não string)
INSERT INTO BD2_Modules (MODULE_ID, DISCIPLINE_ID, TITLE, DESCRIPTION, SORT_ORDER)
VALUES (1, 1, 'Introdução e Conceitos Básicos', 'Primeiros passos no mundo da programação.', 1);

INSERT INTO BD2_Modules (MODULE_ID, DISCIPLINE_ID, TITLE, DESCRIPTION, SORT_ORDER)
VALUES (2, 1, 'Variáveis e Tipos de Dados', 'Como armazenar e manipular informações.', 2);

INSERT INTO BD2_Modules (MODULE_ID, DISCIPLINE_ID, TITLE, DESCRIPTION, SORT_ORDER)
VALUES (3, 1, 'Estruturas de Controle', 'Controlando o fluxo de execução do programa.', 3);


-- Submódulos (assumindo que MODULE_ID=2 existe — ok!)
INSERT INTO BD2_Submodules (SUBMODULE_ID, MODULE_ID, TITLE, EXPLANATION, SORT_ORDER)
VALUES (1, 2, 'O que são Variáveis?', 'Uma variável é um espaço na memória do computador destinado a um dado que é alterado durante a execução do algoritmo. Para funcionar, as variáveis precisam ser declaradas, definindo seu nome e o tipo de dado que poderá armazenar.', 1);

INSERT INTO BD2_Submodules (SUBMODULE_ID, MODULE_ID, TITLE, EXPLANATION, SORT_ORDER)
VALUES (2, 2, 'Tipos Primitivos', 'Tipos primitivos são os tipos de dados mais básicos. Geralmente incluem: Inteiro, Real, Caractere e Lógico/Booleano.', 2);


-- Questões
INSERT INTO BD2_Questions (QUESTION_ID, SUBMODULE_ID, QUESTION_TEXT, OPTIONS, CORRECT_ANSWER)
VALUES (1, 1, 'Qual a principal finalidade de uma variável em programação?', '{ "A": "Executar cálculos matemáticos complexos.", "B": "Armazenar um valor na memória que pode ser alterado.", "C": "Exibir mensagens de erro para o usuário." }', 'B');

INSERT INTO BD2_Questions (QUESTION_ID, SUBMODULE_ID, QUESTION_TEXT, OPTIONS, CORRECT_ANSWER)
VALUES (2, 1, 'O que é necessário fazer antes de usar uma variável?', '{ "A": "Apagá-la da memória.", "B": "Atribuir um valor fixo a ela.", "C": "Declarar seu nome e, geralmente, seu tipo." }', 'C');


-- Progresso do usuário — assumindo que PROGRESS_ID é gerado automaticamente (IDENTITY) ou você vai inserir manualmente
-- Se PROGRESS_ID for PK e obrigatório, você PRECISA incluir ele:

INSERT INTO BD2_UserProgress (PROGRESS_ID, USER_ID, SUBMODULE_ID, QUIZ_SCORE, STRENGTH)
VALUES (1, 1, 1, 5, 5);

INSERT INTO BD2_UserProgress (PROGRESS_ID, USER_ID, SUBMODULE_ID, QUIZ_SCORE, STRENGTH)
VALUES (2, 1, 2, 0, 1);


-- Respostas — agora PROGRESS_ID=1 e 2 existem
INSERT INTO BD2_Answers (ANSWER_ID, PROGRESS_ID, QUESTION_ID, USER_ANSWER, IS_CORRECT, ATTEMPT_NUMBER)
VALUES (1, 1, 1, 'B', 1, 1);

INSERT INTO BD2_Answers (ANSWER_ID, PROGRESS_ID, QUESTION_ID, USER_ANSWER, IS_CORRECT, ATTEMPT_NUMBER)
VALUES (2, 1, 2, 'C', 1, 1);


-- Badge
INSERT INTO BD2_Badges (BADGE_ID, USER_ID, SUBMODULE_ID, NAME)
VALUES (1, 1, 1, 'Mestre das Variáveis');
