<template>
  <div class="dark:bg-gray-800 dark:text-white bg-white py-6 sm:py-8 lg:py-12">
    <div
      class="glass max-w-screen-lg px-4 md:px-8 mx-auto flex items-center flex-row"
      style="min-height: 60vh"
      ref="scrollComponent"
    >
      <Alert
        :hidden="alertHidden"
        :title="alertTitle"
        :message="alertMessage"
        :type="alertType"
        class="m-2"
      />
      <div class="col-span-12 mx-auto">
        <o-datepicker
          inline
          v-model="calDate"
          :events="dbLastMeetingsCalendar.events"
          indicators="bars"
          :minDate="dbLastMeetingsCalendar.minDate"
        >
        </o-datepicker>
        <div
          v-for="meeting of dbLastMeetingsPage"
          :key="meeting.id"
          class="divide-y-2 divide-gray-100"
        >
          <div class="py-8 flex flex-wrap md:flex-nowrap video-container">
            <div
              class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col justify-center"
            >
              <span class="font-semibold title-font text-gray-700">Date</span>
              <span class="mt-1 text-gray-500 text-sm">{{ meeting.date }}</span>
            </div>
            <div class="md:flex-grow lg:w-96">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                {{ meeting.title }}
              </h2>
              <div class="leading-relaxed">
                <div class="iframe-wrapper">
                  <iframe
                    width="640"
                    height="360"
                    class="responsive-iframe"
                    frameborder="0"
                    :src="meeting.mega_link"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
              <a
                v-if="meeting.notesUrl"
                @click="openNotesModal(meeting.id)"
                class="text-pink-500 inline-flex items-center mt-4 cursor-pointer"
                >Open Meeting Notes
                <svg
                  class="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <o-modal
    :onClose="modalClose"
    contentClass="modalDefault"
    v-model:active="showNotesModal"
  >
    <SimpleSpinner :show="simpleSpinnerShow" size="0.7rem" />
    <Alert
      :hidden="alertHidden"
      :title="alertTitle"
      :message="alertMessage"
      :type="alertType"
      class="m-2"
    />
    <div v-html="notesModalContents"></div>
  </o-modal>
</template>

<script>
import { defineComponent, onMounted, ref, inject, watch } from "vue";
import { postData } from "@/util/index.js";
import Alert from "@/components/Alert";
import SimpleSpinner from "@/components/admin/SimpleSpinner";

export default defineComponent({
  name: "MeetingRecordings",
  components: {
    Alert,
    SimpleSpinner,
  },
  setup(props) {
    const endpointBase = inject("endPointBase");

    const alertHidden = ref(true);
    const alertTitle = ref("");
    const alertMessage = ref("");
    const alertType = ref("");
    const notesModalContents = ref("");

    const calDate = ref(new Date());
    const showNotesModal = ref(false);
    const simpleSpinnerShow = ref(false);

    const scrollComponent = ref(null);

    const dbLastMeetingsPage = ref([]);
    const dbLastMeetings = ref([]);
    const dbLastMeetingsCalendar = ref({
      date: Date.now(),
      bars: true,
      events: [],
      minDate: new Date("2021-05-05"),
    });

    const showAlertError = (title, message) => {
      alertHidden.value = false;
      alertTitle.value = title;
      alertMessage.value = message;
      alertType.value = "error";
    };

    watch(
      () => calDate.value,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          const searchDate = `${newVal.getUTCFullYear()}-${
            newVal.getUTCMonth() + 1
          }-${newVal.getUTCDate() + 1}`;
          const isMeeting = dbLastMeetings.value.find((meeting) => {
            if (meeting.date === searchDate) {
              //return true;
            } else {
              //console.log(meeting.date, searchDate);
            }
          });
          if (isMeeting) {
            console.log("meeting found");
          }
        }
      }
    );

    const getPastMeetings = async () => {
      const res = await postData(`${endpointBase}/get-past-meetings`, {
        limit: 50,
      });
      if (res.ok) {
        dbLastMeetings.value = (await res.json()).data;
        dbLastMeetingsPage.value = dbLastMeetings.value.slice(0, 4);
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

    const modalClose = () => {
      showNotesModal.value = false;
      alertHidden.value = true;
    };

    const openNotesModal = async (meetingId) => {
      showNotesModal.value = true;
      simpleSpinnerShow.value = true;
      const notesUrl = dbLastMeetings.value.find((meeting) => {
        if (meeting.id === meetingId) {
          return meeting.notesUrl;
        }
      }).notesUrl;

      //console.log(notesUrl);
      const resNotes = await postData(`${endpointBase}/get-notes-meeting`, {
        notesUrl,
      });

      if (!resNotes.ok) showAlertError("Error", "Fetching meeting notes...");

      const jsonNotes = await resNotes.json();
      notesModalContents.value = jsonNotes.page
        .match(/<article(.*)<\/article>/g)[0]
        .replace(/\/_next\/image/g, "https://yup.community/_next/image");
      //notesModalContents.value = "<b>test</b>";

      simpleSpinnerShow.value = false;
    };

    const addMoreMeetings = async () => {
      if (dbLastMeetingsPage.value.length < dbLastMeetings.value.length) {
        dbLastMeetingsPage.value = dbLastMeetings.value.slice(
          0,
          dbLastMeetingsPage.value.length + 4
        );
      }
    };

    const handleScroll = () => {
      let scrollEl = scrollComponent.value;
      if (scrollEl.getBoundingClientRect().bottom < window.innerHeight) {
        addMoreMeetings();
      }
    };

    onMounted(async () => {
      window.addEventListener("scroll", handleScroll);
      getPastMeetings();
    });

    return {
      dbLastMeetings,
      dbLastMeetingsCalendar,
      props,
      onActiveChange,
      dbLastMeetingsPage,
      calDate,
      alertHidden,
      alertTitle,
      alertMessage,
      alertType,
      modalClose,
      openNotesModal,
      simpleSpinnerShow,
      handleScroll,
      showNotesModal,
      notesModalContents,
      scrollComponent,
    };
  },
});
</script>

