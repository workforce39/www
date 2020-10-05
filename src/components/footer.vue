<template>
  <footer class="app-footer">
    <div class="container">
      <div class="columns">
        <div class="column">
          <p>We ❤️ opensource: <a href="https://github.com/stdi0/kinghill">github.com/stdi0/kinghill</a></p>
        </div>
        <div class="column">
          <div class="has-text-right has-text-right-tablet">
            <p class="title is-6">KingHill.io &copy; 2020</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import {domain, rootUrl} from "../network.js"

export default {
  data() {
    return {
      rootUrl: rootUrl,
      domain: domain
    };
  }
}
</script>