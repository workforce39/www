const axios = require('axios');
import {elasticPass, elasticUrl, elasticUser} from '../network';

//const elasticUrl = 'http://31.31.203.177:9200'

export async function search(index, params, size, from = 0) {
  try {
    let result = (await getItems(index, params, size, from)).data;
    return result;
  } catch (e) {
    console.log("error:", e)
  }
}

export function getItems(index, filters, size = 10, from = 0) {
  const config = {
    from,
    size,
    params: filters,
  };

  const query = convertParamsElastic(config);

  return axios({
    method: 'post',
    url: `${elasticUrl}/${index}/_search`,
    data: query,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: elasticUser,
      password: elasticPass
    }
  });
  // .then(handleResponse)
  // .then(handleResponseData)
  // .catch(handleErrorNotAlert);
}

function convertParamsElastic(params, prefixField = '') {
  let query = {
    //min_score: 1,
    from: params.from || 0,
    size: params.size || 10,
    sort: params.params.sort || [{"_score": {"order": "desc"}}],
    query: {
      bool: {}
    }
  };

  let aggs;
  let must = Object.entries(params.params)
    .filter(([key, value]) => {
      if (key.includes('.sum')) {
        aggs = {
          [`${prefixField}${key.split('.sum')[0]}`]: {
            "filter": {
              "bool": {
                "must": Object.entries(value).filter(([k, v]) => k != "field").map(([k, v]) => {
                  return getMatch(k, v, '')
                })
              }
            },
            "aggs": {
              "workers_count": {
                "sum": {
                  "field": value["field"]
                }
              }
            }
          }
        }

        return false;
      }

      if (key != 'sort' && key != 'pagination' && value !== '' && value != null)
        return true
    })
    .map(([key, value]) => {
      return getMatch(key, value, prefixField);
    });

  if (must.length > 0) {
    query.query.bool.must = must;
  }

  if (aggs) {
    query.aggs = aggs
  }

  if (params.params.pagination && params.params.pagination.search_after_timestamp && params.params.pagination.search_after_id) {
    query.search_after = [params.params.pagination.search_after_score, params.params.pagination.search_after_timestamp, params.params.pagination.search_after_id];
  }

  return query;
}

function getMatch(key, value, prefixField) {
  if (key.includes('.match_prefix')) {
    key = `${prefixField}${key.split('.match_prefix')[0]}`
    let match_phrase_prefix = {}
    match_phrase_prefix[typeof value === 'number' ? `${key}.keyword` : key] = {
      query: value,
      max_expansions: 10000,
      boost: 1,
    }

    return {match_phrase_prefix};
  }

  if (key.includes('.match')) {
    return {"match": {[`${prefixField}${key.split('.match')[0]}`]: value}}
  }

  if (key.includes('.terms')) {
    return {"terms": {[`${prefixField}${key.split('.term')[0]}`]: Array.isArray(value) ? value : [value]}}
  }

  if (key.includes('.term')) {
    return {"term": {[`${prefixField}${key.split('.term')[0]}`]: value}}
  }

  if (key.includes('.wildcard')) {
    return {"wildcard": {[`${prefixField}${key.split('.wildcard')[0]}`]: value}}
  }

  if (key.includes('.regexp')) {
    return {"regexp": {[`${prefixField}${key.split('.regexp')[0]}`]: value.toLowerCase()}}
  }

  if (key.includes('.range')) {
    return {"range": {[`${prefixField}${key.split('.range')[0]}`]: value}}
  }

  if (key.includes('.exists')) {
    return {"exists": {"field": `${prefixField}${key.split('.exists')[0]}`}}
  }

  if (key.includes('.array')) {
    return {
      bool: {
        must: value.map(el => {
          return Object.entries(el).map(([k, v]) => getMatch(k, v, ''))
        })
      }
    }
  }
}

// (async() => {
//   let result = await getItems('country', {});
//   console.log("[RESULT]", result.data.hits);
// })();
