<template>
  <div class="container">
<!--    <div class="field">-->
<!--      <label class="label">Год баланса</label>-->
<!--      <div class="control">-->
<!--        <div class="select">-->
<!--          <select v-model="year" @change="balance(year)">-->
<!--            <option value="2020">2020</option>-->
<!--            <option value="2019">2019</option>-->
<!--            <option value="2018">2018</option>-->
<!--            <option value="2017">2017</option>-->
<!--            <option value="2016">2016</option>-->
<!--            <option value="2015">2015</option>-->
<!--          </select>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="content"><h3>Прогноз баланса на 2021 год</h3></div>
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
        <td rowspan="2">{{ Math.round(planningTable.totalCount) }}</td>
      </tr>
      <tr>
        <td>в том числе:</td>
      </tr>
      <tr>
        <td>1.1.</td>
        <td>Трудоспособное население в трудоспособном возрасте</td>
        <td>{{ Math.round(planningTable.count1) }}</td>
      </tr>
      <tr>
        <td>1.2.</td>
        <td>Иностранные трудовые мигранты</td>
        <td>{{ Math.round(planningTable.count2) }}</td>
      </tr>
      <tr>
        <td>1.3.</td>
        <td>Пенсионеры старше трудоспособного возраста</td>
        <td>{{ Math.round(planningTable.count3) }}</td>
      </tr>
      <tr>
        <td>1.4.</td>
        <td>Подростки моложе трудоспособного возраста</td>
        <td>{{ Math.round(planningTable.count4) }}</td>
      </tr>
      <tr>
        <td><b>II.</b></td>
        <td><b>Распределение трудовых ресурсов по разделам ОКВЭД:</b></td>
        <td></td>
      </tr>
      <tr>
        <td>2.</td>
        <td>Сельское, лесное хозяйство, охота, рыболовство и рыбоводство</td>
        <td>{{ Math.round(planningTable.okved[0]) }}</td>
      </tr>
      <tr>
        <td>2.1</td>
        <td>Добыча полезных ископаемых</td>
        <td>{{ Math.round(planningTable.okved[1]) }}</td>
      </tr>
      <tr>
        <td>2.2</td>
        <td>Обрабатывающие производства</td>
        <td>{{ Math.round(planningTable.okved[2]) }}</td>
      </tr>
      <tr>
        <td>2.3</td>
        <td>Обеспечение электрической энергией, газом и паром; кондиционирование воздуха</td>
        <td>{{ Math.round(planningTable.okved[3]) }}</td>
      </tr>
      <tr>
        <td>2.4</td>
        <td>Водоснабжение; водоотведение, организация сбора и утилизации отходов, деятельность по ликвидации загрязнений</td>
        <td>{{ Math.round(planningTable.okved[4]) }}</td>
      </tr>
      <tr>
        <td>2.5</td>
        <td>Строительство</td>
        <td>{{ Math.round(planningTable.okved[5]) }}</td>
      </tr>
      <tr>
        <td>2.6</td>
        <td>Торговля оптовая и розничная; ремонт автотранспортных средств и мотоциклов</td>
        <td>{{ Math.round(planningTable.okved[6]) }}</td>
      </tr>
      <tr>
        <td>2.7</td>
        <td>Транспортировка и хранение</td>
        <td>{{ Math.round(planningTable.okved[7]) }}</td>
      </tr>
      <tr>
        <td>2.8</td>
        <td>Деятельность гостиниц и предприятий общественного питания</td>
        <td>{{ Math.round(planningTable.okved[8]) }}</td>
      </tr>
      <tr>
        <td>2.9</td>
        <td>Деятельность в области информации и связи</td>
        <td>{{ Math.round(planningTable.okved[9]) }}</td>
      </tr>
      <tr>
        <td>2.10</td>
        <td>Деятельность финансовая и страховая</td>
        <td>{{ Math.round(planningTable.okved[10]) }}</td>
      </tr>
      <tr>
        <td>2.11</td>
        <td>Деятельность по операциям с недвижимым имуществом</td>
        <td>{{ Math.round(planningTable.okved[11]) }}</td>
      </tr>
      <tr>
        <td>2.12</td>
        <td>Деятельность профессиональная, научная и техническая</td>
        <td>{{ Math.round(planningTable.okved[12]) }}</td>
      </tr>
      <tr>
        <td>2.13</td>
        <td>Деятельность административная и сопутствующие дополнительные услуги</td>
        <td>{{ Math.round(planningTable.okved[13]) }}</td>
      </tr>
      <tr>
        <td>2.14</td>
        <td>Государственное управление и обеспечение военной безопасности; социальное обеспечение</td>
        <td>{{ Math.round(planningTable.okved[14]) }}</td>
      </tr>
      <tr>
        <td>2.15</td>
        <td>Образование</td>
        <td>{{ Math.round(planningTable.okved[15]) }}</td>
      </tr>
      <tr>
        <td>2.16</td>
        <td>Деятельность в области здравоохранения и социальных услуг</td>
        <td>{{ Math.round(planningTable.okved[16]) }}</td>
      </tr>
      <tr>
        <td>2.17</td>
        <td>Деятельность в области культуры, спорта, организации досуга и развлечений</td>
        <td>{{ Math.round(planningTable.okved[17]) }}</td>
      </tr>
      <tr>
        <td>2.18</td>
        <td>Предоставление прочих видов услуг</td>
        <td>{{ Math.round(planningTable.okved[18]) }}</td>
      </tr>
      <tr>
        <td>2.19</td>
        <td>Деятельность домашних хозяйств как работодателей; недифференцированная деятельность частных домашних хозяйств по производству товаров</td>
        <td>{{ Math.round(planningTable.okved[19]) }}</td>
      </tr>
      <tr>
        <td>2.20</td>
        <td>Деятельность экстерриториальных организаций и органов</td>
        <td>{{ Math.round(planningTable.okved[20]) }}</td>
      </tr>
      </tbody>
    </table>
    <p class="has-text-centered" v-else>⌛ Прогноз строится... Подождите немного.</p>
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
      isLoaded: false,
      balanceTable: {
        totalCount: 0,
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        okved: [],
      },
      planningTable: {
        totalCount: 0,
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
        okved: [],
      }
    }
  },
  async mounted() {
    this.isLoaded = false;
    let i = 0;
    let tmpTotalCount;
    let tmpTotal1;
    let tmpTotal2;
    let tmpTotal3;
    let tmpTotal4;
    let tmpOkved;
    for (let year = 2015; year <= 2019; year++) {
      await this.balance(year);
      this.planningTable.totalCount += this.balanceTable.totalCount;
      this.planningTable.count1 += this.balanceTable.count1;
      this.planningTable.count2 += this.balanceTable.count2;
      this.planningTable.count3 += this.balanceTable.count3;
      this.planningTable.count4 += this.balanceTable.count4;

      for (let j = 0; j < 21; j++) {
        if (year === 2015) {
          this.planningTable.okved[j] = this.balanceTable.okved[j];
        } else {
          this.planningTable.okved[j] += this.balanceTable.okved[j];
        }
      }

      i++;
    }

    this.planningTable.totalCount = this.planningTable.totalCount / i;
    this.planningTable.count1 = this.planningTable.count1 / i;
    this.planningTable.count2 = this.planningTable.count2 / i;
    this.planningTable.count3 = this.planningTable.count3 / i;
    this.planningTable.count4 = this.planningTable.count4 / i;

    for (let j = 0; j < 21; j++) {
      this.planningTable.okved[j] = this.planningTable.okved[j] / i;
    }

    // console.log("this.planningTable.totalCount", this.planningTable.totalCount);
    // console.log("this.planningTable.count1", this.planningTable.count1);
    // console.log("this.planningTable.count2", this.planningTable.count2);
    // console.log("this.planningTable.count3", this.planningTable.count3);
    // console.log("this.planningTable.count4", this.planningTable.count4);

    tmpTotalCount = this.planningTable.totalCount;
    tmpTotal1 = this.planningTable.count1;
    tmpTotal2 = this.planningTable.count2;
    tmpTotal3 = this.planningTable.count3;
    tmpTotal4 = this.planningTable.count4;
    tmpOkved = [ ...this.planningTable.okved ];

    console.log("TMP OKVED:", tmpOkved);

    this.planningTable = {
      totalCount: 0,
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      okved: [],
    }

    i = 0;
    for (let year = 2015; year <= 2020; year++) {
      await this.balance(year);
      this.planningTable.totalCount += this.balanceTable.totalCount;
      this.planningTable.count1 += this.balanceTable.count1;
      this.planningTable.count2 += this.balanceTable.count2;
      this.planningTable.count3 += this.balanceTable.count3;
      this.planningTable.count4 += this.balanceTable.count4;
      for (let j = 0; j < 21; j++) {
        if (year === 2015) {
          this.planningTable.okved[j] = this.balanceTable.okved[j];
        } else {
          this.planningTable.okved[j] += this.balanceTable.okved[j];
        }
      }
      i++;
    }

    this.planningTable.totalCount /= i;
    this.planningTable.count1 /= i;
    this.planningTable.count2 /= i;
    this.planningTable.count3 /= i;
    this.planningTable.count4 /= i;

    for (let j = 0; j < 21; j++) {
      this.planningTable.okved[j] = this.planningTable.okved[j] / i;
    }

    this.planningTable.totalCount += (this.planningTable.totalCount - tmpTotalCount);
    this.planningTable.count1 += (this.planningTable.count1 - tmpTotal1);
    this.planningTable.count2 += (this.planningTable.count2 - tmpTotal2);
    this.planningTable.count3 += (this.planningTable.count3 - tmpTotal3);
    this.planningTable.count4 += (this.planningTable.count4 - tmpTotal4);

    for (let j = 0; j < 21; j++) {
      this.planningTable.okved[j] += (this.planningTable.okved[j] - tmpOkved[j]);
    }

    this.isLoaded = true;
  },
  computed: {
    account() {
      return this.$store.state.account;
    }
  },
  methods: {
    async balance(year) {
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
        setTimeout(await Zanyatie_po_razdelam_okved(i, year).then(count => this.balanceTable.okved.push(count)), 1000);
      }
    }
  }
}
</script>