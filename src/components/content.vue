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
        <b-tab-item label="Организации">
          <orgs />
        </b-tab-item>
        <b-tab-item label="Описание кейса">
          <about />
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import Balance from "@/components/tabs/balance/balance.vue";
import Peoples from "@/components/tabs/peoples/peoples.vue";
import Orgs from "@/components/tabs/orgs/orgs.vue";
import About from "@/components/tabs/about/about.vue";

export default {
  components: {About, Balance, Peoples, Orgs},
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