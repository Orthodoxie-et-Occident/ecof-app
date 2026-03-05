<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/paroisses"></ion-back-button>
        </ion-buttons>
        <ion-title>Horaires</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div v-if="loading" class="state-container">
        <ion-spinner color="primary"></ion-spinner>
        <p>Chargement...</p>
      </div>

      <div v-else-if="error" class="state-container">
        <p class="error-text">{{ error }}</p>
      </div>

      <div v-else-if="events.length === 0" class="state-container">
        <p>Aucun événement à venir</p>
      </div>

      <div v-else class="events-wrapper">
        <div v-for="(group, date) in groupedEvents" :key="date" class="day-group">
          <!-- Séparateur de date -->
          <div class="day-header">
            <span class="day-name">{{ getDayName(date) }}</span>
            <span class="day-date">{{ getFullDate(date) }}</span>
          </div>

          <!-- Events du jour -->
          <div v-for="event in group" :key="event.uid" class="event-row">
            <div class="event-time">
              <span>{{ formatTime(event.start) }}</span>
              <span class="time-end">{{ formatTime(event.end) }}</span>
            </div>
            <div class="event-content">
              <p class="event-title">{{ event.title }}</p>
              <p v-if="event.location" class="event-meta">{{ event.location }}</p>
              <p v-if="event.description" class="event-desc">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonSpinner } from "@ionic/vue"

const route = useRoute()
const events = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(fetchEvents)

async function fetchEvents() {
  try {
    loading.value = true
    error.value = null
    const parishId = route.params.id
    const response = await fetch(`https://ecof-api-production.up.railway.app/api/parish/${parishId}`)
    if (!response.ok) throw new Error("Impossible de récupérer les événements")
    const data = await response.json()
    events.value = (data.events || []).sort((a, b) => new Date(a.start) - new Date(b.start))
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const groupedEvents = computed(() =>
  events.value.reduce((acc, event) => {
    const key = new Date(event.start).toISOString().split("T")[0]
    if (!acc[key]) acc[key] = []
    acc[key].push(event)
    return acc
  }, {}),
)

const getDayName = (dateStr) => new Date(dateStr).toLocaleDateString("fr-FR", { weekday: "long" })

const getFullDate = (dateStr) => new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })

const formatTime = (dateString) => new Date(dateString).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
</script>

<style scoped>
ion-content {
  --background: #ffffff;
}

.events-wrapper {
  padding: 8px 0 40px;
}

/* ── Header de date ── */
.day-header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 20px 16px 8px;
  border-bottom: 1px solid #eee;
}

.day-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--ion-color-primary);
  text-transform: capitalize;
}

.day-date {
  font-size: 0.8rem;
  color: #999;
  text-transform: capitalize;
}

/* ── Ligne d'événement ── */
.event-row {
  display: flex;
  gap: 16px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

/* ── Colonne heure ── */
.event-time {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 46px;
  padding-top: 2px;
  gap: 2px;
  flex-shrink: 0;
}

.event-time span {
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
}

.time-end {
  font-weight: 400 !important;
  color: #bbb !important;
}

/* ── Contenu ── */
.event-content {
  flex: 1;
}

.event-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0 0 4px;
}

.event-meta {
  font-size: 0.78rem;
  color: #999;
  margin: 0 0 4px;
}

.event-desc {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

/* ── États ── */
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

.error-text {
  color: var(--ion-color-danger);
}
</style>
