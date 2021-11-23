<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid bg-grey darken-40">
    <router-view />
  </main>
  <footer>
    <div class="bg-grey darken-50 text-light text-center p-4">
      Ethan's coding career 🎢
    </div>
  </footer>
</template>

<script>
  import { computed } from 'vue'
  import { AppState } from './AppState'
  export default {
    name: 'App',
    setup() {
      return {
        appState: computed(() => AppState)
      }
    }
  }
</script>
<style lang="scss">
  @import "./assets/scss/main.scss";
</style>