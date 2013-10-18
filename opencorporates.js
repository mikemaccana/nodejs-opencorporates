/*
Name:         opencorporates.js
Description:  Unofficial Node.js module for the OpenCorporates.com API
Author:       Franklin van de Meent <https://frankl.in/>
Source:       https://github.com/fvdm/nodejs-opencorporates
Feedback:     https://github.com/fvdm/nodejs-opencorporates/issues
License:      Public Domain (Unlicense) - see LICENSE file
*/

var http = require('http')
var querystring = require('querystring')
module.exports = { api_token: null }

// Companies
module.exports.companies = {}

// companies.get
module.exports.companies.get = function( juris, id, callback ) {
	talk( 'companies/'+ juris +'/'+ id, function( err, res ) {
		callback( err, (res && res.company) ? res.company : null )
	})
}

// companies.search
module.exports.companies.search = function( query, vars, callback ) {
	if( typeof vars === 'function' ) {
		var callback = vars
		var vars = {}
	}
	vars.q = query
	talk( 'companies/search', vars, function( err, res ) {
		callback( err, cleanObject( res.companies, 'company' ), setMeta( res ) )
	})
}

// companies.filings
module.exports.companies.filings = function( juris, id, vars, callback ) {
	if( typeof vars === 'function' ) {
		var callback = vars
		var vars = false
	}
	
	talk( 'companies/'+ juris +'/'+ id +'/filings', function( err, res ) {
		callback( err, cleanObject( res.filings, 'filing' ), setMeta( res ) )
	})
}

// companies.data
module.exports.companies.data = function( juris, id, vars, callback ) {
	if( typeof vars === 'function' ) {
		var callback = vars
		var vars = false
	}
	
	talk( 'companies/'+ juris +'/'+ id +'/data', vars, function( err, res ) {
		callback( err, cleanObject( res.data, 'datum' ), setMeta( res ) )
	})
}


// Officers
module.exports.officers = {}

// officers.get()
module.exports.officers.get = function( id, callback ) {
	talk( 'officers/'+ id, function( err, res ) {
		callback( err, (res && res.officer) ? res.officer : null )
	})
}

// officers.search
module.exports.officers.search = function( query, vars, callback ) {
	if( typeof vars === 'function' ) {
		var callback = vars
		var vars = {}
	}
	vars.q = query
	talk( 'officers/search', vars, function( err, res ) {
		callback( err, cleanObject( res.officers, 'officer' ), setMeta( res ) )
	})
}


// Corporate Groupings
module.exports.corporateGroupings = {}

// corporateGroupings.get()
module.exports.corporateGroupings.get = function( name, callback ) {
	talk( 'corporate_groupings/'+ name, function( err, res ) {
		var corp = {}
		corp = (res && res.corporate_grouping) ? res.corporate_grouping : null
		delete res
		
		if( corp && corp.curators !== undefined ) {
			corp.curators = cleanObject( corp.curators, 'user' )
		}
		
		if( corp && corp.memberships !== undefined ) {
			corp.memberships = cleanObject( corp.memberships, 'membership' )
		}
		
		callback( err, corp )
	})
}

// corporateGroupings.search()
module.exports.corporateGroupings.search = function( query, vars, callback ) {
	if( typeof vars === 'function' ) {
		var callback = vars
		var vars = {}
	}
	vars.q = query
	
	talk( 'corporate_groupings/search', vars, function( err, res ) {
		callback( err, cleanObject( res.corporate_groupings, 'corporate_grouping' ), setMeta( res ) )
	})
}


// Communication
function talk( path, fields, callback ) {
	if( typeof fields === 'function' ) {
		var callback = fields
		var fields = false
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
	delete fields
	
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
				err.error = getError( response.statusCode )
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

// Build meta data
function setMeta( res ) {
	var res = res || {}
	return {
		page: res.page || 0,
		per_page: res.per_page || 0,
		total_pages: res.total_pages || 0,
		total_count: res.total_count || 0
	}
}

// Clean up common object trees
function cleanObject( obj, item ) {
	var data = false
	if( typeof obj === 'object' ) {
		data = []
		for( var i=0; i<obj.length; i++ ) {
			data.push( obj[i][item] )
		}
	}
	return data || obj
}

// Return error
function getError( code ) {
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
