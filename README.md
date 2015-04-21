# opencorporates

The [OpenCorporates](http://opencorporates.com) API.

## Features

This module includes all the normal features of the [OpenCorporates REST API](http://api.opencorporates.com/documentation/REST-API-introduction) and adds the following:

 - camelCase results, so you can use the keys in your own JavaScript without having to convert thems
 - Results and metadata are returned seperately
 - Clean arrays, eg, OpenCorporates would normally return `items = [{'item': {actual item object}}, {'item': {actual item object}}` whereas this module will return `items = [{actual item object}, {actual item object}]`. So `items.forEach(function(item){})` works properly.

If you're unsure of how anything works, check the unit tests, which have examples of all the API calls.

## Changelog

### Version 2.2 changes

 - Default OpenCorporates API version is now 4.0

### Version 2 changes

If you're upgrading from version 1, the new module has the following changes:

 - The module now exports a single function which takes the apiKey as an argument.
 - Results, and all function parameters are now in camelCase.

## Installation

Stable: `npm install opencorporates`

Head: `npm install fvdm/nodejs-opencorporates`

## Usage

```js
var openCorporates = require('opencorporates')('YOUR_API_TOKEN')
```

If you do not have an API key, you may omit it, but will have a lower rate limit:

```js
var openCorporates = require('opencorporates')()
```

API results are converted to camelCase so you can use the keys directly in your app.

## openCorporates.companies

### openCorporates.companies.get(jurisdictionCode, companyID, cb)

Get a single company. Example:

```js
openCorporates.companies.get('us_ca', 'C3268102', function(err, res){
	console.log(JSON.stringify(res, null, 2))
})
```

```js
	{
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
```

### openCorporates.companies.search(searchTerm, [filters], cb)

Search a company.

`filters` is optional, and can be:

 - `jurisdictionCode` e.g. `us_ca`, `nl` see the [full list of jurisdiction codes](https://opencorporates.com/companies/jurisdictions). Default is [none/worldwide]
 - `order` e.g. `score`. Default is alphabetic
 - `perPage` e.g. number of results, max. 100. Default is 30 results per page
 - `page` e.g. results page. Default is 1

```js
openCorporates.companies.search( 'github', function(err, res){
	console.log(JSON.stringify(res, null, 2))
})
```

This will return:

```js
	[

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
	  ...many more companies omitted....
	]
}
```

### openCorporates.companies.filings(jurisdiction, id, [filters], callback)

Get available filings for a company.

`filters` is optional, and can be:

 - `perPage` e.g. number of results, max. 100. Default is 30 results per page
 - `page` e.g. results page. Default is 1

```js
openCorporates.companies.filings( 'C3268102', console.log )
```

`filters` is optional, and can be:

 - `perPage` e.g. number of results, max. 100. Default is 30 results per page
 - `page` e.g. results page. Default is 1


### openCorporates.companies.data(jurisdiction, id, [filters], callback)

Get more available data for a company.

`filters` is optional, and can be:

 - `perPage` e.g. number of results, max. 100. Default is 30 results per page
 - `page` e.g. results page. Default is 1

```js
openCorporates.companies.filings( 'C3268102', console.log )
```

## openCorporates.officers

### openCorporates.officers.get( id, callback)

Get an officer by ID.

```js
openCorporates.officers.get( '21200360', console.log )
```


### openCorporates.officers.search( query, [filters], callback )

Search officers.

- `jurisdictionCode` e.g. `us_ca`, `nl`. Default is [none/worldwide]
- `perPage` e.g. number of results, max. 100. Default is 30 results per page
- `page` e.g. results page. Default is 1


```js
openCorporates.officers.search( 'bart simpson', callback )
```

## openCorporates.corporateGroupings

From [OpenCorporates Corporate Grouping description:](http://blog.opencorporates.com/2011/06/01/introducing-corporategroupings-where-fuzzy-concepts-meet-legal-entities/)


> "A CorporateGrouping is a user-curated collection of companies that belong to some human-understand concept of a corporation (which maps to the Wikipedia article about that corporation)."


### openCorporates.corporateGroupings.get ( name, callback )

Get extended data about a corporate grouping, by its name.

```js
openCorporates.corporateGroupings.get( 'bp', console.log )
```


### openCorporates.corporateGroupings.search ( query, [filters], callback )

```js
openCorporates.corporateGroupings.search( 'bp', console.log )
```

- `perPage` e.g. number of results, max. 100. Default is 30 results per page
- `page` e.g. results page. Default is 1

## Credits

This module was forked from [Franklin van de Meent](http://frankl.in)'s original public domain OpenCorporates code.

The fork was created and is maintained by [Mike MacCana](http://mikemaccana.com)
