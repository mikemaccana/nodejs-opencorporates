var http = require('http')
var querystring = require('querystring');

var openCorpRequest = function( path, fields, callback ) {
	if( typeof fields === 'function' ) {
		callback = fields
		fields = false
	}

	// prevent multiple callbacks
	var complete = false
	function doCallback( err, res ) {
		if( !complete ) {
			complete = true
			callback( err, res )
		}
	}

	// build request
	if( typeof module.exports.api_token === 'string') {
		fields = fields || {}
		fields.api_token = module.exports.api_token
	}

	var query = fields ? '?'+ querystring.stringify( fields ) : ''

	var options = {
		host: 'api.opencorporates.com',
		path: '/v0.2/'+ path + query,
		headers: {
			'User-Agent': 'opencorporates.js (https://github.com/fvdm/nodejs-opencorporates)'
		}
	}

	var request = http.request( options )

	// request failed
	request.on( 'error', function( error ) {
		var err = new Error('request failed')
		err.error = error
		doCallback( err )
	})

	// response
	request.on( 'response', function( response ) {
		var data = ''

		response.on( 'data', function( ch ) {
			data += ch.toString('utf8')
		})

		response.on( 'close', function() {
			doCallback( new Error('disconnected') )
		})

		response.on( 'end', function() {
			if( response.statusCode !== 200 ) {
				var err = new Error('API error')
				err.code = response.statusCode
				err.error = getOpenCorporatesError( response.statusCode )
				doCallback( err )
			} else {
				data = JSON.parse( data )
				if( typeof data.results === 'object' ) {
					doCallback( null, data.results )
				} else {
					doCallback( new Error('invalid response') )
				}
			}
		})
	})

	// do it
	request.end()
}

module.exports = function(apiToken){
	apiToken = apiToken || null

	return {
		companies: {
			get: function( jurisdiction, id, callback ) {
				openCorpRequest( 'companies/'+ jurisdiction +'/'+ id, function( err, res ) {
					callback( err, (res && res.company) ? res.company : null )
				})
			},
			search: function( query, vars, callback ) {
				if ( typeof vars === 'function' ) {
					callback = vars
					vars = {}
				}
				vars.q = query
				openCorpRequest( 'companies/search', vars, function( err, res ) {
					callback( err, cleanResponse( res.companies, 'company' ), buildMetaData( res ) )
				})
			},
			filings: function( jurisdiction, id, vars, callback ) {
				if ( typeof vars === 'function' ) {
					callback = vars
					vars = false
				}

				openCorpRequest( 'companies/'+ jurisdiction +'/'+ id +'/filings', function( err, res ) {
					callback( err, cleanResponse( res.filings, 'filing' ), buildMetaData( res ) )
				})
			},
			data: function( jurisdiction, id, vars, callback ) {
				if ( typeof vars === 'function' ) {
					callback = vars
					vars = false
				}

				openCorpRequest( 'companies/'+ jurisdiction +'/'+ id +'/data', vars, function( err, res ) {
					callback( err, cleanResponse( res.data, 'datum' ), buildMetaData( res ) )
				})
			}
		},
		officers: {
			get: function( id, callback ) {
				openCorpRequest( 'officers/'+ id, function( err, res ) {
					callback( err, (res && res.officer) ? res.officer : null )
				})
			},
			search: function( query, vars, callback ) {
				if( typeof vars === 'function' ) {
					callback = vars
					vars = {}
				}
				vars.q = query
				openCorpRequest( 'officers/search', vars, function( err, res ) {
					callback( err, cleanResponse( res.officers, 'officer' ), buildMetaData( res ) )
				})
			}
		},
		corporateGroupings: {
			get: function( name, callback ) {
				openCorpRequest( 'corporate_groupings/'+ name, function( err, res ) {
					var corp = {}
					corp = (res && res.corporate_grouping) ? res.corporate_grouping : null

					if( corp && corp.curators !== undefined ) {
						corp.curators = cleanResponse( corp.curators, 'user' )
					}

					if( corp && corp.memberships !== undefined ) {
						corp.memberships = cleanResponse( corp.memberships, 'membership' )
					}

					callback( err, corp )
				})
			},
			search: function( query, vars, callback ) {
				if( typeof vars === 'function' ) {
					callback = vars
					vars = {}
				}
				vars.q = query

				openCorpRequest( 'corporate_groupings/search', vars, function( err, res ) {
					callback( err, cleanResponse( res.corporate_groupings, 'corporate_grouping' ), buildMetaData( res ) )
				})
			}
		}
	}
}

var buildMetaData = function( res ) {
	res = res || {}
	return {
		page: res.page || 0,
		per_page: res.per_page || 0,
		total_pages: res.total_pages || 0,
		total_count: res.total_count || 0
	}
}

var cleanResponse = function( obj, item ) {
	var data = false
	if( typeof obj === 'object' ) {
		data = []
		for( var i=0; i<obj.length; i++ ) {
			data.push( obj[i][item] )
		}
	}
	return data || obj
}

var getOpenCorporatesError = function( code ) {
	var errors = {
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

	return errors[ code ] || null
}

