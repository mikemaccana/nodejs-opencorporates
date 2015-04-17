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
				"results": {
					"page": 1,
					"filings": [],
					"perPage": 30,
					"totalPages": 1,
					"totalCount": 0
				},
				"apiVersion": "0.3.2"
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
				"results": {
					"companies": [
						{
							"company": {
								"name": "GITHUB, INC.",
								"inactive": false,
								"source": {
									"publisher": "California Secretary of State",
									"url": "http://kepler.sos.ca.gov/",
									"retrievedAt": "2012-04-03T07:19:16+00:00"
								},
								"companyNumber": "C3268102",
								"jurisdictionCode": "us_ca",
								"incorporationDate": "2009-12-31",
								"dissolutionDate": null,
								"companyType": "Domestic Stock",
								"registryUrl": "https://businessfilings.sos.ca.gov/frmDetail.asp?CorpID=03268102",
								"branchStatus": null,
								"currentStatus": "Active",
								"createdAt": "2011-09-17T15:33:31+00:00",
								"updatedAt": "2013-10-27T06:27:24+00:00",
								"retrievedAt": "2012-04-03T07:19:16+00:00",
								"opencorporatesUrl": "https://opencorporates.com/companies/us_ca/C3268102",
								"previousNames": [],
								"registeredAddressInFull": "548 4TH STREET, SAN FRANCISCO, CA 94107"
							}
						},
						{
							"company": {
								"name": "GITHUB, INC.",
								"inactive": false,
								"source": {
									"publisher": "South Carolina Secretary Of State",
									"url": "http://www.sos.sc.gov/index.asp?n=18&p=4&s=18&corporateid=696754",
									"retrievedAt": "2014-05-21T00:00:00+00:00"
								},
								"companyNumber": "696754",
								"jurisdictionCode": "us_sc",
								"incorporationDate": "2013-09-10",
								"dissolutionDate": null,
								"companyType": null,
								"registryUrl": "http://www.sos.sc.gov/index.asp?n=18&p=4&s=18&corporateid=696754",
								"branchStatus": "branch of an out-of-jurisdiction company",
								"currentStatus": "Good Standing",
								"createdAt": "2014-05-27T04:40:04+00:00",
								"updatedAt": "2014-10-31T08:47:28+00:00",
								"retrievedAt": "2014-05-21T00:00:00+00:00",
								"opencorporatesUrl": "https://opencorporates.com/companies/us_sc/696754",
								"previousNames": [],
								"registeredAddressInFull": null
							}
						},
						{
							"company": {
								"name": "GITHUB, INC.",
								"inactive": null,
								"source": {
									"publisher": "Massachusetts Secretary of the Commonwealth, Corporations Division",
									"url": "http://corp.sec.state.ma.us/CorpWeb/CorpSearch/CorpSummary.aspx?FEIN=001098479",
									"retrievedAt": "2014-09-19T00:46:16+00:00"
								},
								"companyNumber": "001098479",
								"jurisdictionCode": "us_ma",
								"incorporationDate": "2013-01-28",
								"dissolutionDate": null,
								"companyType": "Foreign Corporation",
								"registryUrl": "http://corp.sec.state.ma.us/CorpWeb/CorpSearch/CorpSummary.aspx?FEIN=001098479",
								"branchStatus": "branch of an out-of-jurisdiction company",
								"currentStatus": null,
								"createdAt": "2014-09-15T16:41:23+00:00",
								"updatedAt": "2014-09-22T17:00:00+00:00",
								"retrievedAt": "2014-09-19T00:46:16+00:00",
								"opencorporatesUrl": "https://opencorporates.com/companies/us_ma/001098479",
								"previousNames": [],
								"registeredAddressInFull": "548 4TH STREET, SAN FRANCISCO,, CA, 94107"
							}
						},
						{
							"company": {
								"name": "GITHUB, INC.",
								"inactive": false,
								"source": {
									"publisher": "California Secretary of State",
									"url": "http://kepler.sos.ca.gov/",
									"retrievedAt": null
								},
								"companyNumber": "C3488095",
								"jurisdictionCode": "us_ca",
								"incorporationDate": "2012-07-11",
								"dissolutionDate": null,
								"companyType": null,
								"registryUrl": "https://businessfilings.sos.ca.gov/frmDetail.asp?CorpID=03488095",
								"branchStatus": "branch of an out-of-jurisdiction company",
								"currentStatus": "Active",
								"createdAt": "2013-06-19T20:45:41+00:00",
								"updatedAt": "2014-10-31T06:26:37+00:00",
								"retrievedAt": null,
								"opencorporatesUrl": "https://opencorporates.com/companies/us_ca/C3488095",
								"previousNames": [],
								"registeredAddressInFull": "3500 S DUPONT HWY, DOVER, CO 19901"
							}
						}
					],
					"page": 1,
					"perPage": 30,
					"totalPages": 1,
					"totalCount": 4
				},
				"apiVersion": "0.3.2"
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
			assert.equal(res.results.corporateGrouping.memberships.length, 112)
			done()
		})
	})

})

