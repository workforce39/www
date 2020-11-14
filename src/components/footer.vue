<template>
  <footer class="app-footer">
    <div class="container">
      <div class="columns">
        <div class="column">
          <p>Мы ❤️ открытый исходный код: <a :href="'https://' + gitHub">{{ gitHub }}</a></p>
        </div>
        <div class="column">
          <div class="has-text-right has-text-right-tablet">
            <p class="title is-6">{{ domain }}</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { domain, gitHub } from "../network.js";

export default {
  data() {
    return {
      domain: domain,
      gitHub: gitHub,
    };
  }
}
</script>