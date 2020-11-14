import {getItems, search} from "../libs/elasticsearch";

const param = {
  "citizenship.term": "иное",
}

export async function Inostrannie_trudovie_migranty() {
  let count = 0;

  let result = await search("people", param, 9999);
  count += result.hits.total && result.hits.total.value || 0;

  return count;
}
