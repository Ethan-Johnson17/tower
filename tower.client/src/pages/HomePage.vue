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
        <div class="col-md-1 text-center selectable" @click="filter=''">All</div>
        <div class="col-md-1 text-center selectable" @click="filter='concert'">Concert</div>
        <div class="col-md-1 text-center selectable" @click="filter='convention'">Convention</div>
        <div class="col-md-1 text-center selectable" @click="filter='sport'">Sport</div>
        <div class="col-md-1 text-center selectable" @click="filter='digital'">Digital</div>
      </div>
    </div>
    <div class="col-md-3 selectable" v-if="!filter" v-for="e in events" :key="e.id">
      <Event :eventProp="e" />
    </div>
    <div class="col-md-3 selectable" v-else v-for="e in filtered" :key="e.id">
      <Event :eventProp="e" />
    </div>
  </div>
</template>

<script>
  import { computed } from "@vue/reactivity"
  import { onMounted, ref } from "@vue/runtime-core"
  import { AppState } from "../AppState"
  import { eventsService } from "../services/EventsService"
  import Pop from "../utils/Pop"
  import { logger } from "../utils/Logger"
  import { router } from "../router"
  import { useRouter } from "vue-router"
  export default {
    name: 'Home',
    setup() {
      const filter = ref('')
      onMounted(async () => {
        try {
          await eventsService.getAll('api/events')
        } catch (error) {
          logger.error(error)
          Pop.toast('Something went wrong', 'error')
        }
      })
      return {
        events: computed(() => AppState.events),
        filtered: computed(() => AppState.events.filter(f => f.type == filter.value)),
        filter,

        //Filter using a ref, each on click will define the ref that is passed to the function
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