<template>
  <div class="container">
    <div class="board">
      <b-tabs position="is-centered">
        <b-tab-item label="Кадры">
          <b-table
              :data="data"
              :loading="loading"

              paginated
              backend-pagination
              :total="total"
              :per-page="size"
              @page-change="onPageChange"
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
        </b-tab-item>
        <b-tab-item label="Описание кейса">
          <p><b>ОПИСАНИЕ КЕЙСА</b></p>
          <br>
          <p>Баланс трудовых ресурсов - система показателей, отражающих численность и состав трудовых ресурсов
          и их распределение на занятых по видам экономической деятельности и формам собственности,
            безработных и экономически неактивное население.</p>
          <br>
          <p>По факту численность безработных граждан, состоящих на учете в областной службе занятости
          населения, с начала года (3955 чел.) увеличилась на 24363 чел. или в 7,2 раза и составила 28318
          человек. За неделю (с 02 по 09 июля) увеличение – на 1272 человека (4,7%). Уровень регистрируемой
          безработицы составил 5,4% от рабочей силы 528,4 тыс. чел. (на аналогичную дату 2019 года – 4338
            безработных граждан, уровень безработицы – 0,8%).</p>
          <br>
          <p>Проблемой является получение достоверной информации о качественных и количественных
            характеристиках предложения рабочей силы на региональном рынке труда.</p>
          <br>
          <p>Зачастую работодатели не стремятся подробно представить имеющуюся у них вакансию, расписать
          требования к кандидатам с учетом реальной потребности, а относятся к размещению имеющихся у них
            вакансий лишь с формальной точки зрения.</p>
          <br>
          <p>В свою очередь потенциальные работники (зарегистрированные как безработные или ищущие работу) не
            стремятся или, в ряде случаев, не умеют «продать себя».</p>
          <br>
          <p>В разрабатываемую систему “Баланс трудовых ресурсов” входят два раздела. В первом показываются
            ресурсы, во втором — их распределение</p>
          <br>
          <p>Система будет использоваться специалистами в сфере труда, занятости и образования с целью
          оперативного реагирования на изменяющуюся ситуацию в экономике и, как следствие, изменение рынка
            труда.</p>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import eventHub from "../event.js"
import {getItems} from "../libs/elasticsearch";

export default {
  components: {},
  data() {
    return {
      contract: null,
      data: [],
      total: 10,
      loading: false,
      from: 0,
      size: 10
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
    async getItems(index, _params, size, from = 0) {
      let params = { ..._params };
      params.sort = [{"_score": {"order": "desc"}}];

      try {
        let result = (await getItems(index, params, size, from)).data.hits;

        this.total = result.total && result.total.value || 0;

        const items = result.hits.map(el => {
          return el._source //.doc
        });

        this.from += this.size;

        this.data = items;
      } catch (e) {
        console.log('error:', e)
      }
    },
    onPageChange(page) {
      this.getItems('people', {}, this.size, this.size * page)
    },
  }
}
</script>