const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'http://127.0.0.1:5500',
    specPattern: '**/*.cy.js',
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome-report',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportFilename: "report",
    timestamp: "mmddyyyy_HHMMss",
    // Junta todos os assets (CSS/JS) no HTML — gera um único arquivo mais fácil de compartilhar
    inlineAssets: true,
    // Abre o relatório automaticamente após a execução (em alguns sistemas pode não funcionar)
    toOpen: true,
    reportPageTitle: "Relatório de execução de testes E2E - Projeto Cactus TOTVS",
    // Embute screenshots automáticos no relatório (quando o teste falhar)
    embeddedScreenshots: true
  }
});
