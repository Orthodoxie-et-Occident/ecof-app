<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Actualités</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div v-if="loading" class="ion-text-center ion-padding">
        <ion-spinner name="crescent" />
      </div>

      <ion-note v-else-if="error" color="danger" class="ion-padding"> Impossible de charger les articles : {{ error }} </ion-note>

      <ion-list v-else>
        <ion-item button detail v-for="article in articles" :key="article.id" :router-link="`/news/${article.id}`" router-direction="forward">
          <ion-label>
            <h2>{{ article.title }}</h2>
            <p>{{ article.author }} • {{ formatDate(article.published_at) }}</p>
            <ion-badge color="primary">{{ article.slug }}</ion-badge>
            <ion-badge color="light" v-if="isNew(article.published_at)">Nouveau</ion-badge>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge, IonSpinner, IonNote, onIonViewWillEnter } from "@ionic/vue"

const articles = ref([])
const loading = ref(true)
const error = ref(null)

function formatDate(isoString) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(isoString))
}

function isNew(isoString) {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  return new Date(isoString) > sevenDaysAgo
}

onIonViewWillEnter(async () => {
  loading.value = true
  error.value = null
  try {
    const res = await fetch("https://ecof-api-production.up.railway.app/api/news")
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    articles.value = await res.json()
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
h2::-webkit-scrollbar {
  display: none;
}

p {
  margin: 0;
  opacity: 0.7;
  font-size: 0.9em;
}

ion-badge {
  margin-top: 6px;
  margin-right: 4px;
}
</style>
