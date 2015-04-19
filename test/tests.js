// Tests. Mocha TDD/assert style. See
// http://visionmedia.github.com/mocha/
// http://nodejs.org/docs/latest/api/assert.html
var assert = require('assert')
var openCorporates = require('../index.js')()

var log = console.log.bind(console);

suite('Companies', function(){

	test('Getting', function(done){
		this.timeout(5 * 1000);
		openCorporates.companies.get('us_ca', 'C2474131', function(err, res, meta){
			var expected = {
				"name": "GOOGLE INC.",
				"inactive": false,
				"source": {
					"publisher": "California Secretary of State",
					"url": "http://kepler.sos.ca.gov/",
					"retrievedAt": "2014-02-09T19:01:42+00:00"
				},
				"data": {
					"url": "https://opencorporates.com/companies/us_ca/C2474131/data",
					"mostRecent": [
						{
							"datum": {
								"id": 2685290,
								"title": "Approved US Government Supplier",
								"description": null,
								"dataType": "GovernmentApprovedSupplier",
								"opencorporatesUrl": "https://opencorporates.com/data/2685290"
							}
						},
						{
							"datum": {
								"id": 4913217,
								"title": "Company Address",
								"description": "1600 AMPHITHEATRE PKWY, MOUNTAIN VIEW, CA, 940431351",
								"dataType": "CompanyAddress",
								"opencorporatesUrl": "https://opencorporates.com/data/4913217"
							}
						}
					],
					"totalCount": 2
				},
				"filings": [],
				"officers": [],
				"companyNumber": "C2474131",
				"jurisdictionCode": "us_ca",
				"incorporationDate": "2002-11-07",
				"dissolutionDate": null,
				"companyType": "Foreign Stock",
				"registryUrl": "https://businessfilings.sos.ca.gov/frmDetail.asp?CorpID=02474131",
				"branchStatus": "branch of an out-of-jurisdiction company",
				"currentStatus": "Active",
				"createdAt": "2011-09-21T22:27:02+00:00",
				"updatedAt": "2014-10-31T06:55:32+00:00",
				"retrievedAt": "2014-02-09T19:01:42+00:00",
				"opencorporatesUrl": "https://opencorporates.com/companies/us_ca/C2474131",
				"previousNames": [],
				"agentName": "CORPORATION SERVICE COMPANY WHICH WILL DO BUSINESS IN CALIFORNIA AS CSC - LAWYERS INCORPORATING SERVICE",
				"agentAddress": "2710 GATEWAY OAKS DR STE 150N, SACRAMENTO, CA 95833",
				"registeredAddressInFull": "1600 AMPHITHEATRE PARKWAY, MOUNTAIN VIEW, CA 94043",
				"registeredAddress": {
					"locality": null,
					"region": null,
					"country": "United States",
					"streetAddress": "1600 AMPHITHEATRE PARKWAY, MOUNTAIN VIEW, CA 94043",
					"postalCode": null
				},
				"corporateGroupings": [],
				"industryCodes": [],
				"financialSummary": null,
				"homeCompany": null,
				"controllingEntity": {
					"name": "GOOGLE INC.",
					"jurisdictionCode": "us_de",
					"companyNumber": null,
					"opencorporatesUrl": "https://opencorporates.com/placeholders/691721"
				}
			}
			assert.deepEqual(res, expected)
			done()
		})
	})

	test('Filings', function(done){
		this.timeout(5 * 1000);
		openCorporates.companies.filings('us_ca', 'C2474131', function(err, res, meta){
			assert.deepEqual(res, null)
			var expected = {
				"page": 0,
				"perPage": 0,
				"totalPages": 0,
				"totalCount": 0
			}
			assert.deepEqual(meta, expected)
			done()
		})
	})

	test('Search', function(done){
		// brent at Stormpath: You just need to disable the password reset workflow in the Stormpath admin console (or via the API) and then you can generate the password reset token by hitting the same /passwordResetTokens endpoint (or via the SDK) as always. The response body contains the HREF with the token.
		this.timeout(5 * 1000);
		openCorporates.companies.search('GITHUB, INC.', function(err, res, meta){
			var expected = [
				{
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
				},
				{
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
				},
				{
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
				},
				{
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
				]
			assert.deepEqual(res, expected)
			done()
		})
	})
})


suite('Corporate groupings', function(){

	test('Filings', function(done){
		this.timeout(5 * 1000);
		openCorporates.corporateGroupings.get('bp', function(err, res, meta){
			assert.equal(res.memberships.length, 112)
			done()
		})
	})

})

