<template>
  <div class="row elevation-3 m-2 pb-2 bg-grey darken-30 rounded-3">
    <router-link :to="{ name: 'EventDetails', params: { id: eventProp.id } }">
      <div class="col-md-12 p-0 m-0 rounded-3"><img :src="eventProp.coverImg" alt="Cover Image" class="img-fluid"></div>
      <div class="col-md-12">{{eventProp.name}}</div>
      <div class="col-md-12">{{eventProp.location}}</div>
      <div class="col-md-12">{{eventProp.startDate}}</div>
      <div class="col-md-12 bg-danger lighten-20 text-center" v-if="eventProp.isCanceled">Canceled</div>
      <div class="col-md-12 text-end" v-else>{{eventProp.capacity}} spots left</div>
    </router-link>
  </div>
</template>


<script>
  import { onMounted } from "@vue/runtime-core"
  import { computed } from "@vue/reactivity"
  import { AppState } from "../AppState"
  import { eventsService } from "../services/EventsService"
  import Pop from "../utils/Pop"
  import { logger } from "../utils/Logger"
  import { router } from "../router"
  import { useRouter } from "vue-router"
  export default {
    props: {
      eventProp: {
        type: Object,
        required: true
      }
    },
    setup() {

      return {
        events: computed(() => AppState.events),


      }
    }
  }
</script>


<style lang="scss" scoped>

</style>