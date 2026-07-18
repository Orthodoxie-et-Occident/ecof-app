<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Annonces</ion-title>
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
          <ion-button fill="outline" color="primary" @click="fetchArticles">
            <ion-icon :icon="refreshOutline" slot="start"></ion-icon>
            Réessayer
          </ion-button>
        </div>
      </div>

      <div v-else class="news-list">
        <ion-card v-for="article in articles" :key="article.id" button :router-link="`/news/${article.id}`" router-direction="forward" class="news-card">
          <ion-card-content>
            <div class="card-body">
              <div class="category-icon-wrap">
                <ion-icon :icon="getCategoryIcon(article.slug_id)"></ion-icon>
              </div>

              <div class="card-main">
                <div class="badges-row">
                  <ion-badge class="category-badge">
                    {{ getCategoryLabel(article.slug_id) }}
                  </ion-badge>
                  <ion-badge class="new-badge" v-if="isNew(article.published_at)">Nouveau</ion-badge>
                </div>

                <h2 class="article-title">{{ article.title }}</h2>
                <p class="article-meta">{{ article.author }} • {{ formatDate(article.published_at) }}</p>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardContent, IonBadge, IonSpinner, IonButton, IonIcon, onIonViewWillEnter } from "@ionic/vue"
import { cloudOfflineOutline, refreshOutline, helpCircleOutline, documentTextOutline, calendarOutline, phonePortraitOutline } from "ionicons/icons"

const articles = ref([])
const loading = ref(true)
const error = ref(null)
const hasFetched = ref(false)

// Mapping des catégories connues (slug renvoyé par l'API)
const categoryMap = {
  0: { label: "Général", icon: helpCircleOutline },
  1: { label: "Homélie", icon: documentTextOutline },
  2: { label: "Agenda", icon: calendarOutline },
  3: { label: "Actus de l'appli", icon: phonePortraitOutline },
}

function getCategory(slug) {
  return categoryMap[slug] ?? categoryMap[0]
}

function getCategoryIcon(slug) {
  return getCategory(slug).icon
}

function getCategoryLabel(slug) {
  return getCategory(slug).label
}

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

async function fetchArticles() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch("https://api.ecof.app/news")
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    articles.value = await res.json()
    hasFetched.value = true
  } catch (err) {
    console.error(err.message)
    error.value = true
  } finally {
    loading.value = false
  }
}

onIonViewWillEnter(() => {
  if (!hasFetched.value) fetchArticles()
})
</script>

<style scoped>
.news-list {
  padding: 12px 12px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.news-card {
  margin: 0;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.news-card ion-card-content {
  padding: 14px 16px;
}

.card-body {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.category-icon-wrap {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(var(--ion-color-primary-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-icon-wrap ion-icon {
  font-size: 20px;
  color: var(--ion-color-primary-shade);
}

.card-main {
  flex: 1;
  min-width: 0;
}

.badges-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.category-badge {
  --background: rgba(var(--ion-color-primary-rgb), 0.12);
  --color: var(--ion-color-primary-shade);
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 0.02em;
  border-radius: 6px;
  padding: 4px 8px;
}

.new-badge {
  --background: #fff2cc;
  --color: #8a6d00;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 6px;
  padding: 4px 8px;
}

.article-title {
  font-size: 15px;
  line-height: 1.3;
  font-weight: 600;
  color: var(--ion-color-dark, #1a1a1a);
  margin: 0 0 4px;
  white-space: normal;
  overflow-wrap: break-word;
}

.article-meta {
  margin: 0;
  font-size: 0.85em;
  opacity: 0.7;
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
