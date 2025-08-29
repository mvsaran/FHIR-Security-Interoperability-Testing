// Observation: Captures measurements, assessments, or test results about a patient, such as vital signs or lab results.
describe('FHIR Observation Resource', () => {
  it('fetches an Observation and validates resourceType', () => {
    cy.request('/Observation?_count=1').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.resourceType).to.eq('Bundle');
      const entries = res.body.entry || [];
      expect(entries.length).to.be.greaterThan(0);
      expect(entries[0].resource.resourceType).to.eq('Observation');
    });
  });
});
