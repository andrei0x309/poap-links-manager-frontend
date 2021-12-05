<template>
  <div class="dark:bg-gray-800 dark:text-white bg-white py-6 sm:py-8 lg:py-12">
    <div
      class="
        glass
        max-w-screen-lg
        px-4
        md:px-8
        mx-auto
        flex
        items-center
        flex-row
      "
      style="min-height: 60vh"
    >
      <Alert
        :hidden="alertHidden"
        :title="alertTitle"
        :message="alertMessage"
        :type="alertType"
        class="m-2"
      />
      <div class="col-span-12 mx-auto">
        <div class="overflow-auto lg:overflow-visible">
          <o-datepicker
            inline
            v-model="date"
            :events="events"
            indicators="bars"
            @active-change="onActiveChange"
          >
          </o-datepicker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, inject } from "vue";
import { postData } from "@/util/index.js";

export default defineComponent({
  name: "Event",
  components: {},
  setup(props) {
    const endpointBase = inject("endPointBase");
    const alertHidden = ref(true);
    const alertTitle = ref("");
    const alertMessage = ref("");
    const alertType = ref("");

    const dbLastMeetings = ref([]);
    const dbLastMeetingsCalendar = ref({
      date: Date.now(),
      bars: true,
      events: [],
    });

    const showAlertError = (title, message) => {
      alertHidden.value = false;
      alertTitle.value = title;
      alertMessage.value = message;
      alertType.value = "error";
    };

    const getPastMeetings = async () => {
      const res = await postData(`${endpointBase}/get-past-meetings`, {
        limit: 50,
      });
      if (res.ok) {
        dbLastMeetings.value = (await res.json()).data;
        dbLastMeetingsCalendar.value.events = dbLastMeetings.value.map(
          (meeting) => {
            return {
              date: new Date(meeting.date),
              type: "success",
            };
          }
        );
      } else showAlertError("Error", (await res.json()).error);
    };

    const onActiveChange = (date) => {
      console.log(date);
    };

    onMounted(async () => {
      getPastMeetings();
    });

    return {
      dbLastMeetings,
      dbLastMeetingsCalendar,
      props,
      onActiveChange,
    };
  },
});
</script>

<style lang="scss"></style>