<style lang="scss">
html {
  --calendar-background: #fff;
}

html[class="dark"] {
  --calendar-background: dimgray;
}

.modalDefault {
  min-width: 20rem;
  min-height: 20rem;
  padding: 1rem;
  text-align: left;

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    padding: 1rem;
  }
}

.iframe-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%;
}
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.o-drop__menu {
  background-color: var(--calendar-background);
  border: 1px solid #7a7a7a;
}

.o-sel-arrow {
  background-color: transparent;
}

.o-dpck {
  font-size: 1rem;
}
.o-dpck--small {
  font-size: 0.75rem;
}
.o-dpck--medium {
  font-size: 1.25rem;
}
.o-dpck--large {
  font-size: 1.5rem;
}
.o-dpck__dropdown {
  width: 100%;
}
.o-dpck__box {
  display: block;
  position: relative;
  outline: none;
  line-height: 1.5;
  padding: 0.375rem 1rem;
}
.o-dpck__header {
  padding: 0 0 0.875rem 0;
  margin: 0 0 0.875rem 0;
  border-bottom: 1px solid #dbdbdb;
}
.o-dpck__header__buttons {
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
}
.o-dpck__header__buttons--small {
  font-size: 0.75rem;
}
.o-dpck__header__buttons--medium {
  font-size: 1.25rem;
}
.o-dpck__header__buttons--large {
  font-size: 1.5rem;
}
.o-dpck__header__previous,
.o-dpck__header__next {
  justify-content: center;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  box-shadow: none;
  display: inline-flex;
  position: relative;
  vertical-align: top;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  line-height: 1.5;
  border: 1px solid transparent;
  border-radius: 4px;
  border-color: #dbdbdb;
  color: #363636;
  min-width: 2.25em;
  height: 2.25em;
  padding: 0.5em 0.5em;
  margin: 0.25rem;
}
.o-dpck__header__previous:hover,
.o-dpck__header__next:hover {
  text-decoration: none;
  border-color: #b5b5b5;
  color: #363636;
}
.o-dpck__header__previous {
  order: 1;
}
.o-dpck__header__next {
  order: 3;
}
.o-dpck__header__list {
  order: 2;
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  list-style: none;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}
.o-dpck__footer {
  padding: 0.875rem 0.5rem 0 0.5rem;
  margin: 0.875rem 0 0.875rem 0;
  border-top: 1px solid #dbdbdb;
}
.o-dpck__table {
  display: table;
  margin: 0 auto 0 auto;
}
.o-dpck__table__head {
  display: table-header-group;
  padding: 0 0 0.875rem 0;
  margin: 0 0 0.875rem 0;
  border-bottom: 1px solid #dbdbdb;
}
.o-dpck__table__body {
  display: table-row-group;
}
.o-dpck__table__row {
  display: table-row;
}
.o-dpck__table__head-cell {
  padding: #7a7a7a;
  font-weight: 600;
}
.o-dpck__table__cell {
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  text-decoration: none;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
}
.o-dpck__table__cell--unselectable {
  color: #b5b5b5;
}
.o-dpck__table__cell--today {
  border: solid 1px rgba(68, 94, 0, 0.5);
}
.o-dpck__table__cell--selectable {
  color: #4a4a4a;
}
.o-dpck__table__cell--first-hovered {
  background-color: #7a7a7a;
  color: #dbdbdb;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.o-dpck__table__cell--within-hovered {
  background-color: rgba(122, 122, 122, 0.5);
  color: #dbdbdb;
  border-radius: 0;
}
.o-dpck__table__cell--last-hovered {
  background-color: #7a7a7a;
  color: #dbdbdb;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.o-dpck__table__cell--selected:not(.o-dpck__table__cell--first-hovered):not(.o-dpck__table__cell--within-hovered):not(.o-dpck__table__cell--last-hovered) {
  background-color: #434343;
  color: #ffffff;
}
.o-dpck__table__cell--first-selected:not(.o-dpck__table__cell--first-hovered):not(.o-dpck__table__cell--within-hovered):not(.o-dpck__table__cell--last-hovered) {
  background-color: #434343;
  color: #ffffff;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.o-dpck__table__cell--within-selected:not(.o-dpck__table__cell--first-hovered):not(.o-dpck__table__cell--within-hovered):not(.o-dpck__table__cell--last-hovered) {
  background-color: rgba(68, 94, 0, 0.5);
  border-radius: 0;
}
.o-dpck__table__cell--last-selected:not(.o-dpck__table__cell--first-hovered):not(.o-dpck__table__cell--within-hovered):not(.o-dpck__table__cell--last-hovered) {
  background-color: #445e00;
  color: #ffffff;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.o-dpck__table__cell--nearby:not(.o-dpck__table__cell--selected) {
  color: #b5b5b5;
}
.o-dpck__table__cell--invisible {
  visibility: hidden;
}
.o-dpck__table__cell--events {
  padding: 0.3rem 0.75rem 0.75rem;
  position: relative;
}
.o-dpck__table__events {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 15%;
}
.o-dpck__table__event {
  background-color: #b5b5b5;
}
.o-dpck__table__event--primary {
  background-color: #445e00;
  background-color: #445e00;
}
.o-dpck__table__event--danger {
  background-color: #b60000;
  background-color: #b60000;
}
.o-dpck__table__event--warning {
  background-color: #f4c300;
  background-color: #f4c300;
}
.o-dpck__table__event--success {
  background-color: #006724;
  background-color: #006724;
}
.o-dpck__table__event--info {
  background-color: #005c98;
  background-color: #005c98;
}
.o-dpck__table__event--dots {
  border-radius: 50%;
  margin: 0 0.1em;
  height: 0.35em;
  width: 0.35em;
}
.o-dpck__table__event--bars {
  height: 0.25em;
  width: 100%;
}
.o-dpck--mobile .o-dpck__header__previous {
  order: 1;
  flex-grow: 1;
  flex-shrink: 1;
}
.o-dpck--mobile .o-dpck__header__next {
  order: 3;
  flex-grow: 1;
  flex-shrink: 1;
}
.o-dpck--mobile .o-dpck__header__list {
  order: 2;
  flex-grow: 1;
  flex-shrink: 1;
}

/* @docs */
/* @docs */
.o-dtpck__time {
  display: flex;
  justify-content: center;
  align-items: center;
}

.chevron {
  border-width: 0.2em 0.2em 0 0;
  content: "";
  display: inline-block;
  height: 0.65em;
  position: relative;
  vertical-align: top;
  width: 0.65em;
  border-color: cadetblue;
}

.mdi-chevron-right {
  @extend .chevron;
  transform: rotate(45deg);
}

.mdi-chevron-left {
  @extend .chevron;
  left: 0.25em;
  transform: rotate(-135deg);
}

@media screen and (min-width: 768px) {
  .video-container {
    padding-right: 20rem;
    width: 110%;
  }
}
</style>
