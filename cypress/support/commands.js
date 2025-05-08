import testIds from "./testIds";
import formData from "../fixtures/formData.json";

Cypress.Commands.add(
  "preencherCamposObrigatorios",
  ({ primeiroNome, sobrenome, email, mensagem }) => {
    cy.get(testIds.firstNameInput).type(primeiroNome);
    cy.get(testIds.lastNameInput).type(sobrenome);
    cy.get(testIds.emailInput).type(email);
    cy.get(testIds.helpTextArea).type(mensagem);
  }
);

Cypress.Commands.add(
  "preencherCamposOpcionais",
  ({
    produto,
    tipoAtendimento,
    contatoEmail,
    contatoTelefone,
    caminhoArquivo,
  }) => {
    cy.get(testIds.productSelect).select(produto);

    if (tipoAtendimento === "ajuda") {
      cy.get(testIds.supportTypeAjuda).check();
    } else if (tipoAtendimento === "elogio") {
      cy.get(testIds.supportTypeElogio).check();
    } else if (tipoAtendimento === "feedback") {
      cy.get(testIds.supportTypeFeedback).check();
    }

    if (contatoEmail) {
      cy.get(testIds.contactPreferenceEmail).check();
    }

    if (contatoTelefone) {
      cy.get(testIds.contactPreferencePhone).check();
    }

    if (caminhoArquivo) {
      cy.get(testIds.fileUpload).selectFile(caminhoArquivo);
    }
  }
);

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

Cypress.Commands.add("selecionarMeiosDeContato", (opcoes = []) => {
  if (opcoes.includes("email")) {
    cy.get(testIds.contactPreferenceEmail).check().should("be.checked");
  }
  if (opcoes.includes("telefone")) {
    cy.get(testIds.contactPreferencePhone).check().should("be.checked");
  }
});

Cypress.Commands.add("abrirPoliticaDePrivacidade", () => {
  cy.get(testIds.privacyLink)
    .should("have.attr", "target", "_blank")
    .and("have.attr", "href")
    .and("include", "privacy.html");

  cy.get(testIds.privacyLink).then(($link) => {
    const url = $link.prop("href");
    cy.visit(url);
  });
});

Cypress.Commands.add("validarConteudoPoliticaDePrivacidade", () => {
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

Cypress.Commands.add("submeterFormulario", () => {
  cy.get(testIds.buttonSubmit).click();
});

Cypress.Commands.add("validarMensagemSucesso", () => {
  cy.get(testIds.successMessage)
    .should("be.visible")
    .and("contain", formData.mensagens.sucessoMensagemEnviada);
});

Cypress.Commands.add("validarMensagemErro", () => {
  cy.get(testIds.errorMessage)
    .should("be.visible")
    .and("contain", formData.mensagens.erroCamposObrigatorios);
});
