<template>
  <div class="row">
    <div class="col-md-12">
      <div class="row bgImg align-content-center">
        <div class="col-md-3 text-light">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi inventore maiores illum reprehenderit sunt
          culpa autem quasi vitae voluptatum.
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-md-10 bg-grey darken-50 text-light py-2 my-3 rounded-2 justify-content-center">
      <div class="row justify-content-around ps-3">
        <div class="col-md-2 selectable">All</div>
        <div class="col-md-2 selectable">Concert</div>
        <div class="col-md-2 selectable">Convention</div>
        <div class="col-md-2 selectable">Sport</div>
        <div class="col-md-2 selectable">Digital</div>
      </div>
    </div>
    <div class="col-md-3" v-for="e in events" :key="e.id">
      <Event :event="e" />
    </div>
  </div>
</template>

<script>
  import { computed } from "@vue/reactivity"
  import { onMounted } from "@vue/runtime-core"
  import { AppState } from "../AppState"
  import { eventsService } from "../services/EventsService"
  import Pop from "../utils/Pop"
  import { logger } from "../utils/Logger"
  import { router } from "../router"
  import { useRoute } from "vue-router"
  export default {
    name: 'Home',
    setup() {
      onMounted(async () => {
        try {
          await eventsService.getAll('api/events')
        } catch (error) {
          logger.error(error)
          Pop.toast('Something went wrong', 'error')
        }
      })
      return {
        events: computed(() => AppState.events)

      }
    }
  }
</script>

<style scoped lang="scss">
  .bgImg {
    background-image: url("../assets/img/movie.jpg");
    object-fit: contain;
    height: 25vh;
  }
</style>