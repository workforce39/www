<template>
  <header class="header">
    <div class="container">
      <div class="profile">
        <span class="tag">Hello, {{ account.address || 'Guest' }}</span><span v-if="account.address">&nbsp;&nbsp;&nbsp;<a href="#" @click="logout">Logout</a></span><span v-else>&nbsp;&nbsp;&nbsp;<a href="#" @click="login">Login</a></span>
      </div>
    </div>
  </header>
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
    }
  },
  methods: {
    login() {
      eventHub.$emit('LOGIN');
    },
    logout()
    {
      this.$store.commit("UPDATE_ACCOUNT", {});
    }
  }
}
</script>