<template>
  <div class="dark:bg-gray-800 dark:text-white bg-white py-6 sm:py-8 lg:py-12">
    <div
      class="
        glass
        max-w-screen-lg
        px-4
        md:px-8
        mx-auto
        text-gray-800
        dark:text-white
      "
      style="min-height: 60vh"
    >
      <div class="mb-10 md:mb-16">
        <h2
          class="text-xl lg:text-2xl font-bold text-center mt-4 mb-4 md:mb-4"
          style="margin-left: 5.5em"
        >
          Admin Panel
        </h2>
        <Alert
          :hidden="alertHidden"
          :title="alertTitle"
          :message="alertMessage"
          :type="alertType"
          class="m-2"
        />
      </div>
      <section>
        <o-tabs vertical :expanded="true" v-model="curentTab">
          <o-tab-item label="Add Claim Links" value="add-claim-links">
            <div class="py-6 sm:py-8 lg:py-12">
              <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
                <!-- text - start -->
                <div class="mb-10 md:mb-16">
                  <h2
                    class="
                      text-2xl
                      lg:text-3xl
                      font-bold
                      text-center
                      mb-4
                      md:mb-6
                    "
                  >
                    Add Claim Links
                  </h2>
                </div>
                <!-- text - end -->

                <!-- form - start -->
                <form class="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto">
                  <div>
                    <label
                      for="claim-day"
                      class="inline-block text-sm sm:text-base mb-2"
                      >Claim Day*</label
                    >
                    <input
                      name="claim-day"
                      v-model="claimLinksDay"
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

                  <div>
                    <label
                      for="claim-month"
                      class="inline-block text-sm sm:text-base mb-2"
                      >Claim Month*</label
                    >
                    <input
                      name="claim-month"
                      v-model="claimLinksMonth"
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
                      for="claim-year"
                      class="inline-block text-sm sm:text-base mb-2"
                      >Claim Year</label
                    >
                    <input
                      name="claim-year"
                      v-model="claimLinksYear"
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
                      >Links One Per line*</label
                    >
                    <textarea
                      name="claim-links"
                      v-model="claimLinksList"
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
                      @click.prevent="addClaimLinksFn"
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
                      Add Claim Links
                    </button>

                    <span class="text-gray-500 text-sm">*Required</span>
                  </div>
                </form>
                <!-- form - end -->
              </div>
            </div>
          </o-tab-item>

          <o-tab-item label="Edit Claim Links" value="edit-claim-links">
            <div
              v-if="dbClaimLinks.length === 0"
              class="flex items-center justify-center"
            >
              No Claim Links in DataBase
            </div>
            <div v-else class="flex items-center justify-center">
              <div class="col-span-12">
                <div class="overflow-auto lg:overflow-visible">
                  <table
                    class="
                      table
                      text-gray-400
                      border-separate
                      space-y-6
                      text-sm
                    "
                    style="min-width: 55vw"
                  >
                    <thead class="bg-gray-800 text-gray-500">
                      <tr>
                        <th class="p-2 text-center">Claim Date</th>
                        <th class="p-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(entry, index) in dbClaimLinks"
                        :key="index"
                        class="bg-gray-800"
                      >
                        <td class="p-2">{{ entry.claimDate }}</td>
                        <td class="p-2">
                          <button
                            class="text-gray-400 hover:text-gray-100 mx-2"
                            @click.prevent="viewClaimLinksFn(entry.id)"
                          >
                            <svg
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                              class="inline w-8"
                            >
                              <path
                                fill="currentColor"
                                d="M.2 10a11 11 0 0 1 19.6 0A11 11 0 0 1 .2 10zm9.8 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                              />
                            </svg>
                          </button>
                          <button
                            class="text-gray-400 hover:text-gray-100 mx-2"
                          >
                            <svg
                              enable-background="new 0 0 45 45"
                              class="inline w-8"
                              id="Layer_1"
                              version="1.1"
                              viewBox="0 0 45 45"
                              xml:space="preserve"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                            >
                              <g>
                                <rect
                                  fill="currentColor"
                                  height="23"
                                  transform="matrix(-0.7071 -0.7072 0.7072 -0.7071 38.2666 48.6029)"
                                  width="11"
                                  x="23.7"
                                  y="4.875"
                                />
                                <path
                                  d="M44.087,3.686l-2.494-2.494c-1.377-1.377-3.61-1.377-4.987,0L34.856,2.94l7.778,7.778l1.749-1.749   C45.761,7.593,45.465,5.063,44.087,3.686z"
                                  fill="#231F20"
                                />
                                <polygon
                                  fill="#231F20"
                                  points="16,22.229 16,30 23.246,30  "
                                />
                                <path
                                  d="M29,40H5V16h12.555l5-5H3.5C1.843,11,0,11.843,0,13.5v28C0,43.156,1.843,45,3.5,45h28   c1.656,0,2.5-1.844,2.5-3.5V23.596l-5,5V40z"
                                  fill="#231F20"
                                />
                              </g>
                            </svg>
                          </button>
                          <button
                            class="text-gray-400 hover:text-gray-100 ml-2"
                            @click.prevent="deleteClaimLinksFn(entry.id, index)"
                          >
                            <svg
                              class="inline w-8"
                              viewBox="0 0 48 48"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 0h48v48H0V0z" fill="none" />
                              <path
                                fill="currentColor"
                                d="M12 38c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V14H12v24zm4.93-14.24l2.83-2.83L24 25.17l4.24-4.24 2.83 2.83L26.83 28l4.24 4.24-2.83 2.83L24 30.83l-4.24 4.24-2.83-2.83L21.17 28l-4.24-4.24zM31 8l-2-2H19l-2 2h-7v4h28V8z"
                              />
                              <path d="M0 0h48v48H0z" fill="none" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </o-tab-item>

          <o-tab-item label="Edit Claim Password" value="edit-claim-pass">
            <div class="py-6 sm:py-8 lg:py-12">
              <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
                <!-- text - start -->
                <div class="mb-10 md:mb-16">
                  <h2
                    class="
                      text-2xl
                      lg:text-3xl
                      font-bold
                      text-center
                      mb-4
                      md:mb-6
                    "
                  >
                    Change Claim Password
                  </h2>
                </div>
                <!-- text - end -->

                <!-- form - start -->
                <form class="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto">
                  <div class="sm:col-span-2">
                    <label
                      for="claim-password"
                      class="inline-block text-sm sm:text-base mb-2"
                      >Claim Password</label
                    >
                    <input
                      name="claim-password"
                      v-model="claimPassword"
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

                  <div class="sm:col-span-2 flex justify-between items-center">
                    <button
                      @click.prevent="claimPasswordChangeFn"
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
                      Change claim password
                    </button>
                  </div>
                </form>
                <!-- form - end -->
              </div>
            </div>
          </o-tab-item>
          <o-tab-item label="Add Past Event" value="add-past-event">
            <AddEditPastEvent
              pastEventUrl
              pastEventDate
              pastEventDescription
              :clickFn="addEditPastEventFn"
              type="add"
            />
          </o-tab-item>
          <o-tab-item label="Edit Past Event" value="edit-past-event">
            <div
              v-if="dbPastEvents.length === 0"
              class="flex items-center justify-center"
            >
              No past Events in DataBase
            </div>

            <div v-else class="flex items-center justify-center">
              <div class="col-span-12">
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
                        <th class="p-2 text-center">Action</th>
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
                        <td class="p-2">
                          <button
                            class="
                              gray-500
                              hover:text-gray-800
                              dark:text-gray-400 dark:hover:text-gray-100
                              mx-2
                            "
                            @click.prevent="openEditPastEventFn(entry.id)"
                          >
                            <svg
                              enable-background="new 0 0 48 48"
                              class="inline w-6"
                              id="Layer_1"
                              version="1.1"
                              viewBox="0 0 48 48"
                              xml:space="preserve"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                            >
                              <g>
                                <rect
                                  fill="currentColor"
                                  height="23"
                                  transform="matrix(-0.7071 -0.7072 0.7072 -0.7071 38.2666 48.6029)"
                                  width="11"
                                  x="23.7"
                                  y="4.875"
                                />
                                <path
                                  d="M44.087,3.686l-2.494-2.494c-1.377-1.377-3.61-1.377-4.987,0L34.856,2.94l7.778,7.778l1.749-1.749   C45.761,7.593,45.465,5.063,44.087,3.686z"
                                  fill="currentColor"
                                />
                                <polygon
                                  fill="currentColor"
                                  points="16,22.229 16,30 23.246,30  "
                                />
                                <path
                                  d="M29,40H5V16h12.555l5-5H3.5C1.843,11,0,11.843,0,13.5v28C0,43.156,1.843,45,3.5,45h28   c1.656,0,2.5-1.844,2.5-3.5V23.596l-5,5V40z"
                                  fill="currentColor"
                                />
                              </g>
                            </svg>
                          </button>
                          <button
                            class="
                              gray-500
                              hover:text-gray-800
                              dark:text-gray-400 dark:hover:text-gray-100
                              ml-2
                            "
                            @click.prevent="deleteClaimLinksFn(entry.id, index)"
                          >
                            <svg
                              class="inline w-6"
                              viewBox="0 0 48 48"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 0h48v48H0V0z" fill="none" />
                              <path
                                fill="currentColor"
                                d="M12 38c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V14H12v24zm4.93-14.24l2.83-2.83L24 25.17l4.24-4.24 2.83 2.83L26.83 28l4.24 4.24-2.83 2.83L24 30.83l-4.24 4.24-2.83-2.83L21.17 28l-4.24-4.24zM31 8l-2-2H19l-2 2h-7v4h28V8z"
                              />
                              <path d="M0 0h48v48H0z" fill="none" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </o-tab-item>
          <o-tab-item label="Log out" value="log-out"> &nbsp; </o-tab-item>
        </o-tabs>
      </section>
    </div>
  </div>

  <o-modal v-model:active="confirmDialogOpen">
    <div class="mb-10 md:mb-16">
      <h2 class="text-xl lg:text-2xl font-bold text-center mt-4 mb-4 md:mb-4">
        {{ confirmDialogTitle }}
      </h2>
      <p class="p-4">{{ confirmDialogMessage }}</p>

      <button
        @click.prevent="confirmDialogCancelFn"
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
          mr-4
        "
      >
        Cancel
      </button>
      <button
        @click.prevent="confirmDialogConfirmFn"
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
        Yes
      </button>
    </div>
  </o-modal>

  <o-modal v-model:active="editPastEventModal">
    <Alert
      :hidden="alertHidden"
      :title="alertTitle"
      :message="alertMessage"
      :type="alertType"
      class="m-2"
    />
    <AddEditPastEvent
      pastEventUrl
      pastEventDate
      pastEventDescription
      :clickFn="addEditPastEventFn.bind(null, pastEventEditId)"
      type="edit"
    />
  </o-modal>
