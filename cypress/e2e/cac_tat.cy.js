import formData from "../fixtures/formData.json";

describe("Desafio TOTVS - Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("Preenche e envia o formulário com os campos obrigatórios", () => {
    cy.preencherCamposObrigatorios(formData.dadosFormulario);
    cy.submeterFormulario();
    cy.validarMensagemSucesso();
  });

  it("Tenta enviar o formulário sem preencher os campos obrigatórios", () => {
    cy.submeterFormulario();
    cy.validarMensagemErro();
  });

  it("Preenche o formulário completo com anexo e envia corretamente", () => {
    cy.preencherCamposObrigatorios(formData.dadosFormulario);
    cy.preencherCamposOpcionais(formData.dadosFormularioCompleto);
    cy.submeterFormulario();
    cy.validarMensagemSucesso();
  });

  formData.emailsInvalidos.forEach((email) => {
    it(`Exibe mensagem de erro para e-mail inválido: ${email}`, () => {
      cy.preencherFormularioComEmailInvalido(email);
    });
  });

  it("Permite selecionar múltiplos meios de contato", () => {
    cy.selecionarMeiosDeContato(["email", "telefone"]);
  });

  it("Abre a Política de Privacidade em nova aba e valida o conteúdo", () => {
    cy.abrirPoliticaDePrivacidade();
    cy.validarConteudoPoliticaDePrivacidade();
  });
});
