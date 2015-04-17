// Tests. Mocha TDD/assert style. See
// http://visionmedia.github.com/mocha/
// http://nodejs.org/docs/latest/api/assert.html
var assert = require('assert')
var openCorporates = require('../index.js')()

var log = console.log.bind(console);

suite('Companies', function(){

	test('Filings', function(done){
		this.timeout(5 * 1000);
		openCorporates.companies.filings('us_ca', 'C3268102', function(err, res){
			var expected = {
				"api_version": "0.3.2",
				"results": {
					"page": 1,
					"per_page": 30,
					"total_pages": 1,
					"total_count": 0,
					"filings": []
				}
			}
			assert.deepEqual(res, expected)
			done()
		})
	})

	test('Search', function(done){
		// brent at Stormpath: You just need to disable the password reset workflow in the Stormpath admin console (or via the API) and then you can generate the password reset token by hitting the same /passwordResetTokens endpoint (or via the SDK) as always. The response body contains the HREF with the token.
		this.timeout(5 * 1000);
		openCorporates.companies.search('GITHUB, INC.', function(err, res){
			var expected = {
				"api_version": "0.3.2",
				"results": {
					"companies": [
						{
							"company": {
								"name": "GITHUB, INC.",
								"company_number": "C3268102",
								"jurisdiction_code": "us_ca",
								"incorporation_date": "2009-12-31",
								"dissolution_date": null,
								"company_type": "Domestic Stock",
								"registry_url": "https://businessfilings.sos.ca.gov/frmDetail.asp?CorpID=03268102",
								"branch_status": null,
								"inactive": false,
								"current_status": "Active",
								"created_at": "2011-09-17T15:33:31+00:00",
								"updated_at": "2013-10-27T06:27:24+00:00",
								"retrieved_at": "2012-04-03T07:19:16+00:00",
								"opencorporates_url": "https://opencorporates.com/companies/us_ca/C3268102",
								"previous_names": [],
								"source": {
									"publisher": "California Secretary of State",
									"url": "http://kepler.sos.ca.gov/",
									"retrieved_at": "2012-04-03T07:19:16+00:00"
								},
								"registered_address_in_full": "548 4TH STREET, SAN FRANCISCO, CA 94107"
							}
						},
						{
							"company": {
								"name": "GITHUB, INC.",
								"company_number": "696754",
								"jurisdiction_code": "us_sc",
								"incorporation_date": "2013-09-10",
								"dissolution_date": null,
								"company_type": null,
								"registry_url": "http://www.sos.sc.gov/index.asp?n=18&p=4&s=18&corporateid=696754",
								"branch_status": "branch of an out-of-jurisdiction company",
								"inactive": false,
								"current_status": "Good Standing",
								"created_at": "2014-05-27T04:40:04+00:00",
								"updated_at": "2014-10-31T08:47:28+00:00",
								"retrieved_at": "2014-05-21T00:00:00+00:00",
								"opencorporates_url": "https://opencorporates.com/companies/us_sc/696754",
								"previous_names": [],
								"source": {
									"publisher": "South Carolina Secretary Of State",
									"url": "http://www.sos.sc.gov/index.asp?n=18&p=4&s=18&corporateid=696754",
									"retrieved_at": "2014-05-21T00:00:00+00:00"
								},
								"registered_address_in_full": null
							}
						},
						{
							"company": {
								"name": "GITHUB, INC.",
								"company_number": "001098479",
								"jurisdiction_code": "us_ma",
								"incorporation_date": "2013-01-28",
								"dissolution_date": null,
								"company_type": "Foreign Corporation",
								"registry_url": "http://corp.sec.state.ma.us/CorpWeb/CorpSearch/CorpSummary.aspx?FEIN=001098479",
								"branch_status": "branch of an out-of-jurisdiction company",
								"inactive": null,
								"current_status": null,
								"created_at": "2014-09-15T16:41:23+00:00",
								"updated_at": "2014-09-22T17:00:00+00:00",
								"retrieved_at": "2014-09-19T00:46:16+00:00",
								"opencorporates_url": "https://opencorporates.com/companies/us_ma/001098479",
								"previous_names": [],
								"source": {
									"publisher": "Massachusetts Secretary of the Commonwealth, Corporations Division",
									"url": "http://corp.sec.state.ma.us/CorpWeb/CorpSearch/CorpSummary.aspx?FEIN=001098479",
									"retrieved_at": "2014-09-19T00:46:16+00:00"
								},
								"registered_address_in_full": "548 4TH STREET, SAN FRANCISCO,, CA, 94107"
							}
						},
						{
							"company": {
								"name": "GITHUB, INC.",
								"company_number": "C3488095",
								"jurisdiction_code": "us_ca",
								"incorporation_date": "2012-07-11",
								"dissolution_date": null,
								"company_type": null,
								"registry_url": "https://businessfilings.sos.ca.gov/frmDetail.asp?CorpID=03488095",
								"branch_status": "branch of an out-of-jurisdiction company",
								"inactive": false,
								"current_status": "Active",
								"created_at": "2013-06-19T20:45:41+00:00",
								"updated_at": "2014-10-31T06:26:37+00:00",
								"retrieved_at": null,
								"opencorporates_url": "https://opencorporates.com/companies/us_ca/C3488095",
								"previous_names": [],
								"source": {
									"publisher": "California Secretary of State",
									"url": "http://kepler.sos.ca.gov/",
									"retrieved_at": null
								},
								"registered_address_in_full": "3500 S DUPONT HWY, DOVER, CO 19901"
							}
						}
					],
					"page": 1,
					"per_page": 30,
					"total_pages": 1,
					"total_count": 4
				}
			}
			assert.deepEqual(res, expected)
			done()
		})
	})
})


suite('Corporate groupings', function(){

	test('Filings', function(done){
		this.timeout(5 * 1000);
		openCorporates.corporateGroupings.get('bp', function(err, res){
			assert.equal(res.results.corporate_grouping.memberships.length, 112)
			done()
		})
	})

})

