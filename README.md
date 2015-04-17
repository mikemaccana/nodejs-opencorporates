# opencorporates

A node.js module for the OpenCorporates API.

[API documentation](http://api.opencorporates.com/documentation/REST-API-introduction)

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

openCorporates.companies.search( 'github', console.log )
```

This should return an array with objects, like this:

```js
[ { name: 'GITHUB, INC.',
	company_number: 'C3268102',
	jurisdiction_code: 'us_ca',
	incorporation_date: '2009-12-31',
	dissolution_date: null,
	company_type: 'Domestic Stock',
	registry_url: 'https://businessfilings.sos.ca.gov/frmDetail.asp?CorpID=03268102',
	branch_status: null,
	inactive: false,
	current_status: 'Active',
	created_at: '2011-09-17T15:33:31+01:00',
	updated_at: '2013-04-30T09:24:30+01:00',
	retrieved_at: '2012-04-03T07:19:16+01:00',
	opencorporates_url: 'http://opencorporates.com/companies/us_ca/C3268102',
	previous_names: null,
	source: { publisher: 'California Secretary of State',
		url: 'http://kepler.sos.ca.gov/',
		retrieved_at: '2012-04-03T07:19:16+01:00' } } ]
```


Callback
--------

The last parameter of each method must be the *callback function*. This receives two or three parameters, depending on the kind of data. 'Get' methods (i.e. companies.get) give the callback two parameters, 'list' methods give an extra parameter with *meta* data such as total items.

#### Expect only one result

```js
openCorporates.companies.get( 'us_ca', 'C3268102', function( error, data ) {
	if( error ) {
		console.log( error )
	} else {
		console.log( data.name +' incorporated on '+ data.incorporation_date )
	}
})
```

#### Expect list array

```js
openCorporates.companies.search( 'github', function( error, data, meta ) {
	if( error ) {
		console.log( error )
	} else if( meta.total_count >= 1 ) {
		console.log( 'Total results: '+ meta.total_count )
		for ( var i=0; i < data; i++; ) {
			console.log( data[i].name )
		}
	} else {
		console.log( 'no results' )
	}
})
```

### meta data

The meta parameter is an object with numeric information about the `data` array.

```js
{ page: 1,
  per_page: 30,
  total_pages: 2,
  total_count: 42 }
```


Companies
---------

### companies.get ( jurisdiction, id, callback )

Get one specific company.

	jurisdiction   required   jurisdiction code, i.e. `us_ca` or `nl`
	id             required   company ID
	callback       required   function( error, data )


```js
corp.companies.get( 'us_ca', 'C3268102', console.log )
```


### companies.search ( query, [vars], callback )

Find companies matching `query` worldwide or filtered.

	query      required   keyword(s)
	vars       option     filters, see below
	callback   required   function( error, data, meta )

```js
corp.companies.search( 'github', {order: 'score'}, console.log )
```

#### vars

	filter name         description                   default

	jurisdiction_code   `us_ca`, `nl`                 [none/worldwide]
	order               `score`                       alphabetic
	per_page            number of results, max. 100   30
	page                results page                  1


### companies.filings ( jurisdiction, id, [vars], callback )

Get available filings for a company.

	jurisdiction   required   `us_ca`, `nl`
	id             required   company ID
	vars           option     filters
	callback       required   function( error, data, meta )

```js
corp.companies.filings( 'C3268102', console.log )
```

#### vars

	filter name         description                   default

	per_page            number of results, max. 100   30
	page                results page                  1


### companies.data ( jurisdiction, id, [vars], callback )

Get more available data for a company.

	jurisdiction   required   `us_ca`, `nl`
	id             required   company ID
	vars           option     filters
	callback       required   function( error, data, meta )

```js
corp.companies.filings( 'C3268102', console.log )
```

#### vars

	filter name         description                   default

	per_page            number of results, max. 100   30
	page                results page                  1


Officers
--------

### officers.get ( id, callback )

Get an officer by ID.

```js
corp.officers.get( '21200360', console.log )
```


### officers.search ( query, [vars], callback )

Search officers.

```js
corp.officers.search( 'bart simpson', callback )
```

#### vars

	filter name         description                   default

	jurisdiction_code   `us_ca`, `nl`                 [none/worldwide]
	per_page            number of results, max. 100   30
	page                results page                  1


Corporate groupings
-------------------

"A CorporateGrouping is a user-curated collection of companies that belong to some human-understand concept of a corporation (which maps to the Wikipedia article about that corporation)."

<http://blog.opencorporates.com/2011/06/01/introducing-corporategroupings-where-fuzzy-concepts-meet-legal-entities/>


### corporateGroupings.get ( name, callback )

Get extended data about a corporate grouping, by its name.

```js
corp.corporateGroupings.get( 'bp', console.log )
```

#### example (trimmed)

```js
{ name: 'bp',
  wikipedia_id: 'BP',
  companies_count: 8,
  created_at: '2011-05-30T17:33:45+01:00',
  updated_at: '2013-10-14T05:46:20+01:00',
  curators:
	[ { name: 'Chris Taggart',
		opencorporates_url: 'http://opencorporates.com/users/1' },
	{ name: 'inanimatt',
		opencorporates_url: 'http://opencorporates.com/users/1374' } ],
  memberships:
	[ { source:
		  { publisher: 'Chris Taggart',
		  retrieved_at: '2011-06-01T14:17:27+01:00',
		  url: 'http://opencorporates.com/users/1',
		  source_type: 'user' },
		company:
		  { name: 'BP P.L.C.',
		  jurisdiction_code: 'gb',
		  company_number: '00102498',
		  opencorporates_url: 'http://opencorporates.com/companies/gb/00102498',
		  inactive: false } } ] }
```


### corporateGroupings.search ( query, [vars], callback )

```js
corp.corporateGroupings.search( 'bp', console.log )
```

#### vars

	filter name         description                   default

	per_page            number of results, max. 100   30
	page                results page                  1

#### example

```
[ { name: 'bp',
	created_at: '2011-05-30T17:33:45+01:00',
	updated_at: '2013-10-14T05:46:20+01:00',
	opencorporates_url: 'http://opencorporates.com/corporate_groupings/bp',
	wikipedia_id: 'BP' } ]
```





