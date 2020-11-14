import {getItems, search} from "../libs/elasticsearch";

const param = {
  "age.range": {
    "lte": 15,
  }
}

export async function Moloje_trudosposobnogo_vozrasta() {
  let count = 0;

  let result = await search("people", param, 9999);
  count += result.hits.total && result.hits.total.value || 0;

  return count;
}
