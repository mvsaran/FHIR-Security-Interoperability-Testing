
// Patient Schema Validation: Ensures that the Patient resource conforms to the expected FHIR schema, validating its structure and required fields.
import Ajv from 'ajv';
import patientSchema from '../schemas/patient-schema.json';

describe('FHIR Patient Schema Validation (public HAPI)', () => {
  const ajv = new Ajv({ allErrors: true, strict:false });
  const validate = ajv.compile(patientSchema);

  it('fetches a sample Patient resource and validates basic schema', () => {
    // Known patient id on public server may vary; using search to get any patient
    cy.request({
      url: '/Patient?_count=1',
      failOnStatusCode: true
    }).then((res) => {
      expect(res.status).to.eq(200);
      // response is a Bundle; get first entry resource
      const entries = res.body.entry || [];
      expect(entries.length).to.be.greaterThan(0);
      const patient = entries[0].resource;
      expect(patient.resourceType).to.eq('Patient');

      const valid = validate(patient);
      if (!valid) {
        // show validation errors in test output
        throw new Error('Schema validation failed: ' + JSON.stringify(validate.errors, null, 2));
      }
    });
  });
});
