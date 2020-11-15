import {getItems, search} from "../libs/elasticsearch";

export async function Trudosposobnoe_naselenie_v_trudosposobnom_vozraste(year) {
  const param1 = {
    "floor.term": "женский",
    "age.range": {
      "gte": 16,
      "lte": 54
    },
    "update.match": year
  }

  const param2 = {
    "floor.term": "мужской",
    "age.range": {
      "gte": 16,
      "lte": 59
    },
    "update.match": year
  }

  let count = 0;

  let result = await search("people", param1, 9999);
  count += result.hitstotal && result.hits.total.value || 0;

  result = await search("people", param2, 9999);
  count += result.hits.total && result.hits.total.value || 0;

  return count;
}
