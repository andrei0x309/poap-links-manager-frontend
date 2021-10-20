import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
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
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
  },
  {
    path: "/past-events",
    name: "PastEvents",
    component: () =>
      import(/* webpackChunkName: "events" */ "../views/PastEvents.vue"),
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
