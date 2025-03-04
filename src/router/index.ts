import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "",
        name: "chat",
        component: () => import("../views/ChatView.vue"),
      },
      {
        path: "presets",
        name: "presets",
        component: () => import("../views/PresetsView.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("../views/ProfileView.vue"),
      },
    ],
  },
  {
    path: "/new-preset",
    name: "new-preset",
    component: () => import("../views/NewPreset.mobile.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
