<template>
  <div class="container">
    <div class="field">
    <label class="label">Год баланса</label>
    <div class="control">
      <div class="select">
        <select v-model="year" @change="balance(year)">
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
        </select>
      </div>
    </div>
  </div>
    <table v-if="isLoaded" class="table is-bordered is-fullwidth">
      <thead>
      <th>№ строки</th>
      <th>Наименование показателя</th>
      <th>Человек</th>
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
        <td rowspan="2">{{ balanceTable.totalCount }}</td>
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
      <tr>
        <td>2.</td>
        <td>Сельское, лесное хозяйство, охота, рыболовство и рыбоводство</td>
        <td>{{ balanceTable.okved[0] }}</td>
      </tr>
      <tr>
        <td>2.1</td>
        <td>Добыча полезных ископаемых</td>
        <td>{{ balanceTable.okved[1] }}</td>
      </tr>
      <tr>
        <td>2.2</td>
        <td>Обрабатывающие производства</td>
        <td>{{ balanceTable.okved[2] }}</td>
      </tr>
      <tr>
        <td>2.3</td>
        <td>Обеспечение электрической энергией, газом и паром; кондиционирование воздуха</td>
        <td>{{ balanceTable.okved[3] }}</td>
      </tr>
      <tr>
        <td>2.4</td>
        <td>Водоснабжение; водоотведение, организация сбора и утилизации отходов, деятельность по ликвидации загрязнений</td>
        <td>{{ balanceTable.okved[4] }}</td>
      </tr>
      <tr>
        <td>2.5</td>
        <td>Строительство</td>
        <td>{{ balanceTable.okved[5] }}</td>
      </tr>
      <tr>
        <td>2.6</td>
        <td>Торговля оптовая и розничная; ремонт автотранспортных средств и мотоциклов</td>
        <td>{{ balanceTable.okved[6] }}</td>
      </tr>
      <tr>
        <td>2.7</td>
        <td>Транспортировка и хранение</td>
        <td>{{ balanceTable.okved[7] }}</td>
      </tr>
      <tr>
        <td>2.8</td>
        <td>Деятельность гостиниц и предприятий общественного питания</td>
        <td>{{ balanceTable.okved[8] }}</td>
      </tr>
      <tr>
        <td>2.9</td>
        <td>Деятельность в области информации и связи</td>
        <td>{{ balanceTable.okved[9] }}</td>
      </tr>
      <tr>
        <td>2.10</td>
        <td>Деятельность финансовая и страховая</td>
        <td>{{ balanceTable.okved[10] }}</td>
      </tr>
      <tr>
        <td>2.11</td>
        <td>Деятельность по операциям с недвижимым имуществом</td>
        <td>{{ balanceTable.okved[11] }}</td>
      </tr>
      <tr>
        <td>2.12</td>
        <td>Деятельность профессиональная, научная и техническая</td>
        <td>{{ balanceTable.okved[12] }}</td>
      </tr>
      <tr>
        <td>2.13</td>
        <td>Деятельность административная и сопутствующие дополнительные услуги</td>
        <td>{{ balanceTable.okved[13] }}</td>
      </tr>
      <tr>
        <td>2.14</td>
        <td>Государственное управление и обеспечение военной безопасности; социальное обеспечение</td>
        <td>{{ balanceTable.okved[14] }}</td>
      </tr>
      <tr>
        <td>2.15</td>
        <td>Образование</td>
        <td>{{ balanceTable.okved[15] }}</td>
      </tr>
      <tr>
        <td>2.16</td>
        <td>Деятельность в области здравоохранения и социальных услуг</td>
        <td>{{ balanceTable.okved[16] }}</td>
      </tr>
      <tr>
        <td>2.17</td>
        <td>Деятельность в области культуры, спорта, организации досуга и развлечений</td>
        <td>{{ balanceTable.okved[17] }}</td>
      </tr>
      <tr>
        <td>2.18</td>
        <td>Предоставление прочих видов услуг</td>
        <td>{{ balanceTable.okved[18] }}</td>
      </tr>
      <tr>
        <td>2.19</td>
        <td>Деятельность домашних хозяйств как работодателей; недифференцированная деятельность частных домашних хозяйств по производству товаров</td>
        <td>{{ balanceTable.okved[19] }}</td>
      </tr>
      <tr>
        <td>2.20</td>
        <td>Деятельность экстерриториальных организаций и органов</td>
        <td>{{ balanceTable.okved[20] }}</td>
      </tr>
      </tbody>
    </table>
    <p class="has-text-centered" v-else>⌛ Баланс формируется...</p>
  </div>
</template>

<script>
import {Trudosposobnoe_naselenie_v_trudosposobnom_vozraste} from "@/queries/trudoposobnoe_naselenie_v_trudosposobnom_vozraste";
import {Inostrannie_trudovie_migranty} from "@/queries/inostrannie_trudovie_migranty";
import {Starshe_trudosposobnogo_vozrasta} from "@/queries/starshe_trudosposobnogo_vozrasta";
import {Moloje_trudosposobnogo_vozrasta} from "@/queries/moloje_trudosposobnogo_vozrasta";
import {Zanyatie_po_razdelam_okved} from "../../../queries/zanyatie_po_razdelam_okved";
import {search} from "../../../libs/elasticsearch";

export default {
  components: {},
  data() {
    return {
      year: 2020,
      isLoaded: false,
      balanceTable: {
        totalCount: 0,
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        okved: [],
      }
    }
  },
  mounted() {
    this.balance(this.year);
  },
  computed: {
    account() {
      return this.$store.state.account;
    }
  },
  methods: {
    async balance(year) {
      this.isLoaded = false;
      this.balanceTable.okved = [];

      const totalCount = await search("people", {"update.match": year}, 9999);
      this.balanceTable.totalCount = totalCount.hits && totalCount.hits.total.value || 0;

      const total = await Trudosposobnoe_naselenie_v_trudosposobnom_vozraste(year);
      this.balanceTable.count1 = total;

      const total2 = await Inostrannie_trudovie_migranty(year);
      this.balanceTable.count2 = total2;

      const total3 = await Starshe_trudosposobnogo_vozrasta(year);
      this.balanceTable.count3 = total3;

      const total4 = await Moloje_trudosposobnogo_vozrasta(year);
      this.balanceTable.count4 = total4;

      for (let i = 1; i <= 21; i++) {
        setTimeout(Zanyatie_po_razdelam_okved(i, year).then(count => this.balanceTable.okved.push(count)), 1000);
      }

      this.isLoaded = true;
    }
  }
}
</script>