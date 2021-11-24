<template>
  <div class="m-3 text-dark">
    <!-- <button type="button" class="btn border border-primary" data-bs-toggle="modal" data-bs-target="#create">
      New Event
    </button> -->
    <div id="edit" class="modal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark">Edit Event</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="edit">
              <label for="eventName">Event Name</label>
              <input required v-model="state.editable.name" type="text" class="form-control mb-3"
                placeholder="Event Name" aria-label="Example text with button addon" aria-describedby="button-addon1"
                id="eventName" />

              <label for="eventImg">Event Image</label>
              <input required v-model="state.editable.coverImg" type="url" class="form-control mb-3"
                placeholder="Event Cover Image" aria-label="Example text with button addon"
                aria-describedby="button-addon1" id="eventImg" />

              <label for="eventDescription">Event Description</label>
              <input required v-model="state.editable.description" type="text" class="form-control mb-3"
                placeholder="Event Description" aria-label="Example text with button addon"
                aria-describedby="button-addon1" id="eventDescription" />

              <label for="eventCap">Event Capacity</label>
              <input v-model="state.editable.capacity" type="text" class="form-control mb-3"
                placeholder="Event Description" aria-label="Example text with button addon"
                aria-describedby="button-addon1" id="eventCap" required />

              <label for="eventLocation">Event Location</label>
              <input required v-model="state.editable.location" type="text" class="form-control mb-3"
                placeholder="Event Location" aria-label="Example text with button addon"
                aria-describedby="button-addon1" id="eventLocation" />

              <label for="eventDate">Event Start Date</label>
              <input required v-model="state.editable.startDate" type="date" class="form-control mb-3"
                placeholder="Event Start date" aria-label="Example text with button addon"
                aria-describedby="button-addon1" id="eventDate" />

              <label for="eventType">Event Type</label>
              <select name="types" id="eventType" v-model="state.editable.type">
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sport</option>
                <option value="digital">Digital</option>
              </select>

              <div class="modal-footer">
                <!-- <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button> -->
                <button type="submit" @click.prevent="edit" class="btn btn-primary" data-bs-target="#edit"
                  data-bs-dismiss="modal">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
  import { reactive, computed } from "@vue/reactivity";
  import { eventsService } from "../services/EventsService";
  import { logger } from "../utils/Logger";
  import Pop from "../utils/Pop";
  import { useRoute, useRouter } from "vue-router";
  import { AppState } from "../AppState";
  export default {
    setup() {
      const router = useRouter()
      const route = useRoute()
      const state = reactive({
        editable: {},
      });
      return {
        state,
        eventInfo: computed(() => AppState.events),


        async edit() {
          try {
            let id = state.editable.id
            id = route.params.id
            await eventsService.edit(id, state.editable)
            const eventId = AppState.activeEvent.id
            router.push({
              name: "EventDetails",
              params: { id: eventId }
            })

          } catch (error) {
            logger.error(error)
            Pop.toast(error.message, "error")
          }
        },

        async create() {
          await eventsService.createEvent(state.editable)
          const eventId = AppState.activeEvent.id
          router.push({
            name: "EventDetails",
            params: { id: eventId }
          })
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
</style>