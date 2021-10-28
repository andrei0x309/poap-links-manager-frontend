<template>
  <div class="py-6 sm:py-8 lg:py-12">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <!-- text - start -->
      <div class="mb-10 md:mb-16">
        <h2 class="text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
          {{ props.type === "add" ? `Add Past Event` : `Edit Past Event` }}
        </h2>
      </div>
      <!-- text - end -->

      <!-- form - start -->
      <form class="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto">
        <div class="sm:col-span-2">
          <label for="claim-year" class="inline-block text-sm sm:text-base mb-2"
            >Url</label
          >
          <input
            name="claim-year"
            v-model="url"
            @change="inputChanged()"
            class="
              w-full
              bg-gray-50
              text-gray-800
              border
              focus:ring
              ring-indigo-300
              rounded
              outline-none
              transition
              duration-100
              px-3
              py-2
              dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200
            "
          />
        </div>

        <div class="sm:col-span-2">
          <label for="claim-year" class="inline-block text-sm sm:text-base mb-2"
            >Date</label
          >
          <input
            name="claim-year"
            v-model="eventDate"
            @change="inputChanged()"
            class="
              w-full
              bg-gray-50
              text-gray-800
              border
              focus:ring
              ring-indigo-300
              rounded
              outline-none
              transition
              duration-100
              px-3
              py-2
              dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200
            "
          />
        </div>

        <div class="sm:col-span-2">
          <label
            for="claim-links"
            class="inline-block text-sm sm:text-base mb-2"
            >Description</label
          >
          <textarea
            name="claim-links"
            v-model="description"
            @change="inputChanged()"
            class="
              w-full
              h-64
              bg-gray-50
              text-gray-800
              border
              focus:ring
              ring-indigo-300
              rounded
              outline-none
              transition
              duration-100
              px-3
              py-2
              dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200
            "
          ></textarea>
        </div>

        <div class="sm:col-span-2 flex justify-between items-center">
          <button
            @click.prevent="props.clickFn()"
            class="
              inline-block
              bg-indigo-500
              hover:bg-indigo-600
              active:bg-indigo-700
              focus-visible:ring
              ring-indigo-300
              text-white text-sm
              md:text-base
              font-semibold
              text-center
              rounded-lg
              outline-none
              transition
              duration-100
              px-8
              py-3
              dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200
            "
          >
            {{ props.type === "add" ? `Add Past Event` : `Edit Past Event` }}
          </button>
        </div>
      </form>
      <!-- form - end -->
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AddEditPastEvent",
  props: {
    pastEventUrl: {
      required: true,
    },
    pastEventDate: {
      required: true,
    },
    pastEventDescription: {
      required: true,
    },
    clickFn: {
      required: true,
    },
    type: {
      required: false,
      default: "add",
    },
  },
  emits: ["update:modelValue"],
  components: {},
  setup(props, { emit }) {
    const url = ref(props.pastEventUrl);
    const eventDate = ref(props.pastEventDate);
    const description = ref(props.pastEventDescription);

    const inputChanged = () => {
      emit("update:modelValue", {
        url: url.value,
        date: eventDate.value,
        description: description.value,
      });
    };

    return {
      url,
      eventDate,
      description,
      inputChanged,
      props,
    };
  },
});
</script>

<style lang="scss"></style>
