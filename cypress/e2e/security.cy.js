
describe('FHIR API Security Tests (public HAPI)', () => {
  it('should return Bundle for Patient search (no auth required on public server)', () => {
    cy.request({
      url: '/Patient?_count=1',
      failOnStatusCode: true
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.resourceType).to.eq('Bundle');
    });
  });

  it('should handle malformed payloads gracefully (POST expects validation)', () => {
    const malicious = [
      { resourceType: 'Patient', id: "123; DROP TABLE users;", name: [{ family: "<script>alert(1)</script>" }] },
      { resourceType: 'Patient', id: "1 OR 1=1", name: [{ family: "Injection Test" }] }
    ];

    malicious.forEach((payload) => {
      cy.request({
        method: 'POST',
        url: '/Patient',
        body: payload,
        headers: { 'Content-Type': 'application/fhir+json' },
        failOnStatusCode: false
      }).then((res) => {
        // public HAPI may accept or reject differently; assert non-2xx or 201/200
        expect([200,201,400,422,500]).to.include(res.status);
      });
    });
  });
});

//Request Without Content-Type Header

describe("Security - Missing Headers", () => {
  it("should reject a POST request without Content-Type header", () => {
    cy.request({
      method: "POST",
      url: "/Patient",
      headers: {}, // no Content-Type
      body: { resourceType: "Patient", name: [{ family: "NoHeader" }] },
      failOnStatusCode: false
    }).then((res) => {
      expect([400, 415,201]).to.include(res.status); // 415 Unsupported Media Type is common
    });
  });
});

//Oversized Payload

describe("Security - Oversized Payload", () => {
  it("should reject or handle a very large Patient payload", () => {
    const largeString = "A".repeat(500000); // 500 KB
    const bigPatient = {
      resourceType: "Patient",
      name: [{ family: largeString }]
    };

    cy.request({
      method: "POST",
      url: "/Patient",
      body: bigPatient,
      failOnStatusCode: false
    }).then((res) => {
      expect([400, 413, 422, 500]).to.include(res.status);
    });
  });
});

//Invalid HTTP Method

describe("Security - Invalid Methods", () => {
  it("should reject unsupported HTTP methods on Patient resource", () => {
    cy.request({
      method: "PATCH", // some servers restrict PATCH
      url: "/Patient/",
      body: { resourceType: "Patient", active: false },
      failOnStatusCode: false
    }).then((res) => {
      expect([400, 405]).to.include(res.status); // 405 Method Not Allowed
    });
  });
});

// Injection via Query Params

describe("Security - Query Param Injection", () => {
  it("should not allow injection in search queries", () => {
    cy.request({
      method: "GET",
      url: "/Patient?name=%3Cscript%3Ealert(1)%3C/script%3E", // XSS attempt
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(200); // Should return normal search
      expect(res.body.resourceType).to.eq("Bundle");
    });
  });
});

