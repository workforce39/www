import {getItems, search} from "../libs/elasticsearch";

export async function Inostrannie_trudovie_migranty(year) {
  const param = {
    "citizenship.term": "иное",
    "update.match": year
  }

  let count = 0;

  let result = await search("people", param, 9999);
  count += result.hits.total && result.hits.total.value || 0;

  return count;
}
