var superagent = require('superagent'),
  changeCase = require('change-case'),
  camelify = require('camelify-recursive');

var log = console.log.bind(log);

var API_VERSION = '0.4'

var ENDPOINT = `https://api.opencorporates.com/v${API_VERSION}/`

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

module.exports = function (apiToken) {
  apiToken = apiToken || null;

  // OK so OpenCorporates API currently puts its interesting stuff as
  // eg, results.bananas = [{'banana': {actual banana object}}, {'banana': {actual banana object}}]
  // This is weird, and makes data.bananas.forEach(function(banana){...}) not work.
  // Instead, you'd use data.bananas.forEach(function(banana){ ...}) then work with 'banana.banana' which is just weird.
  // Let's clean it up so: we just return banana, banana]
  var getCleanArray = function (categoryResults, itemName) {
    var cleanArray = [];
    if (Array.isArray(categoryResults)) {
      categoryResults.forEach(function (item, index) {
        cleanArray.push(categoryResults[index][itemName])
      })
    }
    // log('going to return',cleanArray.length > 0 ? cleanArray : null )
    return cleanArray.length > 0 ? cleanArray : null
  }

  var formatQuery = function (rawQuery) {
    // Convert JS style into OC API
    var query = {}
    Object.keys(rawQuery).forEach(function (keyName) {
      var value = rawQuery[keyName]
      // Convert arrays to pipe separated strings
      if (Array.isArray(value)) {
        value = value.join('|')
      }
      // Convert JS style camelCase query options to snake_case
      query[changeCase.snakeCase(keyName)] = value
    })

    if (apiToken) {
      query.api_token = apiToken;
    }

    return query
  }

  var openCorporatesGet = async function (path, rawQuery) {

    rawQuery = rawQuery || {}

    var query = formatQuery(rawQuery)

    var response = await superagent
      .get(ENDPOINT + path)
      .query(query)
      .set('User-Agent', USER_AGENT);

    // log('response', response)

    if (OPEN_CORPORATES_ERRORS[response.status]) {
      throw new Error(`OpenCorporates error: ${OPEN_CORPORATES_ERRORS[response.status]}`)
    }

    return camelify(response.body)
  }

  return {
    companies: {
      get: async function (jurisdiction, id) {
        var response = await openCorporatesGet(`companies/${jurisdiction}/${id}`)
        return response.results.company
      },
      search: async function (searchTerm, options) {
        options = options || {};
        options.q = searchTerm // 'q' is OpenCorporates-speak for search query
        var response = await openCorporatesGet(`companies/search`, options)
        return getCleanArray(response.results.companies, 'company')
      },
      filings: async function (jurisdiction, id, options) {
        var response = await openCorporatesGet(`companies/${jurisdiction}/${id}/filings`, options)
        return getCleanArray(response.results.filings, 'filing')
      },
      data: async function (jurisdiction, id, options) {
        var response = await openCorporatesGet(`companies/${jurisdiction}/${id}/data`, options)
        return getCleanArray(response.results.data, 'datum')
      }
    },
    officers: {
      get: async function (id) {
        var response = await openCorporatesGet(`officers/${id}`)
        return response.officer
      },
      search: async function (searchTerm, options) {
        options.q = searchTerm // 'q' is OpenCorporates-speak for search query
        var response = await openCorporatesGet(`officers/search`, options)
        return getCleanArray(response.results.officers, 'officer')
      }
    },
    corporateGroupings: {

      get: async function (name) {
        var response = await openCorporatesGet(`corporate_groupings/${name}`)

        var corp = response.results.corporateGrouping;
        if (corp && corp.curators) {
          corp.curators = getCleanArray(corp.curators, 'user')
        }

        if (corp && corp.memberships) {
          corp.memberships = getCleanArray(corp.memberships, 'membership')
        }

        return corp

      },
      search: async function (searchTerm, options) {
        options.q = searchTerm; // 'q' is OpenCorporates-speak for search query
        var response = await openCorporatesGet(`corporate_groupings/search`, options)
        return getCleanArray(response.results.corporateGroupings, 'corporateGrouping')
      }
    }
  }
}


