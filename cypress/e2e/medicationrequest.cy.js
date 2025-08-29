describe('FHIR MedicationRequest Resource', () => {
  it('fetches a MedicationRequest and validates resourceType', () => {
    // MedicationRequest: Documents a request or order for a patient to receive a medication.
    cy.request('/MedicationRequest?_count=1').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.resourceType).to.eq('Bundle');
      const entries = res.body.entry || [];
      expect(entries.length).to.be.greaterThan(0);
      expect(entries[0].resource.resourceType).to.eq('MedicationRequest');
    });
  });
});
