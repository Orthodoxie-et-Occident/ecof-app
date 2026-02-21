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
      <ion-searchbar
        v-model="searchTerm"
        placeholder="Recherche"
        @ionInput="handleSearch"
      ></ion-searchbar>

      <div v-if="loading" class="ion-text-center ion-margin">
        <ion-spinner></ion-spinner>
        <p>Chargement des saints...</p>
      </div>

      <ion-card v-if="error" color="danger">
        <ion-card-content>{{ error }}</ion-card-content>
      </ion-card>

      <ion-list v-if="!loading && !error">
        <ion-item
          v-for="(item, index) in visibleSaints"
          :key="index"
          button
          detail
          @click="showSaintDetail(item)"
        >
          <ion-label>
            <h2>{{ item.saint }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- Infinite scroll uniquement si pas de recherche active -->
      <ion-infinite-scroll v-if="!searchTerm" :disabled="allLoaded" @ionInfinite="loadMore">
        <ion-infinite-scroll-content
          loading-spinner="crescent"
          loading-text="Chargement..."
        ></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
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
} from "@ionic/vue";

const PAGE_SIZE = 40;

const router = useRouter();
const saints = ref([]);
const loading = ref(false);
const error = ref(null);
const searchTerm = ref("");
const page = ref(1);

const removeAccents = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const fetchSaints = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch("https://ecof-api-production.up.railway.app/api/synaxar");
    if (!response.ok) throw new Error("Erreur lors du chargement des données");
    saints.value = await response.json();
  } catch (err) {
    error.value = err.message;
    console.error("Erreur:", err);
  } finally {
    loading.value = false;
  }
};

// Recherche inchangée
const filteredSaints = computed(() => {
  if (!searchTerm.value) return saints.value;
  const normalizedSearch = removeAccents(searchTerm.value);
  return saints.value.filter((item) => removeAccents(item.saint).includes(normalizedSearch));
});

// Si recherche active → tout afficher, sinon paginer
const visibleSaints = computed(() => {
  if (searchTerm.value) return filteredSaints.value;
  return filteredSaints.value.slice(0, page.value * PAGE_SIZE);
});

const allLoaded = computed(() => visibleSaints.value.length >= saints.value.length);

// Reset page quand on efface la recherche
watch(searchTerm, () => {
  page.value = 1;
});

const handleSearch = (event) => {
  searchTerm.value = event.target.value;
};

const loadMore = (event) => {
  setTimeout(() => {
    page.value++;
    event.target.complete();
  }, 100);
};

const showSaintDetail = (item) => {
  router.push(`/saint/${item.vies_id}`);
};

onMounted(fetchSaints);
</script>

<style scoped>
ion-list {
  margin-top: 1rem;
}

ion-item {
  --padding-start: 16px;
}

h1 {
  margin-bottom: 1rem;
}
</style>
