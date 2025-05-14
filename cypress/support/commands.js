import testIds from "./testIds";
import formData from "../fixtures/formData.json";

// Comando para preencher os campos obrigatórios do formulário
Cypress.Commands.add(
  "preencherCamposObrigatorios",
  ({ primeiroNome, sobrenome, email, mensagem }) => {
    cy.get(testIds.firstNameInput).type(primeiroNome);
    cy.get(testIds.lastNameInput).type(sobrenome);
    cy.get(testIds.emailInput).type(email);
    cy.get(testIds.helpTextArea).type(mensagem);
  }
);

// Comando para preencher os campos opcionais do formulário
Cypress.Commands.add(
  "preencherCamposOpcionais",
  ({
    produto,
    tipoAtendimento,
    contatoEmail,
    contatoTelefone,
    caminhoArquivo,
  }) => {
    cy.get(testIds.productSelect).select(produto); // Seleciona o produto

    // Marca o tipo de atendimento
    if (tipoAtendimento === "ajuda") {
      cy.get(testIds.supportTypeAjuda).check();
    } else if (tipoAtendimento === "elogio") {
      cy.get(testIds.supportTypeElogio).check();
    } else if (tipoAtendimento === "feedback") {
      cy.get(testIds.supportTypeFeedback).check();
    }

    // Marca os meios de contato, se selecionados
    if (contatoEmail) {
      cy.get(testIds.contactPreferenceEmail).check();
    }

    if (contatoTelefone) {
      cy.get(testIds.contactPreferencePhone).check();
    }

    // Seleciona o arquivo se houver
    if (caminhoArquivo) {
      cy.get(testIds.fileUpload).selectFile(caminhoArquivo);
    }
  }
);

// Comando para preencher o formulário com um email inválido e verificar o erro
Cypress.Commands.add("preencherFormularioComEmailInvalido", (email) => {
  cy.get(testIds.firstNameInput).type("Alan");
  cy.get(testIds.lastNameInput).type("QA");
  cy.get(testIds.emailInput).clear().type(email);
  cy.get(testIds.helpTextArea).type("Mensagem de teste.");
  cy.get(testIds.buttonSubmit).click();
  cy.get(testIds.errorMessage)
    .should("be.visible")
    .and("contain", formData.mensagens.erroCamposObrigatorios);
});

// Comando para selecionar os meios de contato (email ou telefone)
Cypress.Commands.add("selecionarMeiosDeContato", (opcoes = []) => {
  if (opcoes.includes("email")) {
    cy.get(testIds.contactPreferenceEmail).check().should("be.checked");
  }
  if (opcoes.includes("telefone")) {
    cy.get(testIds.contactPreferencePhone).check().should("be.checked");
  }
});

// Comando para abrir o link da Política de Privacidade
Cypress.Commands.add("abrirPoliticaDePrivacidade", () => {
  cy.get(testIds.privacyLink)
    .should("have.attr", "target", "_blank") // Verifica se o link abre em nova aba
    .and("have.attr", "href")
    .and("include", "privacy.html");

  cy.get(testIds.privacyLink).then(($link) => {
    const url = $link.prop("href"); // Obtém o URL
    cy.visit(url); // Visita a URL
  });
});

// Comando para validar o conteúdo da Política de Privacidade
Cypress.Commands.add("validarConteudoPoliticaDePrivacidade", () => {
  // Valida se os textos da política estão visíveis
  cy.contains(formData.mensagens.politicaPrivacidadeConteudo1).should(
    "be.visible"
  );
  cy.contains(formData.mensagens.politicaPrivacidadeConteudo2).should(
    "be.visible"
  );
  cy.contains(formData.mensagens.politicaPrivacidadeConteudo3).should(
    "be.visible"
  );
  cy.contains(formData.mensagens.politicaPrivacidadeConteudo4).should(
    "be.visible"
  );
});

// Comando para submeter o formulário
Cypress.Commands.add("submeterFormulario", () => {
  cy.get(testIds.buttonSubmit).click(); // Clica no botão de enviar
});

// Comando para validar a mensagem de sucesso após o envio
Cypress.Commands.add("validarMensagemSucesso", () => {
  cy.get(testIds.successMessage)
    .should("be.visible")
    .and("contain", formData.mensagens.sucessoMensagemEnviada);
});

// Comando para validar a mensagem de erro após tentativa de envio sem preencher os campos obrigatórios
Cypress.Commands.add("validarMensagemErro", () => {
  cy.get(testIds.errorMessage)
    .should("be.visible")
    .and("contain", formData.mensagens.erroCamposObrigatorios); 
});
