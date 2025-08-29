// Appointment: Represents a scheduled healthcare event between a patient and provider, such as a visit or consultation.
// ...existing code...
describe('FHIR Appointment Resource', () => {
  it('fetches an Appointment and validates resourceType', () => {
    cy.request('/Appointment?_count=1').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.resourceType).to.eq('Bundle');
      const entries = res.body.entry || [];
      expect(entries.length).to.be.greaterThan(0);
      expect(entries[0].resource.resourceType).to.eq('Appointment');
    });
  });
});
