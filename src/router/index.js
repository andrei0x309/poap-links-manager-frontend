import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import PageNotFound from "../views/PageNotFound.vue";

const routes = [
  {
    name: "NotFound",
    path: "/:pathMatch(.*)*",
    alias: "/404",
    component: PageNotFound,
  },
  {
    path: "/dbError",
    name: "DBError",
    component: () =>
      import(/* webpackChunkName: "dberror" */ "../views/DBError.vue"),
  },
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/code/:code",
    name: "HomeWithCode",
    component: HomePage,
  },
  {
    path: "/login",
    name: "AdminLogin",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/AdminLogin.vue"),
  },
  {
    path: "/admin",
    name: "AdminDashboard",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/AdminDashboard.vue"),
  },
  {
    path: "/past-events",
    name: "PastEvents",
    component: () =>
      import(/* webpackChunkName: "events" */ "../views/PastEvents.vue"),
  },
  {
    path: "/meeting-recordings",
    name: "MeetingRecordings",
    component: () =>
      import(
        /* webpackChunkName: "meetingRecordings" */ "../views/MeetingRecordings.vue"
      ),
  },
  {
    path: "/meeting-recording/:id",
    name: "SingleMeetingRecording",
    component: () =>
      import(
        /* webpackChunkName: "singleMeetingRecording" */ "../views/SingleMeetingRecording.vue"
      ),
  },
  {
    path: "/fix-profile-previews",
    name: "FixProfilePreviews",
    component: () =>
      import(
        /* webpackChunkName: "fixProfilePreviews" */ "../views/FixProfilePreviews.vue"
      ),
  },
  {
    type: "yup",
    text: "YUP APP",
    path: "/app",
    href: "https://app.yup.io",
    beforeEnter() {
      location.href = "https://app.yup.io";
    },
  },
  {
    type: "yup",
    text: "YUP DOCS",
    path: "/docs",
    href: "https://docs.yup.io",
    beforeEnter() {
      location.href = "https://app.yup.io";
    },
  },
  {
    type: "yup",
    text: "YUP Live",
    path: "/live",
    href: "https://yup.live/",
    beforeEnter() {
      location.href = "https://yup.live/";
    },
  },
  {
    type: "yup",
    text: "YUP Finance",
    path: "/finance",
    href: "https://yup.finance/",
    beforeEnter() {
      location.href = "https://yup.finance/";
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export { routes, router };
