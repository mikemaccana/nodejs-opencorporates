var superagent = require('superagent'),
	camelify = require('camelify');

var log = console.log.bind(log);

var API_VERSION = '0.3.2'

var ENDPOINT = 'https://api.opencorporates.com/v'+API_VERSION+'/'

var USER_AGENT = 'opencorporates.js (https://github.com/fvdm/nodejs-opencorporates)'

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
	apiToken = apiToken || null

	var openCorporatesGet = function( path, query, cb ) {
		if( typeof query === 'function' ) {
			cb = query
			query = {}
		}

		query = query || {}

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
			// cb( err, camelify(res.body) )
			cb( err, res.body )
		})
	}

	return {
		companies: {
			get: function( jurisdiction, id, cb ) {
				openCorporatesGet( 'companies/'+jurisdiction+'/'+id, cb)
			},
			search: function( searchTerm, query, cb ) {
				if ( typeof query === 'function' ) {
					var cb = query
					var query = {}
				}
				query.q = searchTerm // 'q' is OpenCorporates for search term
				openCorporatesGet( 'companies/search', query, cb)
			},
			filings: function( jurisdiction, id, query, cb ) {
				if ( typeof query === 'function' ) {
					var cb = query
					var query = {}
				}
				openCorporatesGet( 'companies/'+jurisdiction+'/'+id+'/filings', cb)
			},
			data: function( jurisdiction, id, query, cb ) {
				if ( typeof query === 'function' ) {
					var cb = query
					var query = {}
				}
				openCorporatesGet( 'companies/'+jurisdiction+'/'+id+'/data', query, cb)
			}
		},
		officers: {
			get: function( id, cb ) {
				openCorporatesGet( 'officers/'+id, cb)
			},
			search: function( searchTerm, query, cb ) {
				if ( typeof query === 'function' ) {
					var cb = query
					var query = {}
				}
				query.q = searchTerm // 'q' is OpenCorporates for search term
				openCorporatesGet( 'officers/search', query, cb)
			}
		},
		corporateGroupings: {
			get: function( name, cb ) {
				openCorporatesGet( 'corporate_groupings/'+name, cb)
			},
			search: function( searchTerm, query, cb ) {
				if ( typeof query === 'function' ) {
					var cb = query
					var query = {}
				}
				query.q = searchTerm // 'q' is OpenCorporates for search term
				openCorporatesGet( 'corporate_groupings/search', query, cb)
			}
		}
	}
}


