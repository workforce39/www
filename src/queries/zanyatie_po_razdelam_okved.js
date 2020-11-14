import {getItems, search} from "../libs/elasticsearch";

const param1 = {
  "floor.term": "женский",
  "age.range": {
    "gte": 16,
    "lte": 54
  }
}

const param2 = {
  "floor.term": "мужской",
  "age.range": {
    "gte": 16,
    "lte": 59
  }
}

export async function Trudosposobnoe_naselenie_v_trudosposobnom_vozraste() {
  let count = 0;

  let result = await search("people", param1, 9999);
  count += result.total && result.total.value || 0;

  result = await search("people", param2, 9999);
  count += result.total && result.total.value || 0;

  return count;
}