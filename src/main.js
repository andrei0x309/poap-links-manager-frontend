import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { routes, router } from "./router";
import { createHead } from "@vueuse/head";
import { Dropdown, Button, Sidebar, Tabs, Modal } from "@oruga-ui/oruga-next";
import "@oruga-ui/oruga-next/dist/oruga.css";
import "atropos/atropos.min.css";
import SplitInput from "vue-split-input";

const ENDPOINTBASE = "https://yup-poap-backend.deno.dev";

createApp(App)
  .use(router)
  .use(Dropdown)
  .use(Button)
  .use(Sidebar)
  .use(Tabs)
  .use(Modal)
  .use(SplitInput)
  .use(createHead())
  .provide("endPointBase", ENDPOINTBASE)
  .provide("routes", routes)
  .mount("#app");
