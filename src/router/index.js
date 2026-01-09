import { createRouter, createWebHistory } from "@ionic/vue-router";
import AboutPage from "../views/AboutPage.vue";
import CalendarPage from "../views/CalendarPage.vue";
import HomePage from "../views/HomePage.vue";
import MapPage from "../views/MapPage.vue";
import OfficesPage from "../views/OfficesPage.vue";
import PrayersPage from "../views/PrayersPage.vue";
import SynaxarPage from "../views/SynaxarPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/offices",
    name: "Offices",
    component: OfficesPage,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: CalendarPage,
  },
  {
    path: "/map",
    name: "Map",
    component: MapPage,
  },
  {
    path: "/prayers",
    name: "Prayers",
    component: PrayersPage,
  },
  {
    path: "/synaxar",
    name: "Synaxar",
    component: SynaxarPage,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
