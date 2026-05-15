import { createRouter, createWebHistory } from "@ionic/vue-router"
import AboutPage from "../views/AboutPage.vue"
import NewsPage from "../views/NewsPage.vue"
import CalendarPage from "../views/CalendarPage.vue"
import MapPage from "../views/MapPage.vue"
import ParishesPage from "../views/ParishesPage.vue"
import ParishPage from "../views/ParishPage.vue"
import PrayersPage from "../views/PrayersPage.vue"
import SynaxarPage from "../views/SynaxarPage.vue"
import SaintPage from "../views/SaintPage.vue"
import ReadingPage from "../views/ReadingPage.vue"
import SaintEphrem from "../views/prayers/miscellaneous/SaintEphrem.vue"
import SaintPatrick from "../views/prayers/miscellaneous/SaintPatrick.vue"
import MgrJean from "../views/prayers/miscellaneous/MgrJean.vue"
import MiscellaneousPrayers from "../views/prayers/MiscellaneousPrayers.vue"
import HoursPrayers from "../views/prayers/HoursPrayers.vue"
import VespersPrayer from "../views/prayers/hours/VespersPrayer.vue"
import ComplinePrayer from "../views/prayers/hours/ComplinePrayer.vue"
import VigilsPrayer from "../views/prayers/hours/VigilsPrayer.vue"
import LaudsPrayer from "../views/prayers/hours/LaudsPrayer.vue"
import PrimePrayer from "../views/prayers/hours/PrimePrayer.vue"
import TiercePrayer from "../views/prayers/hours/TiercePrayer.vue"
import SextPrayer from "../views/prayers/hours/SextPrayer.vue"
import NonePrayer from "../views/prayers/hours/NonePrayer.vue"

const routes = [
  { path: "/", name: "Parishes", component: ParishesPage },
  { path: "/news", mame: "News", component: NewsPage },
  { path: "/parish/:id", name: "Parish", component: ParishPage },
  { path: "/calendar", name: "Calendar", component: CalendarPage },
  { path: "/map", name: "Map", component: MapPage },
  { path: "/prayers", name: "Prayers", component: PrayersPage },
  { path: "/prayers/hours", name: "HoursPrayers", component: HoursPrayers },
  { path: "/prayers/hours/vespers", name: "Vespers", component: VespersPrayer },
  { path: "/prayers/hours/compline", name: "Compline", component: ComplinePrayer },
  { path: "/prayers/hours/vigils", name: "Vigils", component: VigilsPrayer },
  { path: "/prayers/hours/lauds", name: "Lauds", component: LaudsPrayer },
  { path: "/prayers/hours/prime", name: "Prime", component: PrimePrayer },
  { path: "/prayers/hours/tierce", name: "Tierce", component: TiercePrayer },
  { path: "/prayers/hours/sext", name: "Sext", component: SextPrayer },
  { path: "/prayers/hours/none", name: "None", component: NonePrayer },
  { path: "/prayers/miscellaneous", name: "MiscellaneousPrayers", component: MiscellaneousPrayers },
  { path: "/prayers/miscellaneous/saint-ephrem", name: "SaintEphrem", component: SaintEphrem },
  { path: "/prayers/miscellaneous/saint-patrick", name: "SaintPatrick", component: SaintPatrick },
  { path: "/prayers/miscellaneous/mgr-jean", name: "MgrJean", component: MgrJean },
  { path: "/synaxar", name: "Synaxar", component: SynaxarPage },
  { path: "/saint/:id", name: "Saint", component: SaintPage },
  { path: "/reading/:id", name: "Reading", component: ReadingPage },
  { path: "/about", name: "About", component: AboutPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
