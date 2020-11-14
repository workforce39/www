<template>
  <div class="container">
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
  </div>
</template>

<script>
import {Trudosposobnoe_naselenie_v_trudosposobnom_vozraste} from "@/queries/trudoposobnoe_naselenie_v_trudosposobnom_vozraste";
import {Inostrannie_trudovie_migranty} from "@/queries/inostrannie_trudovie_migranty";
import {Starshe_trudosposobnogo_vozrasta} from "@/queries/starshe_trudosposobnogo_vozrasta";
import {Moloje_trudosposobnogo_vozrasta} from "@/queries/moloje_trudosposobnogo_vozrasta";

export default {
  components: {},
  data() {
    return {
      balanceTable: {
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
      }
    }
  },
  mounted() {
    this.balance();
  },
  computed: {
    account() {
      return this.$store.state.account;
    }
  },
  methods: {
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