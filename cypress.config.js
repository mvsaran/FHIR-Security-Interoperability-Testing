const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://hapi.fhir.org/baseR4",
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    specPattern: "cypress/e2e/**/*.cy.js",
  }
});
