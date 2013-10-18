nodejs-opencorporates
=====================

Unofficial Node.js module for the OpenCorporates API.


Installation
------------

Stable: `npm install opencorporates`

Source: `npm install git+https://github.com/fvdm/nodejs-opencorporates`


Configuration
-------------

These settings affect all method calls.

	api_token   Your API key if you have one.

```js
corp.api_token = 'abc123'
```


Usage
-----

```js
var corp = require('opencorporates')

// Optionally set api_token to increase rate limit
corp.api_token = 'abc123'

corp.companies.search( 'github', console.log )
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
    source: { publisher: 'California Secretary of State',        url: 'http://kepler.sos.ca.gov/',        retrieved_at: '2012-04-03T07:19:16+01:00' } } ]
```


Callback
--------

The last parameter of each method must be the *callback function*. This receives two or three parameters, depending on the kind of data. 'Get' methods (i.e. companies.get) give the callback two parameters, 'list' methods give an extra parameter with *meta* data such as total items.

```js
// Expect only one result
corp.companies.get( 'us_ca', 'C3268102', function( error, data ) {
	if( error ) {
		console.log( error )
	} else {
		console.log( data.name +' incorporated on '+ data.incorporation_date )
	}
})

// Expect list array with objects
corp.companies.search( 'github', function( error, data, meta ) {
	if( error ) {
		console.log( error )
	} else if( meta.total_count >= 1 ) {
		console.log( 'Total results: '+ meta.total_count )
		for( var i=0; i<data; i++ ) {
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
Unlicense
---------

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
