<template>
  <div class="container">
    <div class="board">
      <b-tabs position="is-centered">
        <b-tab-item label="Баланс">
          <table class="table is-bordered is-fullwidth">
            <thead>
              <th>№ строки</th>
              <th>Наименование показателя</th>
              <th>Тыс. человек</th>
            </thead>
            <tbody>
            <tr>
              <td><b>I.</b></td>
              <td><b>Формирование трудовых ресурсов</b></td>
              <td></td>
            </tr>
            <tr>
              <td rowspan="2">1.</td>
              <td>Численность трудовых ресурсов - всего</td>
              <td rowspan="2"></td>
            </tr>
            <tr>
              <td>в том числе:</td>
            </tr>
            <tr>
              <td>1.1.</td>
              <td>Трудоспособное население в трудоспособном возрасте</td>
              <td>{{ balanceTable.count1 }}</td>
            </tr>
            <tr>
              <td>1.2.</td>
              <td>Иностранные трудовые мигранты</td>
              <td>{{ balanceTable.count2 }}</td>
            </tr>
            <tr>
              <td>1.3.</td>
              <td>Пенсионеры старше трудоспособного возраста</td>
              <td>{{ balanceTable.count3 }}</td>
            </tr>
            <tr>
              <td>1.4.</td>
              <td>Подростки моложе трудоспособного возраста</td>
              <td>{{ balanceTable.count4 }}</td>
            </tr>
            <tr>
              <td><b>II.</b></td>
              <td><b>Распределение трудовых ресурсов по разделам ОКВЭД:</b></td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </b-tab-item>
        <b-tab-item label="Кадры">
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
import {getItems, search} from "../libs/elasticsearch";
import {Trudosposobnoe_naselenie_v_trudosposobnom_vozraste} from "../queries/trudoposobnoe_naselenie_v_trudosposobnom_vozraste";
import {Inostrannie_trudovie_migranty} from "../queries/inostrannie_trudovie_migranty";
import {Starshe_trudosposobnogo_vozrasta} from "../queries/starshe_trudosposobnogo_vozrasta";
import {Moloje_trudosposobnogo_vozrasta} from "../queries/moloje_trudosposobnogo_vozrasta";

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

      balanceTable: {
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
      }
    }
  },
  mounted() {
    this.onPageChange(0);

    this.balance();
  },
  computed: {
    account() {
      return this.$store.state.account;
    }
  },
  methods: {
    onPageChange(page) {
      const from = page === 0 ? page : page - 1;
      search("people", {}, this.size, from).then(result => {
        this.total = result.total && result.total.value || 0;

        const items = result.hits.map(el => {
          return el._source
        });

        this.data = items;
      })
    },
    async balance() {
      const total = await Trudosposobnoe_naselenie_v_trudosposobnom_vozraste();
      this.balanceTable.count1 = total;

      const total2 = await Inostrannie_trudovie_migranty();
      this.balanceTable.count2 = total2;

      const total3 = await Starshe_trudosposobnogo_vozrasta();
      this.balanceTable.count3 = total3;

      const total4 = await Moloje_trudosposobnogo_vozrasta();
      this.balanceTable.count4 = total4;
    }
  }
}
</script>