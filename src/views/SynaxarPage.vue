<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Synaxaire</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-searchbar v-model="searchTerm" placeholder="Recherche" :debounce="300"></ion-searchbar>

      <div v-if="loading" class="ion-text-center ion-margin">
        <ion-spinner></ion-spinner>
        <p>Chargement des saints...</p>
      </div>

      <ion-card v-if="error" color="danger">
        <ion-card-content>{{ error }}</ion-card-content>
      </ion-card>

      <ion-list v-if="!loading && !error">
        <ion-item v-for="(item, index) in visibleSaints" :key="index" button detail @click="showSaintDetail(item)">
          <ion-label>
            <h2>{{ item.saint }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-infinite-scroll ref="infiniteScrollRef" :disabled="allLoaded" @ionInfinite="loadMore">
        <ion-infinite-scroll-content loading-spinner="crescent" loading-text="Chargement..."></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from "vue"
import { useRouter } from "vue-router"
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonCard,
  IonCardContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/vue"

const PAGE_SIZE = 40
const router = useRouter()
const infiniteScrollRef = ref(null)

const saints = ref([])
const loading = ref(false)
const error = ref(null)
const searchTerm = ref("")
const page = ref(1)

const removeAccents = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()

const fetchSaints = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch("https://ecof-api-production.up.railway.app/api/synaxar")
    if (!response.ok) throw new Error("Erreur lors du chargement des données")
    const data = await response.json()

    saints.value = data.map((item) => ({
      ...item,
      _normalized: item.saint ? removeAccents(item.saint) : "",
    }))
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const filteredSaints = computed(() => {
  if (!searchTerm.value.trim()) return saints.value
  const q = removeAccents(searchTerm.value)
  // ✅ Fix 4 : filtre direct sur la propriété de l'objet, zéro risque d'index croisé
  return saints.value.filter((item) => item._normalized.includes(q))
})

const visibleSaints = computed(() => filteredSaints.value.slice(0, page.value * PAGE_SIZE))

const allLoaded = computed(() => filteredSaints.value.length === 0 || visibleSaints.value.length >= filteredSaints.value.length)

watch(
  searchTerm,
  async () => {
    page.value = 1
    await nextTick()
    if (infiniteScrollRef.value?.$el) {
      infiniteScrollRef.value.$el.disabled = false
    }
  },
  { flush: "sync" },
)

const loadMore = async (event) => {
  page.value++
  await event.target.complete()
}

const showSaintDetail = (item) => {
  router.push(`/saint/${item.vies_id}`)
}

onMounted(fetchSaints)
</script>
