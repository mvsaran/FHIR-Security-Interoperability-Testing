describe('FHIR Encounter Resource', () => {
  it('fetches an Encounter and validates resourceType', () => {
    cy.request({
      url: '/Encounter?_count=1',
      timeout: 120000, // wait up to 2 minutes
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.resourceType).to.eq('Bundle');
      const entries = res.body.entry || [];
      expect(entries.length).to.be.greaterThan(0);
      expect(entries[0].resource.resourceType).to.eq('Encounter');
    });
  });
});
