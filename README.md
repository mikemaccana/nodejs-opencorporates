# opencorporates

The [OpenCorporates](http://opencorporates.com) API.

## Features

This module includes all the normal features of the [OpenCorporates REST API](http://api.opencorporates.com/documentation/REST-API-introduction) and adds the following:

 - camelCase results, so you can use the keys in your own JavaScript without having to convert thems
 - Results and metadata are returned seperately
 - Clean arrays, eg, OpenCorporates would normally return `items = [{'item': {actual item object}}, {'item': {actual item object}}` whereas this module will return `items = [{actual item object}, {actual item object}]`. So `items.forEach(function(item){})` works properly.

If you're unsure of how anything works, check the unit tests, which have examples of all the API calls.



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
	  "results": {
	    "company": {
	      "name": "GITHUB, INC.",
	      "inactive": false,
	      "source": {
	        "publisher": "California Secretary of State",
	        "url": "http://kepler.sos.ca.gov/",
	        "retrievedAt": "2012-04-03T07:19:16+00:00"
	      },
	      "data": null,
	      "filings": [],
	      "officers": [],
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
	      "agentName": "BRANDEE MURPHY",
	      "agentAddress": "582 MARKET STREET STE 1700, SAN FRANCISCO, CA 94104",
	      "registeredAddressInFull": "548 4TH STREET, SAN FRANCISCO, CA 94107",
	      "registeredAddress": {
	        "locality": null,
	        "region": null,
	        "country": "United States",
	        "streetAddress": "548 4TH STREET, SAN FRANCISCO, CA 94107",
	        "postalCode": null
	      },
	      "corporateGroupings": [],
	      "industryCodes": [],
	      "financialSummary": null,
	      "homeCompany": null,
	      "controllingEntity": null
	    }
	  },
	  "apiVersion": "0.3.2"
	}
```

### openCorporates.companies.search(searchTerm, [filters], cb)

Search a company.

`filters` is optional, and can be:

 - `jurisdiction_code` e.g. `us_ca`, `nl`. Default is [none/worldwide]
 - `order` e.g. `score`. Default is alphabetic
 - `per_page` e.g. number of results, max. 100. Default is 30 results per page
 - `page` e.g. results page. Default is 1

```js
openCorporates.companies.search( 'github', function(err, res){
	console.log(JSON.stringify(res, null, 2))
})
```

This should return:

```js
{
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
      ...many more companies omitted....
    ],
    "page": 1,
    "perPage": 30,
    "totalPages": 1,
    "totalCount": 9
  },
  "apiVersion": "0.3.2"
}
```

### openCorporates.companies.filings(jurisdiction, id, [filters], callback)

Get available filings for a company.

`filters` is optional, and can be:

 - `per_page` e.g. number of results, max. 100. Default is 30 results per page
 - `page` e.g. results page. Default is 1

```js
corp.companies.filings( 'C3268102', console.log )
```

`filters` is optional, and can be:

 - `per_page` e.g. number of results, max. 100. Default is 30 results per page
 - `page` e.g. results page. Default is 1


### openCorporates.companies.data(jurisdiction, id, [filters], callback)

Get more available data for a company.

`filters` is optional, and can be:

 - `per_page` e.g. number of results, max. 100. Default is 30 results per page
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

- `jurisdiction_code` e.g. `us_ca`, `nl`. Default is [none/worldwide]
- `per_page` e.g. number of results, max. 100. Default is 30 results per page
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

- `per_page` e.g. number of results, max. 100. Default is 30 results per page
- `page` e.g. results page. Default is 1

## Credits

This module was forked from [Franklin van de Meent](http://frankl.in)'s original public domain OpenCorporates code.

The fork was created and is maintained by [Mike MacCana](http://mikemaccana.com)
