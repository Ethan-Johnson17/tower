<template>
  <router-link :to="{name: 'Event Details'}">
    <div class="row elevation-3 m-2 pb-2 bg-grey darken-30 rounded-3">
      <div class="col-md-12 p-0 m-0 rounded-3"><img :src="event.coverImg" alt="Cover Image" class="img-fluid"></div>
      <div class="col-md-12">{{event.name}}</div>
      <div class="col-md-12">{{event.location}}</div>
      <div class="col-md-12">{{event.startDate}}</div>
      <div class="col-md-12 bg-danger lighten-20 text-center" v-if="event.isCanceled">Canceled</div>
      <div class="col-md-12 text-end" v-else>{{event.capacity}} spots left</div>
    </div>
  </router-link>
</template>


<script>
  import { onMounted } from "@vue/runtime-core"
  import { computed } from "@vue/reactivity"
  import { AppState } from "../AppState"
  import { eventsService } from "../services/EventsService"
  import Pop from "../utils/Pop"
  import { logger } from "../utils/Logger"
  import { router } from "../router"
  import { useRoute } from "vue-router"
  export default {
    props: {
      event: {
        type: Object,
        required: true
      }
    },
    setup() {
      // onMounted(async () => {

      //   try {
      //     await eventsService.getAll('api/events')
      //     logger.log()
      //   } catch (error) {
      //     logger.error(error)
      //   }
      // })
      return {
        events: computed(() => AppState.events)

      }
    }
  }
</script>


<style lang="scss" scoped>

</style>