<template>
    <main id="app">
        <app-header />
<!--        <app-content />-->
        <app-board />
        <app-footer />
    </main>
</template>

<script>
  export default {
    components: {
      appHeader: require('./components/header.vue').default,
      // appContent: require('./components/content.vue').default,
      appBoard: require('./components/board.vue').default,
      appFooter: require('./components/footer.vue').default
    }
  }
</script>