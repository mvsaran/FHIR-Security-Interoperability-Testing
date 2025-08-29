# 🛡️ FHIR Security & Interoperability Testing

This project focuses on **automated testing of FHIR APIs** to ensure both **security** and **interoperability** across healthcare systems. It uses **Cypress** for test automation and integrates **Allure Reports** for rich test insights.

---

## 🔐 What is Security Testing?

Security testing ensures that the FHIR API:
- Rejects unauthorized access
- Handles malformed or malicious payloads safely
- Prevents vulnerabilities like SQL injection and XSS
- Validates authentication and role-based access

> In this project, we simulate attacks and validate safe API behavior using Cypress tests and payload injection scenarios.

---

## 🔄 What is Interoperability Testing?

Interoperability testing ensures that:
- FHIR resources can be exchanged between different systems
- Data integrity is preserved across transfers
- Resource formats conform to FHIR standards

> We validate resource creation, export, import, and round-trip consistency across multiple FHIR servers.

---

## 📁 Folder Structure
FHIR-SECURITY-TESTING/ ├── appointment/ │ └── appointmentAPI.js ├── condition/ │ └── conditionAPI.js ├── encounter/ │ └── securityAPI.js ├── observation/ │ └── observationAPI.js ├── patient/ │ ├── patientAPI.js │ └── patient_schema.js ├── fixtures/ │ └── malicious_payloads.json ├── schemas/ │ └── patient-schema.json ├── support/ │ ├── commands.js │ └── e2e.js ├── cypress.config.js ├── package.json └── README.md

## 🧪 Test Coverage

- ✅ Patient search without auth
- ✅ SQL injection payloads
- ✅ Malformed POST requests
- ✅ Schema validation
  
---
## 🚀 Setup Instructions
### 1️⃣ Install Dependencies

```bash
npm install
2️⃣Install Allure Reporter
npm install -D @shelex/cypress-allure-plugin
npm install -g allure-commandline --save-dev
3️⃣ Configure Cypress for Allure
Update cypress.config.js:

js
const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});

Update support/e2e.js:
import '@shelex/cypress-allure-plugin';

🧪 Run Tests

npx cypress run

📊 Generate Allure Report

allure generate allure-results --clean
allure open

📖 References
HL7 FHIR Spec

HAPI FHIR Server

Cypress Docs

Allure Plugin

👨‍⚕️ Author

Saran Kumar
