// Tests. Mocha TDD/assert style. See
// http://visionmedia.github.com/mocha/
// http://nodejs.org/docs/latest/api/assert.html
const assert = require('assert'),
  openCorporates = require('../index.js')()

const log = console.log;

suite('Companies', function () {

  test('Getting a company', async function () {
    this.timeout(5 * 1000);
    const company = await openCorporates.companies.get('us_ca', 'C2474131')
    assert.equal(company.registeredAddress.streetAddress, `1600 AMPHITHEATRE PKWY\nMOUNTAIN VIEW CA 94043`)
  })

  test('Getting filings', async function () {
    this.timeout(5 * 1000);
    const filings = await openCorporates.companies.filings('us_ca', 'C2474131')
    assert.equal(filings.title)
  })

  test('Search US and Canada', async function () {
    this.timeout(5 * 1000);
    try {
      const results = await openCorporates.companies.search('rogers', { countryCode: ['us', 'ca'] })
    } catch (error) {
      assert.equal(error.message, 'Unauthorized')
    }
  })

  test('Search worldwide by address', async function () {
    this.timeout(5 * 1000);
    const results = await openCorporates.companies.search(null, { registeredAddress: '10 EAST 39TH NEW YORK' })
    assert(results[10].registeredAddress)
  })

  test('Search worldwide', async function () {
    this.timeout(5 * 1000);
    const results = await openCorporates.companies.search('Tullamarine Valve')
    assert(results[0].companyNumber)
  })

  test('Data', async function () {
    this.timeout(5 * 1000);
    const results = await openCorporates.companies.data('us_ca', 'C3268102')
    var expected = "Mailing Address"
    assert.deepEqual(results[0].title, expected)
  })

  test('Search in jurisdiction', async function () {
    this.timeout(5 * 1000);
    try {
      const results = await openCorporates.companies.search('github', { countryCode: 'us' })
    } catch (error) {
      assert.equal(error.message, 'Unauthorized')
    }
  })
})

suite('Corporate groupings', function () {

  test('Filings', async function () {
    this.timeout(5 * 1000);
    const results = await openCorporates.corporateGroupings.get('bp')
    assert.equal(results.memberships.length, 112)
  })

})

