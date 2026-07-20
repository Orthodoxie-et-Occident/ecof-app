<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/calendar" />
        </ion-buttons>
        <ion-title>Lecture</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- LOADING -->
      <div v-if="loading" class="state-container">
        <ion-spinner color="primary"></ion-spinner>
        <p>Chargement...</p>
      </div>

      <!-- ERROR -->
      <div v-else-if="error" class="state-container">
        <div class="error-card">
          <ion-icon :icon="cloudOfflineOutline" class="error-icon"></ion-icon>
          <p class="error-title">Connexion impossible</p>
          <ion-button fill="outline" color="primary" @click="fetchReadingData">
            <ion-icon :icon="refreshOutline" slot="start"></ion-icon>
            Réessayer
          </ion-button>
        </div>
      </div>

      <!-- CONTENT -->
      <div v-else-if="readingData" class="reading-wrapper ion-padding">
        <h2 class="book-title">
          {{ readingData.book_txt }}
        </h2>

        <div class="reading-text">
          {{ readingData.reading }}
        </div>
      </div>

      <!-- EMPTY -->
      <div v-else class="state-container">
        <p>Aucune lecture disponible</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonSpinner, IonButton, IonIcon, onIonViewWillEnter } from "@ionic/vue"
import { cloudOfflineOutline, refreshOutline } from "ionicons/icons"

const route = useRoute()

const readingData = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchReadingData = async () => {
  loading.value = true
  error.value = null

  try {
    const readingId = route.params.id
    const response = await fetch(`https://api.ecof.app/reading/${readingId}`)
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)
    const data = await response.json()
    readingData.value = data[0] || null
  } catch (err) {
    console.error(err.message)
    error.value = true
  } finally {
    loading.value = false
  }
}

onIonViewWillEnter(fetchReadingData)
</script>

<style scoped>
.book-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--ion-color-primary);
  text-align: center;
}

.reading-text {
  line-height: 1.8;
  text-align: left;
  padding-top: 0.5rem;
  white-space: pre-line;
}

.reading-wrapper {
  max-width: 680px;
  margin: 0 auto;
}

.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 10px;
  color: #aaa;
  font-size: 0.9rem;
}

.error-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 2rem;
  text-align: center;
}

.error-icon {
  font-size: 56px;
  color: var(--ion-color-medium);
  opacity: 0.4;
}

.error-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ion-color-dark);
}
</style>
