# Desafio de Automação Cypress - Central de Atendimento ao Cliente TAT

![Cypress](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg?style=flat-square)
![JavaScript](https://img.shields.io/badge/language-JavaScript-F7DF1E.svg?style=flat-square)
![GitHub](https://img.shields.io/badge/repository-alaninfo23/desafio_automacao_cypress_totvs-blue?style=flat-square)

Este projeto contém testes automatizados End-to-End desenvolvidos com o framework Cypress para a Central de Atendimento ao Cliente (TAT). Este projeto foi proposto como um desafio, e os testes visam garantir a funcionalidade e a qualidade do formulário de contato.

## 🚀 Como Executar os Testes

Para executar os testes localmente, siga estas etapas:

1.  **Clone o repositório do projeto:**

    ```bash
    git clone https://github.com/alaninfo23/desafio_automacao_cypress_totvs
    cd desafio_automacao_cypress_totvs
    ```

2.  **Instale as dependências do Cypress:**

    Certifique-se de ter o Node.js e o npm (ou yarn) instalados em seu ambiente. Execute o seguinte comando na raiz do projeto:

    ```bash
    npm install cypress --save-dev
    # ou
    yarn add cypress --dev
    ```

    Este comando fará o download e a instalação do Cypress e de suas dependências.

3.  **Execute os testes Cypress:**

    Você pode escolher entre executar os testes com a interface gráfica do Cypress ou diretamente no terminal:

    **Abrindo o Cypress Test Runner (GUI):**

        ```bash
        npx cypress open
        # ou
        yarn cypress open
        ```

        Esta opção abrirá a interface do Cypress, permitindo que você visualize os arquivos de teste e os execute individualmente ou em conjunto de forma interativa.

    **Executando os testes no modo headless (terminal):**

        ```bash
        npx cypress run
        # ou
        yarn cypress run
        ```

        Este modo executa os testes sem a interface gráfica, sendo ideal para integrações contínuas e para obter relatórios de execução no terminal.

## 🧪 Testes Implementados

Os seguintes cenários de teste foram automatizados:

* **Preenchimento e envio do formulário com campos obrigatórios:** Verifica se o formulário é enviado com sucesso ao preencher nome, e-mail, telefone e mensagem.
* **Tentativa de envio do formulário sem campos obrigatórios:** Garante que o sistema impede o envio de um formulário incompleto, exibindo a mensagem de erro esperada.
* **Preenchimento completo do formulário com anexo e envio:** Valida o envio do formulário com todos os campos preenchidos, incluindo o upload de um arquivo, e confirma o sucesso da submissão.
* **Exibição de mensagem de erro para e-mails inválidos:** Utiliza uma variedade de e-mails com formatos inválidos para verificar se o sistema os identifica e informa o usuário sobre o erro.
* **Seleção de múltiplos meios de contato:** Assegura que o usuário pode selecionar mais de uma opção de contato (por exemplo, e-mail e telefone).
* **Abertura e validação do conteúdo da Política de Privacidade em nova aba:** Verifica se o link da Política de Privacidade abre em uma nova aba do navegador e se o conteúdo carregado corresponde ao esperado.

## 🗂️ Estrutura do Projeto

A estrutura de arquivos e diretórios para este projeto de testes Cypress é a seguinte:
```
cypress/
├── e2e/
│   └── cac_tat.cy.js   # Arquivo principal de testes
├── fixtures/
│   ├── formData.json   # Dados de teste (formulário, e-mails inválidos)
│   └── totvs.png       # Logo da TOTVS (utilizado nos testes ou na aplicação)
└── support/
├── commands.js         # Comandos personalizados do Cypress
├── e2e.js              # Arquivo de suporte para configurações E2E
└── testIds.js          # Seletores para elementos de teste
```

* `cypress/e2e/desafio-tat.cy.js`: Contém os scripts de teste End-to-End para o desafio TAT.
* `cypress/fixtures/formData.json`: Arquivo JSON com dados para os testes, incluindo informações do formulário e e-mails inválidos.
* `cypress/fixtures/totvs.png`: Arquivo de imagem do logo da TOTVS usado nos testes.
* `cypress/support/commands.js`: Define comandos personalizados do Cypress para facilitar a escrita e a leitura dos testes.
* `cypress/support/e2e.js`: Arquivo que contém configurações e funções de suporte que são executadas antes de cada teste dentro da pasta `e2e`.
* `cypress/support/testIds.js`: Arquivo com identificadores únicos (data-testIds) para elementos HTML, usados para tornar os seletores dos testes mais robustos e menos propensos a quebrar devido a mudanças no CSS.