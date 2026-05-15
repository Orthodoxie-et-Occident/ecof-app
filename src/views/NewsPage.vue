<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Articles</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- CHARGEMENT -->
      <div v-if="loading" class="ion-text-center ion-padding">
        <ion-spinner name="crescent" />
      </div>

      <!-- ERREUR -->
      <ion-note v-else-if="error" color="danger" class="ion-padding"> Impossible de charger les articles : {{ error }} </ion-note>

      <!-- LISTE -->
      <ion-list v-else>
        <ion-item button v-for="article in articles" :key="article.slug" :router-link="`/articles/${article.slug}`" router-direction="forward" detail>
          <ion-label>
            <!-- TITRE -->
            <h2>{{ article.title }}</h2>

            <!-- AUTEUR + DATE -->
            <p>{{ article.author }} • {{ formatDate(article.published_at) }}</p>

            <!-- SLUG (pastille) -->
            <ion-badge color="primary">
              {{ article.slug }}
            </ion-badge>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge, IonSpinner, IonNote } from "@ionic/vue"

const articles = ref([])
const loading = ref(true)
const error = ref(null)

function formatDate(isoString) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(isoString))
}

onMounted(async () => {
  try {
    const response = await fetch("https://ecof-api-production.up.railway.app/api/news")

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }

    articles.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
ion-item {
  --padding-start: 16px;
}

h2 {
  font-weight: 600;
  margin-bottom: 4px;
}

p {
  margin: 0;
  opacity: 0.7;
  font-size: 0.9em;
}

ion-badge {
  margin-top: 6px;
}
</style>
