// Condition: Describes a clinical problem, diagnosis, or disease identified in a patient.
describe('FHIR Condition Resource', () => {
  it('fetches a Condition and validates resourceType', () => {
    cy.request('/Condition?_count=1').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.resourceType).to.eq('Bundle');
      const entries = res.body.entry || [];
      expect(entries.length).to.be.greaterThan(0);
      expect(entries[0].resource.resourceType).to.eq('Condition');
    });
  });
});
