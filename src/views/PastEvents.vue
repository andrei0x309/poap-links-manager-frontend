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
          <table
            class="
              table
              dark:text-gray-400
              text-gray-700
              border-separate
              space-y-6
              text-sm
            "
            style="min-width: 55vw"
          >
            <thead
              class="
                dark:bg-gray-800
                bg-gray-200
                dark:text-gray-500
                text-gray-800
              "
            >
              <tr>
                <th class="p-2 text-center">Date</th>
                <th class="p-2 text-center">URL</th>
                <th class="p-2 text-center">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(entry, index) in dbPastEvents"
                :key="index"
                class="dark:bg-gray-800 bg-gray-200"
              >
                <td class="p-2">{{ entry.date }}</td>
                <td class="p-2">
                  <a :href="entry.url" rel="noindex">{{ entry.url }}</a>
                </td>
                <td class="p-2">{{ entry.description }}</td>
              </tr>
            </tbody>
          </table>
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

    const dbPastEvents = ref([]);

    const showAlertError = (title, message) => {
      alertHidden.value = false;
      alertTitle.value = title;
      alertMessage.value = message;
      alertType.value = "error";
    };

    const getPastEvents = async () => {
      const res = await postData(`${endpointBase}/get-past-events`);
      if (res.ok) dbPastEvents.value = (await res.json()).data;
      else showAlertError("Error", (await res.json()).error);
    };

    onMounted(async () => {
      getPastEvents();
    });

    return {
      dbPastEvents,
      props,
    };
  },
});
</script>

<style lang="scss"></style>
