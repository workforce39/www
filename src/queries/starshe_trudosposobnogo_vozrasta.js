import {getItems, search} from "../libs/elasticsearch";

const param1 = {
  "floor.term": "женский",
  "age.range": {
    "gte": 55,
  }
}

const param2 = {
  "floor.term": "мужской",
  "age.range": {
    "gte": 60,
  }
}

export async function Starshe_trudosposobnogo_vozrasta() {
  let count = 0;

  let result = await search("people", param1, 9999);
  count += result.total && result.total.value || 0;

  result = await search("people", param2, 9999);
  count += result.total && result.total.value || 0;

  return count;
}
