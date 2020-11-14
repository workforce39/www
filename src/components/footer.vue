<template>
  <footer class="app-footer">
    <div class="container">
      <div class="columns">
        <div class="column">
          <p>Мы ❤️ открытый исходный код: <a href="https://github.com/workforce39">github.com/workforce39</a></p>
        </div>
        <div class="column">
          <div class="has-text-right has-text-right-tablet">
            <p class="title is-6">Хакатон "Цифровой прорыв" &copy; 2020</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { domain } from "../network.js";

export default {
  data() {
    return {
      domain: domain
    };
  }
}
</script>