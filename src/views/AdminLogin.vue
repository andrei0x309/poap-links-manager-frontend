<template>
  <div class="dark:bg-gray-800 dark:text-white bg-white py-6 sm:py-8 lg:py-12">
    <div
      class="glass max-w-screen-lg px-4 md:px-8 mx-auto"
      style="min-height: 60vh"
    >
      <div class="dark:bg-transparent bg-white py-6 sm:py-8 lg:py-12">
        <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <h2
            class="
              text-gray-800 text-2xl
              dark:text-white
              lg:text-3xl
              font-bold
              text-center
              mb-4
              md:mb-8
            "
          >
            Admin Login
          </h2>
          <Alert
            :hidden="alertHidden"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            class="m-4"
          />
          <form class="max-w-lg border rounded-lg mx-auto">
            <div class="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label
                  for="password"
                  class="
                    dark:text-white
                    inline-block
                    text-gray-800 text-sm
                    sm:text-base
                    mb-2
                  "
                  >Admin Password</label
                >
                <input
                  name="password"
                  v-model="adminPassword"
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
                    dark:bg-gray-800 dark:text-white
                  "
                />
              </div>

              <button
                @click.prevent="loginFn()"
                class="
                  block
                  bg-gray-800
                  hover:bg-gray-700
                  active:bg-gray-600
                  focus-visible:ring
                  ring-gray-300
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
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Alert from "@/components/Alert";
import { useRoute, useRouter } from "vue-router";
import { onMounted, inject, ref, reactive, computed } from "vue";
import { useHead } from "@vueuse/head";
import { postData, checkAlreadyLogin } from "@/util/index.js";

export default {
  name: "AdminLogin",
  components: {
    Alert,
  },

  setup() {
    const endpointBase = inject("endPointBase");
    const isClaimOpen = ref(false);
    const adminPassword = ref("");
    const alertHidden = ref(true);
    const alertTitle = ref("");
    const alertMessage = ref("");
    const alertType = ref("");

    const route = useRoute();
    const router = useRouter();

    const siteData = reactive({
      title: `ADMIN POAP Manager - poap.yup.io`,
      description: `ADMIN POAP Manager Login Page`,
    });

    const loginFn = async () => {
      const data = {
        password: adminPassword.value,
      };

      const response = await postData(`${endpointBase}/admin-login`, data);

      if (response.ok) {
        localStorage.setItem("adminPass", adminPassword.value);
        router.push("/admin");
      } else {
        alertHidden.value = false;
        alertTitle.value = "Login Failed";
        alertMessage.value = "Incorrect Password";
        alertType.value = "error";
      }
    };

    onMounted(async () => {
      await checkAlreadyLogin(endpointBase, router);
    });

    useHead({
      title: computed(() => siteData.title),
      description: computed(() => siteData.description),
    });

    return {
      router,
      endpointBase,
      isClaimOpen,
      route,
      adminPassword,
      alertHidden,
      alertTitle,
      alertMessage,
      alertType,
      loginFn,
    };
  },
};
</script>
