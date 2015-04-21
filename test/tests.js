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
				"agentName": "CORPORATION SERVICE COMPANY WHICH WILL DO BUSINESS IN CALIFORNIA AS CSC - LAWYERS INCORPORATING SERVICE",
				"agentAddress": "2710 GATEWAY OAKS DR STE 150N, SACRAMENTO, CA 95833",
				"registeredAddressInFull": "1600 AMPHITHEATRE PARKWAY, MOUNTAIN VIEW, CA 94043",
				"alternativeNames": [],
				"previousNames": [],
				"industryCodes": [],
				"registeredAddress": {
					"locality": null,
					"region": null,
					"country": "United States",
					"streetAddress": "1600 AMPHITHEATRE PARKWAY, MOUNTAIN VIEW, CA 94043",
					"postalCode": null
				},
				"corporateGroupings": [],
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

	test('Search US and Canada', function(done){
		this.timeout(5 * 1000);
		openCorporates.companies.search('rogers', {countryCode: ['us','ca']}, function(err, res, meta){
			assert.equal(null, err)
			done()
		})
	})

	test('Search worldwide by address', function(done){
		this.timeout(5 * 1000);
		openCorporates.companies.search(null, {registeredAddress: '10 EAST 39TH NEW YORK'}, function(err, res, meta){
			var expected = [
			  {
			    "name": "20 EAST COPIER, INC.",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": "2015-03-24T10:13:33+00:00"
			    },
			    "companyNumber": "1412010",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "1990-01-05",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=1412010&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2013-08-13T23:47:31+00:00",
			    "updatedAt": "2015-03-24T10:13:33+00:00",
			    "retrievedAt": "2015-03-24T10:13:33+00:00",
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/1412010",
			    "previousNames": [],
			    "registeredAddressInFull": "MYRON SCHONFELD, 10 EAST 39TH STREET, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "2066 REALTY, INC.",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": "2015-03-24T08:58:16+00:00"
			    },
			    "companyNumber": "4331531",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2012-12-12",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=4331531&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2013-08-13T23:46:38+00:00",
			    "updatedAt": "2015-03-24T08:58:17+00:00",
			    "retrievedAt": "2015-03-24T08:58:16+00:00",
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/4331531",
			    "previousNames": [],
			    "registeredAddressInFull": "C/O IRVING PORT, ESQ., 10 EAST 39TH STREET, SUITE 1112, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "3JA FASHION INC.",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": "2015-04-19T14:34:32+00:00"
			    },
			    "companyNumber": "3838694",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2009-07-28",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=3838694&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2013-08-14T00:50:33+00:00",
			    "updatedAt": "2015-04-19T14:34:32+00:00",
			    "retrievedAt": "2015-04-19T14:34:32+00:00",
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/3838694",
			    "previousNames": [],
			    "registeredAddressInFull": "3JA FASHION INC., 10 FL. EAST UNIT, 251 W. 39TH ST., NEW YORK, NEW YORK, 10018"
			  },
			  {
			    "name": "62 WEST 37 STREET REALTY LLC",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": "2015-04-21T07:25:21+00:00"
			    },
			    "companyNumber": "4318908",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2012-11-13",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC LIMITED LIABILITY COMPANY",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=4318908&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2013-08-14T02:07:19+00:00",
			    "updatedAt": "2015-04-21T07:25:21+00:00",
			    "retrievedAt": "2015-04-21T07:25:21+00:00",
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/4318908",
			    "previousNames": [],
			    "registeredAddressInFull": "62 WEST 37 STREET REALTY LLC, 10 EAST 39TH STREET, 4TH FLOOR, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "A TO Z SOLUTIONS INTERNATIONAL, LLC",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "3180749",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2005-03-23",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC LIMITED LIABILITY COMPANY",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=3180749&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2013-08-14T10:58:27+00:00",
			    "updatedAt": "2013-08-14T10:58:27+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/3180749",
			    "previousNames": [],
			    "registeredAddressInFull": "10 EAST 39TH ST #901, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "ABC MULTI SERVICE, INC.",
			    "inactive": true,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "2048246",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "1996-07-16",
			    "dissolutionDate": "2000-12-27",
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=2048246&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Inactive   Dissolution By Proclamation / Annulment Of Authority",
			    "createdAt": "2013-09-03T09:09:19+00:00",
			    "updatedAt": "2013-09-03T09:09:19+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/2048246",
			    "previousNames": [],
			    "registeredAddressInFull": "C/O LISA LEE, 10 EAST 39TH STREET, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "AFGHAN AMERICAN INT'L FORWARDING CORP.",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": "2015-03-16T09:03:24+00:00"
			    },
			    "companyNumber": "1643039",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "1992-06-10",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=1643039&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2013-08-14T05:04:05+00:00",
			    "updatedAt": "2015-03-16T09:03:24+00:00",
			    "retrievedAt": "2015-03-16T09:03:24+00:00",
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/1643039",
			    "previousNames": [],
			    "registeredAddressInFull": "FAHIM BAYAT, 10 EAST 39TH STREET, SUITE 525, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "AI RELOCATION, INC.",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": "2014-02-01T02:35:20+00:00"
			    },
			    "companyNumber": "4521831",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2014-01-30",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=4521831&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2014-01-31T08:34:57+00:00",
			    "updatedAt": "2014-02-01T02:35:20+00:00",
			    "retrievedAt": "2014-02-01T02:35:20+00:00",
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/4521831",
			    "previousNames": [],
			    "registeredAddressInFull": "ITAY GAMLIELI, 10 EAST 39TH ST, SUITE 925, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "ALAIDE 07, INC.",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": "2015-03-17T03:28:53+00:00"
			    },
			    "companyNumber": "3699135",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2008-07-22",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=3699135&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2013-08-14T05:50:55+00:00",
			    "updatedAt": "2015-03-17T03:28:53+00:00",
			    "retrievedAt": "2015-03-17T03:28:53+00:00",
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/3699135",
			    "previousNames": [],
			    "registeredAddressInFull": "C/O IRVING PORT ESQ, 10 EAST 39TH ST STE 1112, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "ALBATROSS COUNTRY CLUB, LLC",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": "2015-03-17T06:37:21+00:00"
			    },
			    "companyNumber": "2967998",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2003-10-22",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC LIMITED LIABILITY COMPANY",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=2967998&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2013-08-14T05:56:06+00:00",
			    "updatedAt": "2015-03-17T06:37:21+00:00",
			    "retrievedAt": "2015-03-17T06:37:21+00:00",
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/2967998",
			    "previousNames": [],
			    "registeredAddressInFull": "C/O FRANK CAREY, 10 EAST 39TH STREET STE 904, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "ALL IN ONE WHOLESALE RETAIL INC.",
			    "inactive": true,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "2087649",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "1996-11-26",
			    "dissolutionDate": "2000-12-27",
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=2087649&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Inactive   Dissolution By Proclamation / Annulment Of Authority",
			    "createdAt": "2013-09-03T10:33:36+00:00",
			    "updatedAt": "2013-09-03T10:33:36+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/2087649",
			    "previousNames": [],
			    "registeredAddressInFull": "C/O MOUSTFA MOUSTFA, 10 EAST 39TH STREET, STE 905, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "ALL OVER INC.",
			    "inactive": true,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "1348726",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "1989-05-01",
			    "dissolutionDate": "1996-06-26",
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=1348726&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Inactive   Dissolution By Proclamation / Annulment Of Authority",
			    "createdAt": "2013-09-02T04:12:55+00:00",
			    "updatedAt": "2013-09-02T04:12:55+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/1348726",
			    "previousNames": [],
			    "registeredAddressInFull": "ALL OVER INC., 10 EAST 39TH ST., NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "AMERICAN SUNERGY CORP.",
			    "inactive": true,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "395866",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "1976-04-01",
			    "dissolutionDate": "1982-09-29",
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=395866&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Inactive   Dissolution By Proclamation / Annulment Of Authority",
			    "createdAt": "2013-08-31T17:16:38+00:00",
			    "updatedAt": "2013-08-31T17:16:38+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/395866",
			    "previousNames": [],
			    "registeredAddressInFull": "AMERICAN SUNERGY CORP., 10 EAST 39TH STREET, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "ANTHONY WINTERS ARCHITECT, P.C.",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "2603464",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2001-02-07",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC PROFESSIONAL CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=2603464&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2013-08-14T08:59:22+00:00",
			    "updatedAt": "2013-08-14T08:59:22+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/2603464",
			    "previousNames": [],
			    "registeredAddressInFull": "10 EAST 40TH STREET, 39TH FLR, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "AOS REAL ESTATE NYC LLC",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": "2015-02-22T09:02:11+00:00"
			    },
			    "companyNumber": "4443440",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2013-08-09",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC LIMITED LIABILITY COMPANY",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=4443440&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2013-08-20T09:14:33+00:00",
			    "updatedAt": "2015-02-22T09:02:11+00:00",
			    "retrievedAt": "2015-02-22T09:02:11+00:00",
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/4443440",
			    "previousNames": [],
			    "registeredAddressInFull": "AOS REAL ESTATE NYC LLC, 10 EAST 39TH ST, SUITE 925, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "ARENA SECURITY & SERVICES CO. INC.",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "3300568",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2006-01-04",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=3300568&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2013-08-14T09:57:10+00:00",
			    "updatedAt": "2013-08-14T09:57:10+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/3300568",
			    "previousNames": [],
			    "registeredAddressInFull": "10 EAST 39TH STREET STE 915, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "BARTON MANAGEMENT, LLC",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "3852909",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2009-09-04",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC LIMITED LIABILITY COMPANY",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=3852909&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2013-08-14T12:36:36+00:00",
			    "updatedAt": "2013-08-14T12:36:36+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/3852909",
			    "previousNames": [],
			    "registeredAddressInFull": "10 EAST 39TH STREET STE 906, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "BEST CHOICE DOMESTICS, INC.",
			    "inactive": true,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "3115045",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2004-10-19",
			    "dissolutionDate": "2011-01-26",
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=3115045&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Inactive   Dissolution By Proclamation / Annulment Of Authority",
			    "createdAt": "2013-09-04T04:56:14+00:00",
			    "updatedAt": "2013-09-04T04:56:14+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/3115045",
			    "previousNames": [],
			    "registeredAddressInFull": "BEST CHOICE DOMESTICS, INC., SYLVIA BASDEO, 10 EAST 39TH STREET #904, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "BEST DOMESTIC EMPLOYMENT SERVICES, INC.",
			    "inactive": true,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "2695457",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2001-11-02",
			    "dissolutionDate": "2010-07-28",
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=2695457&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Inactive   Dissolution By Proclamation / Annulment Of Authority",
			    "createdAt": "2013-09-03T23:59:30+00:00",
			    "updatedAt": "2013-09-03T23:59:30+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/2695457",
			    "previousNames": [],
			    "registeredAddressInFull": "BEST DOMESTIC EMPLOYMENT SERVICES, INC., 10 EAST 39TH ST. #909, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "BEST DOMESTIC SERVICES AGENCY, INC.",
			    "inactive": true,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "1753036",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "1993-08-30",
			    "dissolutionDate": "1998-09-23",
			    "companyType": "FOREIGN BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=1753036&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": "branch of an out-of-jurisdiction company",
			    "currentStatus": "Inactive   Dissolution By Proclamation / Annulment Of Authority",
			    "createdAt": "2013-09-02T19:25:51+00:00",
			    "updatedAt": "2014-10-31T02:51:00+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/1753036",
			    "previousNames": [],
			    "registeredAddressInFull": "BEST DOMESTIC SERVICES AGENCY, INC., 10 EAST 39TH ST. SUITE 908, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "BEST EUROPEAN EMPLOYMENT SERVICES LLC",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "2248302",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "1998-04-10",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC LIMITED LIABILITY COMPANY",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=2248302&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2013-08-14T13:46:34+00:00",
			    "updatedAt": "2015-01-26T12:20:54+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/2248302",
			    "previousNames": [],
			    "registeredAddressInFull": "10 EAST 39TH STREET, SUITE 1105, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "BIG BANG INC.",
			    "inactive": true,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "1547122",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "1991-05-10",
			    "dissolutionDate": "1992-04-16",
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=1547122&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Inactive   Dissolution",
			    "createdAt": "2013-09-02T12:05:26+00:00",
			    "updatedAt": "2013-09-02T12:05:26+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/1547122",
			    "previousNames": [],
			    "registeredAddressInFull": "JOSEPH J. CARUSO, CARRAHER & CARUSO, 10 EAST 39TH STREET, SUITE 1009, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "BLUE CHIP FABRICS, INC.",
			    "inactive": true,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "699412",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "1981-05-13",
			    "dissolutionDate": "1991-06-26",
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=699412&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Inactive   Dissolution By Proclamation / Annulment Of Authority",
			    "createdAt": "2013-08-31T21:44:29+00:00",
			    "updatedAt": "2013-08-31T21:44:29+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/699412",
			    "previousNames": [],
			    "registeredAddressInFull": "ELLIOTT WEISBERGER, 10 EAST 39TH ST, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "BLUE TRADING, INC.",
			    "inactive": true,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "2397498",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "1999-07-12",
			    "dissolutionDate": "2003-06-25",
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=2397498&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Inactive   Dissolution By Proclamation / Annulment Of Authority",
			    "createdAt": "2013-09-03T19:44:38+00:00",
			    "updatedAt": "2013-09-03T19:44:38+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/2397498",
			    "previousNames": [],
			    "registeredAddressInFull": "BLUE TRADING, INC., 10 EAST 39TH STREET, STE. 524, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "BLUE WORLD ENTERPRISES, INC.",
			    "inactive": true,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "2471606",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2000-02-09",
			    "dissolutionDate": "2004-06-30",
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=2471606&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Inactive   Dissolution By Proclamation / Annulment Of Authority",
			    "createdAt": "2013-09-03T20:57:54+00:00",
			    "updatedAt": "2013-09-03T20:57:54+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/2471606",
			    "previousNames": [],
			    "registeredAddressInFull": "JONG SIL YUN, 10 EAST 39TH STREET SUITE 901, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "BUSINESS CONCEPTS BOOKEEPING AND COMPUTER TRAINING, INC.",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "2405517",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "1999-08-04",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC NOT-FOR-PROFIT CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=2405517&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2013-08-14T16:44:51+00:00",
			    "updatedAt": "2013-08-14T16:44:51+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/2405517",
			    "previousNames": [],
			    "registeredAddressInFull": "10 EAST 39TH STREET, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "BUSINESS INTERNATIONAL, INC.",
			    "inactive": true,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "2649886",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2001-06-13",
			    "dissolutionDate": "2010-07-28",
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=2649886&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Inactive   Dissolution By Proclamation / Annulment Of Authority",
			    "createdAt": "2013-09-03T23:30:08+00:00",
			    "updatedAt": "2013-09-03T23:30:08+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/2649886",
			    "previousNames": [],
			    "registeredAddressInFull": "BUSINESS INTERNATIONAL, INC., 10 EAST 39TH STREET, SUITE 517, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "C & S TITLE SERVICES, LLC",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "3332217",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2006-03-10",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC LIMITED LIABILITY COMPANY",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=3332217&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2013-08-15T02:36:23+00:00",
			    "updatedAt": "2013-08-15T02:36:23+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/3332217",
			    "previousNames": [],
			    "registeredAddressInFull": "10 EAST 39TH STREET-SUITE 1122, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "C HARRIS TEXTILE CORP.",
			    "inactive": true,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": null
			    },
			    "companyNumber": "1767913",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "1993-10-28",
			    "dissolutionDate": "1999-02-22",
			    "companyType": "DOMESTIC BUSINESS CORPORATION",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=1767913&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Inactive   Dissolution",
			    "createdAt": "2013-09-02T20:03:18+00:00",
			    "updatedAt": "2013-09-02T20:03:18+00:00",
			    "retrievedAt": null,
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/1767913",
			    "previousNames": [],
			    "registeredAddressInFull": "C HARRIS TEXTILE CORP., CHARLES HARRIS, 10 EAST 39TH ST SUITE 524, NEW YORK, NEW YORK, 10016"
			  },
			  {
			    "name": "CAPITAL PROPERTY PARTNERS LLC",
			    "inactive": false,
			    "source": {
			      "publisher": "New York Department of State",
			      "url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
			      "retrievedAt": "2015-02-21T08:22:29+00:00"
			    },
			    "companyNumber": "4713633",
			    "jurisdictionCode": "us_ny",
			    "incorporationDate": "2015-02-20",
			    "dissolutionDate": null,
			    "companyType": "DOMESTIC LIMITED LIABILITY COMPANY",
			    "registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=4713633&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
			    "branchStatus": null,
			    "currentStatus": "Active",
			    "createdAt": "2015-02-21T08:21:25+00:00",
			    "updatedAt": "2015-02-21T08:22:29+00:00",
			    "retrievedAt": "2015-02-21T08:22:29+00:00",
			    "opencorporatesUrl": "https://opencorporates.com/companies/us_ny/4713633",
			    "previousNames": [],
			    "registeredAddressInFull": "THE LIMITED LIABILITY COMPANY, 10 EAST 39TH ST., 12TH FL., NEW YORK, NEW YORK, 10018"
			  }
			]
			assert.deepEqual(res, expected)
			done()
		})
	})



	test('Search worldwide', function(done){
		this.timeout(5 * 1000);
		openCorporates.companies.search('Tullamarine Valve', function(err, res, meta){
			var expected = [
				{
					"name": "TULLAMARINE VALVE & FITTING PTY LTD",
					"inactive": false,
					"source": {
						"publisher": "Australian Securities & Investments Commission",
						"url": "https://connectonline.asic.gov.au/RegistrySearch/faces/landing/panelSearch.jspx?searchTab=search&searchType=OrgAndBusNm&searchText=006092128&_adf.ctrl-state=13cs8h575n_4",
						"retrievedAt": "2015-03-31T18:30:00+00:00"
					},
					"companyNumber": "006092128",
					"jurisdictionCode": "au",
					"incorporationDate": "1982-10-12",
					"dissolutionDate": null,
					"companyType": "Australian Proprietary Company, Limited by Shares",
					"registryUrl": "https://connectonline.asic.gov.au/RegistrySearch/faces/landing/panelSearch.jspx?searchTab=search&searchType=OrgAndBusNm&searchText=006092128&_adf.ctrl-state=13cs8h575n_4",
					"branchStatus": null,
					"currentStatus": "Registered",
					"createdAt": "2014-10-18T19:50:32+00:00",
					"updatedAt": "2015-04-15T20:50:11+00:00",
					"retrievedAt": "2015-03-31T18:30:00+00:00",
					"opencorporatesUrl": "https://opencorporates.com/companies/au/006092128",
					"previousNames": [
						{
							"companyName": "INDUSLAB PTY. LTD.",
							"conDate": "2010-02-04"
						}
					],
					"registeredAddressInFull": null
				}
			]
			assert.deepEqual(res, expected)
			done()
		})
	})

	test('Data', function(done){
		this.timeout(5 * 1000);
		openCorporates.companies.data('us_ca', 'C3268102', function(err, res, meta){
			var expected = null
			assert.deepEqual(res, expected)
			done()
		})
	})

	test('Search in jurisdiction', function(done){
		this.timeout(5 * 1000);
		openCorporates.companies.search('github', {countryCode: 'us'}, function(err, res, meta){
			var expected = [
				{
					"name": "EQUITYZEN GITHUB FUND LLC",
					"inactive": false,
					"source": {
						"publisher": "New York Department of State",
						"url": "https://data.ny.gov/Economic-Development/Active-Corporations-Beginning-1800/n9v6-gdp6",
						"retrievedAt": "2015-01-22T09:13:53+00:00"
					},
					"companyNumber": "4697838",
					"jurisdictionCode": "us_ny",
					"incorporationDate": "2015-01-21",
					"dissolutionDate": null,
					"companyType": "FOREIGN LIMITED LIABILITY COMPANY",
					"registryUrl": "http://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_INFORMATION?p_nameid=0&p_corpid=4697838&p_entity_name=dummy&p_name_type=%25&p_search_type=BEGINS&p_srch_results_page=0",
					"branchStatus": "branch of an out-of-jurisdiction company",
					"currentStatus": "Active",
					"createdAt": "2015-01-22T09:12:08+00:00",
					"updatedAt": "2015-01-22T09:13:56+00:00",
					"retrievedAt": "2015-01-22T09:13:53+00:00",
					"opencorporatesUrl": "https://opencorporates.com/companies/us_ny/4697838",
					"previousNames": [],
					"registeredAddressInFull": "EQUITYZEN GITHUB FUND LLC, ATTN: SHRIRAM BHASHYAM, 222 BROADWAY, 19TH FLOOR, NEW YORK, NEW YORK, 10038"
				},
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

