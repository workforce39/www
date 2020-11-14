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

      <b-table-column field="name" label="Название" v-slot="props">
        {{ props.row.name }}
      </b-table-column>

      <b-table-column field="okved" label="Раздел ОКВЭД" v-slot="props">
        {{ lookup(props.row.okved) }}
      </b-table-column>

      <b-table-column field="employees" label="Количество сотрудников" v-slot="props">
        {{ props.row.employees }}
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
      const from = page === 0 ? page : page - 1;
      search("org", {}, this.size, from).then(result => {
        this.total = result.hits.total && result.hits.total.value || 0;

        const items = result.hits.hits.map(el => {
          return el._source
        });

        this.data = items;
      })
    },
    lookup(code) {
      switch(Number(code)) {
        case 1:
          return "Сельское, лесное хозяйство, охота, рыболовство и рыбоводство";
        case 2:
          return "Добыча полезных ископаемых";
        case 3:
          return "Обрабатывающие производства";
        case 4:
          return "Обеспечение электрической энергией, газом и паром; кондиционирование воздуха";
        case 5:
          return "Водоснабжение; водоотведение, организация сбора и утилизации отходов, деятельность по ликвидации загрязнений";
        case 6:
          return "Строительство";
        case 7:
          return "Торговля оптовая и розничная; ремонт автотранспортных средств и мотоциклов";
        case 8:
          return "Транспортировка и хранение";
        case 9:
          return "Деятельность гостиниц и предприятий общественного питания";
        case 10:
          return "Деятельность в области информации и связи";
        case 11:
          return "Деятельность финансовая и страховая";
        case 12:
          return "Деятельность по операциям с недвижимым имуществом";
        case 13:
          return "Деятельность профессиональная, научная и техническая";
        case 14:
          return "Деятельность административная и сопутствующие дополнительные услуги";
        case 15:
          return "Государственное управление и обеспечение военной безопасности; социальное обеспечение";
        case 16:
          return "Образование";
        case 17:
          return "Деятельность в области здравоохранения и социальных услуг";
        case 18:
          return "Деятельность в области культуры, спорта, организации досуга и развлечений";
        case 19:
          return "Предоставление прочих видов услуг";
        case 20:
          return "Деятельность домашних хозяйств как работодателей; недифференцированная деятельность частных домашних хозяйств по производству товаров";
        case 21:
          return "Деятельность экстерриториальных организаций и органов";
        default:
          return "ОКВЭД не определен"
      }
    }
  }
}
</script>