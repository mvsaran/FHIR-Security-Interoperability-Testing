
# AI-Enhanced Security & Interoperability Testing (FHIR) - Demo

This demo project provides Cypress-based interoperability & security tests against the **public HAPI FHIR server** (`http://hapi.fhir.org/baseR4`).

> Note: Public HAPI is a shared testing server. Data may be reset or vary. Use for demos and experimentation only.

## What's included
- Cypress tests:
  - `cypress/e2e/patient_schema.cy.js` - fetches a Patient and validates basic JSON schema with Ajv
  - `cypress/e2e/security.cy.js` - sends malformed/malicious payloads and observes responses
- Minimal JSON Schema for Patient in `cypress/schemas/patient-schema.json`
- Example malicious payloads in `cypress/fixtures/malicious_payloads.json`
- `cypress.config.js` preconfigured with `baseUrl` = `http://hapi.fhir.org/baseR4`

## Prerequisites
- Node.js (16+)
- npm
- Internet access (to call public HAPI server)

## Setup
1. Clone or extract the project
2. Install dependencies:
```bash
npm install
```

3. Run Cypress (interactive):
```bash
npx cypress open
```
Or run headless:
```bash
npx cypress run
```

## Notes & Tips
- Public HAPI may return different status codes for POSTs; tests are written leniently to accept a range of possible responses.
- For a more controlled demo, run a local HAPI FHIR server and change `baseUrl` in `cypress.config.js` to `http://localhost:8080/fhir`.
- Do not use real PHI data in public servers.

## License
MIT
