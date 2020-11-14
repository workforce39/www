<template>
  <div class="container">
    <div class="flex">
      <div class="flex-start">
        <span class="crown">💼️</span>&nbsp;&nbsp;<span class="title">Трудовые ресурсы</span>
      </div>
      <div class="flex-end">
        <div class="user">
<!--          <div class="flex">-->
<!--            Ethereum network:&nbsp;<strong>{{ network }}</strong>-->
<!--          </div>-->
          <div class="hello flex-end">
            👋 Привет, Гость&nbsp;&nbsp;&nbsp;
            <a v-if="account.address" href="#" @click="logout">Выход</a>
            <a v-else href="#" @click="login">Вход</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventHub from "../event.js"

export default {
  name: 'Header',
  data() {
    return {}
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
    network() {
      return this.$store.state.network;
    }
  },
  methods: {
    login() {
      eventHub.$emit('LOGIN');
    },
    logout() {
      this.$store.commit("UPDATE_ACCOUNT", {});
    }
  }
}
</script>