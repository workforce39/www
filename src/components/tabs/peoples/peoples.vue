<template>
  <div class="container">
    <b-table
        :data="data"
        :loading="loading"

        paginated
        backend-pagination
        :total="total"
        :per-page="size"
        @page-change="onPageChange"
        :current-page.sync="currentPage"
        aria-next-label="Следующая страница"
        aria-previous-label="Предыдущая страница"
        aria-page-label="Страница"
        aria-current-label="Текущая страница">

      <b-table-column field="fio" label="ФИО" v-slot="props">
        {{ props.row.fio }}
      </b-table-column>

      <b-table-column field="age" label="Возраст" centered v-slot="props">
        {{ props.row.age }}
      </b-table-column>

      <b-table-column field="floor" label="Пол" v-slot="props">
        {{ props.row.floor }}
      </b-table-column>

      <b-table-column field="citizenship" label="Гражданство" centered v-slot="props">
        {{ props.row.citizenship }}
      </b-table-column>

      <b-table-column field="education" label="Образование" width="500" v-slot="props">
        {{ props.row.education }}
      </b-table-column>

      <b-table-column field="profession" label="Профессия" v-slot="props">
        {{ props.row.profession }}
      </b-table-column>

      <b-table-column field="org" label="Организация" v-slot="props">
        {{ props.row.org }}
      </b-table-column>

    </b-table>
  </div>
</template>

<script>
import {search} from "@/libs/elasticsearch";

export default {
  components: {},
  data() {
    return {
      contract: null,
      data: [],
      total: 10,
      loading: false,
      currentPage: 1,
      size: 10,
    }
  },
  mounted() {
    this.onPageChange(0);
  },
  computed: {
    account() {
      return this.$store.state.account;
    }
  },
  methods: {
    onPageChange(page) {
      const from = page === 0 ? 0 : this.size * (page - 1);
      console.log("FROM PAGE", page, from);
      search("people", {}, this.size, from).then(result => {
        this.total = result.hits.total && result.hits.total.value || 0;

        const items = result.hits.hits.map(el => {
          return el._source
        });

        this.data = items;
      })
    }
  }
}
</script>