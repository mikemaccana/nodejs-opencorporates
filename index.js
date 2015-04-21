var superagent = require('superagent'),
	changeCase = require('change-case'),
	camelify = require('camelify-recursive');

var log = console.log.bind(log);

var API_VERSION = '0.4'

var ENDPOINT = 'https://api.opencorporates.com/v'+API_VERSION+'/'

var USER_AGENT = 'opencorporates.js (https://github.com/mikemaccana/opencorporates)'

var OPEN_CORPORATES_ERRORS = {
	304: 'Not Modified: There was no new data to return.',
	400: 'Bad Request: The request was invalid. An accompanying error message will explain why.',
	401: 'Unauthorized: Authentication credentials were incorrect.',
	403: 'Forbidden: The request is understood, but it has been refused. This is the status code will be returned during rate limiting.',
	404: 'Not Found: The URI requested is invalid or the resource requested, such as a company, does not exists.',
	406: 'Not Acceptable: Returned by the Search API when an invalid format is specified in the request.',
	500: 'Internal Server Error: Something is broken. Please contact us if the situation continues and your request is valid.',
	502: 'Bad Gateway: OpenCorporates is down or being upgraded.',
	503: 'Service Unavailable: The OpenCorporates servers are up, but overloaded with requests. This is also the response code returned if a company\'s details have been temporarily redacted.'
}

module.exports = function(apiToken){
	apiToken = apiToken || null;

	// OK so OpenCorporates API currently puts its interesting stuff as
	// eg, results.bananas = [{'banana': {actual banana object}}, {'banana': {actual banana object}}]
	// This is weird, and makes data.bananas.forEach(function(banana){...}) not work.
	// Instead, you'd use data.bananas.forEach(function(banana){ ...}) then work with 'banana.banana' which is just weird.
	// Let's clean it up so: we just return [banana, banana]
	var getCleanArray = function(categoryResults, itemName ) {
		var cleanArray = [];
		if ( Array.isArray(categoryResults) ) {
			categoryResults.forEach(function(item, index){
				cleanArray.push( categoryResults[index][itemName] )
			})
		}
		// log('going to return',cleanArray.length > 0 ? cleanArray : null )
		return cleanArray.length > 0 ? cleanArray : null
	}

	function buildMetaData( res ) {
		res = res || {}
		return {
			page: res.page || 0,
			perPage: res.per_page || 0,
			totalPages: res.total_pages || 0,
			totalCount: res.total_count || 0
		}
	}

	var openCorporatesGet = function(path, rawQuery, cb ) {
		if( typeof rawQuery === 'function' ) {
			cb = rawQuery
			rawQuery = {}
		}


		// Convert JS style into OC API
		var query = rawQuery || {}
		Object.keys(rawQuery).forEach(function(keyName){
			var value = rawQuery[keyName]
			// Convert arrays to pipe separated strings
			if ( Array.isArray(value) ) {
				value = value.join('|')
			}
			// Convert JS style camelCase query options to snake_case
			query[changeCase.snakeCase(keyName)] = value
		})

		if ( apiToken ) {
			query.api_token = apiToken;
		}

		superagent
		.get(ENDPOINT+path)
		.query(query)
		.set('User-Agent', USER_AGENT)
		.end(function(err, res) {
			// OpenCorporates has some extra info with their errors
			err = OPEN_CORPORATES_ERRORS[res.status] || err
			cb( err, camelify(res.body) )
		})
	}

	return {
		companies: {
			get: function(jurisdiction, id, cb ) {
				openCorporatesGet( 'companies/'+jurisdiction+'/'+id, function( err, res ) {
					cb(err, res.results.company || null )
				})
			},
			search: function(searchTerm, options, cb ) {
				if ( typeof options === 'function' ) {
					cb = options
					options = {}
				}
				options.q = searchTerm // 'q' is OpenCorporates for search term
				openCorporatesGet( 'companies/search', options, function( err, res ) {
					if ( err ) {
						cb(err)
						return
					}
					cb( err, getCleanArray(res.results.companies, 'company'), buildMetaData(res) )
				})
			},
			filings: function(jurisdiction, id, options, cb ) {
				if ( typeof options === 'function' ) {
					cb = options
					options = {}
				}
				openCorporatesGet( 'companies/'+jurisdiction+'/'+id+'/filings', function( err, res ) {
					if ( err ) {
						cb(err)
						return
					}
					cb( err, getCleanArray(res.results.filings, 'filing'), buildMetaData(res) )
				})
			},
			data: function(jurisdiction, id, options, cb ) {
				if ( typeof options === 'function' ) {
					cb = options
					options = {}
				}
				openCorporatesGet( 'companies/'+jurisdiction+'/'+id+'/data', options, function( err, res ) {
					if ( err ) {
						cb(err)
						return
					}
					cb( err, getCleanArray(res.results.data, 'datum'), buildMetaData(res) )
				})
			}
		},
		officers: {
			get: function(id, cb ) {
				openCorporatesGet( 'officers/'+id, function( err, res ) {
					cb( err, res.officer || null )
				})
			},
			search: function(searchTerm, options, cb ) {
				if ( typeof options === 'function' ) {
					cb = options
					options = {}
				}
				options.q = searchTerm // 'q' is OpenCorporates for search term

				openCorporatesGet( 'officers/search', options, function( err, res ) {
					if ( err ) {
						cb(err)
						return
					}
					cb( err, getCleanArray(res.results.officers, 'officer'), buildMetaData(res) )
				})
			}
		},
		corporateGroupings: {
			get: function(name, cb ) {
				openCorporatesGet( 'corporate_groupings/'+name, function( err, res ) {

					// log('XXXX', err, res)
					var corp = res.results.corporateGrouping;

					if ( corp && corp.curators ) {
						corp.curators = getCleanArray( corp.curators, 'user' )
					}

					if ( corp && corp.memberships ) {
						corp.memberships = getCleanArray( corp.memberships, 'membership' )
					}
					if ( err ) {
						cb(err)
						return
					}

					cb( err, corp )
				})
			},
			search: function(searchTerm, options, cb ) {
				if ( typeof options === 'function' ) {
					cb = options
					options = {}
				}
				options.q = searchTerm // 'q' is OpenCorporates for search term
				openCorporatesGet( 'corporate_groupings/search', options, function( err, res ) {
					if ( err ) {
						cb(err)
						return
					}
					cb( err, getCleanArray(res.results.corporateGroupings, 'corporateGrouping' ), buildMetaData( res ) )
				})
			}
		}
	}
}