</template>

<script>
// @ is an alias to /src
import Alert from "@/components/Alert";
import AddEditPastEvent from "@/components/admin/AddEditPastEvent";
import { useRoute, useRouter } from "vue-router";
import { onMounted, inject, reactive, computed, ref, watch } from "vue";
import { useHead } from "@vueuse/head";
import { checkAlreadyLoginAdmin, postData } from "@/util/index.js";

export default {
  name: "Admin",
  components: {
    Alert,
    AddEditPastEvent,
  },
  setup() {
    const endpointBase = inject("endPointBase");
    const curentTab = ref("add-claim-links");

    const editPastEventModal = ref(false);

    const confirmDialogOpen = ref(false);
    const confirmDialogTitle = ref("");
    const confirmDialogMessage = ref("");
    const confrimDialogResult = ref(false);
    const confirmDialogPromiseRes = ref(null);

    const confirmDialogCancelFn = () => {
      confirmDialogOpen.value = false;
      confrimDialogResult.value = false;
      confirmDialogPromiseRes.value();
    };

    const confirmDialogConfirmFn = () => {
      confirmDialogOpen.value = false;
      confrimDialogResult.value = true;
      confirmDialogPromiseRes.value();
    };

    const confirmDialogOpenFn = async (title, message) => {
      confirmDialogTitle.value = title;
      confirmDialogMessage.value = message;
      confirmDialogOpen.value = true;
      confrimDialogResult.value = false;

      await new Promise((resolve) => {
        confirmDialogPromiseRes.value = resolve;
      });
      return confrimDialogResult.value;
    };

    const claimLinksDay = ref("");
    const claimLinksMonth = ref("");
    const claimLinksYear = ref("");
    const claimLinksList = ref("");

    const dbClaimLinks = ref([]);

    const claimPassword = ref("");

    const pastEventUrl = ref("");
    const pastEventDate = ref("");
    const pastEventDescription = ref("");

    const pastEventEditId = ref(0);

    const dbPastEvents = ref([]);

    const alertHidden = ref(true);
    const alertTitle = ref("");
    const alertMessage = ref("");
    const alertType = ref("");

    const route = useRoute();
    const router = useRouter();

    const showAlertOk = (title, message) => {
      alertHidden.value = false;
      alertTitle.value = title;
      alertMessage.value = message;
      alertType.value = "success";
    };

    const showAlertError = (title, message) => {
      alertHidden.value = false;
      alertTitle.value = title;
      alertMessage.value = message;
      alertType.value = "error";
    };

    const siteData = reactive({
      title: `ADMIN POAP Manager - poap.yup.io`,
      description: `ADMIN POAP Manager`,
    });

    const postDataWithAuth = async (url, data) => {
      return await postData(url, data, {
        "CUSTOM-AUTH-PSK": localStorage.getItem("adminPass"),
      });
    };

    const logout = async () => {
      localStorage.setItem("adminPass", "");
      router.push("/login");
    };

    const getClaimPassword = async () => {
      const res = await postDataWithAuth(`${endpointBase}/get-claim-pass`);
      if (res.ok) {
        claimPassword.value = (await res.json()).password;
      } else showAlertError("Error", (await res.json()).error);
    };

    const claimPasswordChangeFn = async () => {
      const res = await postDataWithAuth(`${endpointBase}/set-claim-pass`, {
        password: claimPassword.value,
      });

      if (res.ok) showAlertOk("Success", "Claim password updated");
      else showAlertError("Error", (await res.json()).error);
    };

    const getDbClaimLinks = async () => {
      const res = await postDataWithAuth(`${endpointBase}/get-claim-links`);
      if (res.ok) {
        dbClaimLinks.value = (await res.json()).data;
      } else {
        showAlertError("Error", (await res.json()).error);
        return;
      }
    };

    const addEditPastEventFn = async () => {
      const isEdit = pastEventEditId.value !== null;

      if (
        pastEventUrl.value === "" ||
        pastEventDate.value === "" ||
        pastEventDescription.value === ""
      ) {
        showAlertError("Error", "Please fill in all fields");
        return;
      }

      const url = isEdit
        ? `${endpointBase}/edit-past-event`
        : `${endpointBase}/add-past-event`;

      const res = await postDataWithAuth(url, {
        url: pastEventUrl.value,
        date: pastEventDate.value,
        description: pastEventDescription.value,
        id: isEdit ? pastEventEditId.value : null,
      });
      if (res.ok) {
        showAlertOk(
          "Success",
          isEdit ? "Past event added" : "Past event edited"
        );
        if (isEdit) pastEventEditId.value = null;
      } else {
        showAlertError("Error", (await res.json()).error);
      }
    };

    const openEditPastEventFn = (id) => {
      pastEventEditId.value = id;
      editPastEventModal.value = true;
    };

    const getPastEvents = async () => {
      const res = await postData(`${endpointBase}/get-past-events`);
      if (res.ok) dbPastEvents.value = (await res.json()).data;
      else showAlertError("Error", (await res.json()).error);
    };

    const deleteClaimLinksFn = async (id, index) => {
      console.log("here");
      await confirmDialogOpenFn("Confirm Delete", "Are you sure?");
      if (!confrimDialogResult.value) return;
      console.log(id);
      const res = await postDataWithAuth(`${endpointBase}/del-claim-links`, {
        id,
      });
      if (res.ok) {
        dbClaimLinks.value.splice(index, 1);
        showAlertOk("Success", "Claim link deleted");
      } else showAlertError("Error", (await res.json()).error);
    };

    const viewClaimLinksFn = async (id) => {
      id;
    };

    const addClaimLinksFn = async () => {
      const data = {};

      const day = Number(claimLinksDay.value);
      if (isNaN(day) || day < 1 || day > 31) {
        showAlertError("Error", "Day must be a number between 1 and 31");
        return;
      }
      const month = Number(claimLinksMonth.value);
      if (isNaN(month) || month < 1 || month > 12) {
        showAlertError("Error", "Month must be a number between 1 and 12");
        return;
      }
      const year = Number(claimLinksYear.value);
      if (isNaN(year) || year < 1900 || year > 2100) {
        showAlertError("Error", "Year must be a number between 1900 and 2100");
        return;
      }

      const claimDate = new Date(year, month, day);

      if (claimDate.toString() === "Invalid Date") {
        showAlertError("Error", "Invalid date");
        return;
      }

      data.claimDate = `${year}-${month}-${day}`;

      let linksList = claimLinksList.value.replace(/\r\n/g, "\n");
      linksList = linksList.split("\n").map((link) => link.trim());

      for (const link of linksList) {
        try {
          new URL(link);
        } catch (e) {
          showAlertError("Error", "Invalid link");
          return;
        }
      }

      data.links = [];

      for (const link of linksList) {
        data.links.push({
          url: link,
          claimed: false,
          by: "",
        });
      }

      const url = `${endpointBase}/add-claim-links`;
      const resp = (await postDataWithAuth(url, data)).json();

      if ("error" in resp) {
        showAlertError("Error", resp.error);
        return;
      }
      showAlertOk("Success", "Claim links added");
    };

    watch(
      () => curentTab.value,
      (newValue) => {
        alertHidden.value = true;

        switch (newValue) {
          case "edit-claim-links":
            getDbClaimLinks();

            break;

          case "edit-past-event":
            getPastEvents();
            break;

          case "edit-claim-pass":
            getClaimPassword();
            break;

          case "log-out":
            logout();
            break;

          default:
            break;
        }
      }
    );

    onMounted(async () => {
      checkAlreadyLoginAdmin(endpointBase, router);
    });

    useHead({
      title: computed(() => siteData.title),
      description: computed(() => siteData.description),
    });

    return {
      router,
      endpointBase,
      route,
      logout,
      addClaimLinksFn,
      curentTab,
      claimLinksDay,
      claimLinksMonth,
      claimLinksYear,
      claimLinksList,
      alertHidden,
      alertTitle,
      alertMessage,
      alertType,
      claimPassword,
      claimPasswordChangeFn,
      dbClaimLinks,
      pastEventUrl,
      pastEventDate,
      pastEventDescription,
      confirmDialogCancelFn,
      confirmDialogConfirmFn,
      confirmDialogOpen,
      confirmDialogTitle,
      confirmDialogMessage,
      deleteClaimLinksFn,
      viewClaimLinksFn,
      dbPastEvents,
      addEditPastEventFn,
      pastEventEditId,
      openEditPastEventFn,
      editPastEventModal,
    };
  },
};
</script>
