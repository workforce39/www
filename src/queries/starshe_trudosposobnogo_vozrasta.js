import {getItems, search} from "../libs/elasticsearch";

export async function Starshe_trudosposobnogo_vozrasta(year) {
  const param1 = {
    "floor.term": "женский",
    "age.range": {
      "gte": 55,
    },
    "update.match": year
  }

  const param2 = {
    "floor.term": "мужской",
    "age.range": {
      "gte": 60,
    },
    "update.match": year
  }

  let count = 0;

  let result = await search("people", param1, 9999);
  count += result.hits.total && result.hits.total.value || 0;

  result = await search("people", param2, 9999);
  count += result.hits.total && result.hits.total.value || 0;

  return count;
}
