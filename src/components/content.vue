<template>
  <div class="container">
    <div class="board">
      <b-tabs position="is-centered">
        <b-tab-item label="Баланс">
          <balance />
        </b-tab-item>
        <b-tab-item label="Кадры">
          <peoples />
        </b-tab-item>
        <b-tab-item label="Описание кейса">
          <about />
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import eventHub from "../event.js"
import {search} from "@/libs/elasticsearch";
import {Trudosposobnoe_naselenie_v_trudosposobnom_vozraste} from "@/queries/trudoposobnoe_naselenie_v_trudosposobnom_vozraste";
import {Inostrannie_trudovie_migranty} from "@/queries/inostrannie_trudovie_migranty";
import {Starshe_trudosposobnogo_vozrasta} from "@/queries/starshe_trudosposobnogo_vozrasta";
import {Moloje_trudosposobnogo_vozrasta} from "@/queries/moloje_trudosposobnogo_vozrasta";

import Balance from "@/components/tabs/balance/balance.vue";
import Peoples from "@/components/tabs/peoples/peoples.vue";
import About from "@/components/tabs/about/about.vue";

export default {
  components: {About, Balance, Peoples },
  data() {
    return {
    }
  },
  mounted() {
  },
  computed: {
    account() {
      return this.$store.state.account;
    }
  },
  methods: {
  }
}
</script>