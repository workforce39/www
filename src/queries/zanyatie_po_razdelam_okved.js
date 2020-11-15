import {search} from "../libs/elasticsearch";

const aggs = {
  workers_count: {
    sum: {
      field: "employees"
    }
  }
}


export async function Zanyatie_po_razdelam_okved(n, year) {
  let count = 0;

  const params = {
    "workers.sum": {
      "okved.match": n,
      "update.match": year,
      "field": "employees"
    }
  }

  let result = await search("org", params, 9999);

  count += result.aggregations && result.aggregations.workers.workers_count.value || 0;

  return count;
}
