<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/synaxar" />
        </ion-buttons>

        <ion-title>
          {{ saintData?.saint || saintData?.prefixe }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div v-if="loading" class="state-container">
        <ion-spinner color="primary"></ion-spinner>
        <p>Chargement...</p>
      </div>

      <div v-else-if="error" class="state-container">
        <div class="error-card">
          <ion-icon :icon="cloudOfflineOutline" class="error-icon"></ion-icon>
          <p class="error-title">Connexion impossible</p>
          <ion-button fill="outline" color="primary" @click="fetchSaintData">
            <ion-icon :icon="refreshOutline" slot="start"></ion-icon>
            Réessayer
          </ion-button>
        </div>
      </div>

      <template v-else>
        <ion-segment v-model="selectedTab">
          <ion-segment-button v-if="saintData?.vie_b" value="vie_b">
            <ion-icon :src="fileTextIcon"></ion-icon>
            <ion-label>Vie brève</ion-label>
          </ion-segment-button>

          <ion-segment-button v-if="saintData?.vita_long" value="vita_long">
            <ion-icon :src="bookAIcon"></ion-icon>
            <ion-label>Synaxaire</ion-label>
          </ion-segment-button>

          <ion-segment-button v-if="saintData?.vita_liturgy" value="vita_liturgy">
            <ion-icon :src="scrollTextIcon"></ion-icon>
            <ion-label>Vie liturgique</ion-label>
          </ion-segment-button>
        </ion-segment>

        <div class="ion-padding">
          <!-- Vie brève -->
          <div v-if="selectedTab === 'vie_b'">
            <div v-if="saintData?.vie_b">
              <div v-if="saintData?.img" class="saint-image-container">
                <img :src="saintData.img" :alt="`Icône de ${saintData.saint}`" class="saint-image" />
              </div>
              <MarkdownSection :html="saintData.vie_b" />
            </div>

            <div v-else class="no-content">
              <ion-icon :src="fileTextIcon" size="large"></ion-icon>
              <p>Hagiographie non disponible</p>
            </div>
          </div>

          <!-- Synaxaire -->
          <div v-else-if="selectedTab === 'vita_long'">
            <MarkdownSection :html="saintData.vita_long" />
          </div>

          <!-- Vie liturgique -->
          <div v-else-if="selectedTab === 'vita_liturgy'">
            <MarkdownSection :html="saintData.vita_liturgy" />
          </div>
        </div>
      </template>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonIcon, IonSpinner, IonButton, IonSegment, IonSegmentButton, IonLabel, onIonViewWillEnter } from "@ionic/vue"
import { cloudOfflineOutline, refreshOutline } from "ionicons/icons"

import MarkdownSection from "@/components/MarkdownSection.vue"

import fileTextIcon from "@/assets/icons/file-text.svg"
import bookAIcon from "@/assets/icons/book-a.svg"
import scrollTextIcon from "@/assets/icons/scroll-text.svg"

const route = useRoute()

const saintData = ref(null)
const loading = ref(true)
const error = ref(null)
const selectedTab = ref("vie_b")

const fetchSaintData = async () => {
  loading.value = true
  error.value = null

  try {
    const saintId = route.params.id
    const response = await fetch(`https://api.ecof.app/vita/${saintId}`)
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)
    const data = await response.json()
    saintData.value = data

    if (data.vie_b) {
      selectedTab.value = "vie_b"
    } else if (data.vita_long) {
      selectedTab.value = "vita_long"
    } else if (data.vita_liturgy) {
      selectedTab.value = "vita_liturgy"
    }
  } catch (err) {
    console.error(err.message)
    error.value = true
  } finally {
    loading.value = false
  }
}

onIonViewWillEnter(fetchSaintData)
</script>

<style scoped>
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

.saint-image-container {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

.saint-image {
  width: 100%;
  max-width: min(300px, 100%);
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.no-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.no-content ion-icon {
  font-size: 56px;
  margin-bottom: 1rem;
  opacity: 0.3;
  color: var(--ion-color-medium);
}

.no-content p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--ion-color-medium);
}
</style>
