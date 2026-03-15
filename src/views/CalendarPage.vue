<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Calendrier</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item lines="none" class="date-item">
        <ion-icon :icon="calendarOutline" slot="start" color="medium"></ion-icon>
        <ion-label color="medium">{{ formattedDate }}</ion-label>
        <ion-datetime-button datetime="datetime" slot="end"></ion-datetime-button>
      </ion-item>

      <ion-modal :keep-contents-mounted="true" ref="modal">
        <ion-datetime
          id="datetime"
          presentation="date"
          :value="selectedDate"
          @ionChange="handleDateChange"
          locale="fr-FR"
          :first-day-of-week="1"
          :format-options="{
            date: { day: '2-digit', month: '2-digit', year: 'numeric' },
          }"
        ></ion-datetime>
      </ion-modal>

      <!-- Chargement -->
      <div v-if="loading" class="ion-text-center ion-padding">
        <ion-spinner></ion-spinner>
      </div>

      <!-- Erreur -->
      <ion-item v-if="error" color="danger">
        <ion-label class="ion-text-wrap">{{ error }}</ion-label>
      </ion-item>

      <!-- Saints du jour -->
      <div v-if="!loading && calendarData" class="section">
        <h3 class="section-title">Saints du jour</h3>
        <ion-list>
          <ion-item v-for="saint in calendarData.synaxar" :key="saint.id" button detail @click="navigateToSaint(saint.id)">
            <ion-label>
              <h2>{{ saint.prefixe }} {{ saint.saint }}</h2>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>

      <!-- Lectures du jour -->
      <div v-if="!loading && calendarData && hasReadings" class="section">
        <h3 class="section-title">Lectures du jour</h3>

        <div v-if="calendarData.readings.temporal.length > 0">
          <h4 class="subsection-title">Temporal</h4>
          <ion-list>
            <ion-item v-for="reading in calendarData.readings.temporal" :key="reading.id" button detail @click="navigateToReading(reading.id)">
              <ion-label>{{ reading.book_txt }}</ion-label>
            </ion-item>
          </ion-list>
        </div>

        <div v-if="calendarData.readings.sanctoral.length > 0">
          <h4 class="subsection-title">Sanctoral</h4>
          <ion-list>
            <ion-item v-for="reading in calendarData.readings.sanctoral" :key="reading.id" button detail @click="navigateToReading(reading.id)">
              <ion-label>{{ reading.book_txt }}</ion-label>
            </ion-item>
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonDatetime, IonDatetimeButton, IonModal, IonList, IonItem, IonLabel, IonSpinner, IonIcon } from "@ionic/vue"
import { calendarOutline } from "ionicons/icons"
import { ref, computed, watch, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const modal = ref()
const toLocalISO = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T00:00:00`
}
const selectedDate = ref(toLocalISO())
const calendarData = ref(null)
const loading = ref(false)
const error = ref(null)

const formattedDate = computed(() => {
  if (!selectedDate.value) return ""
  const str = new Date(selectedDate.value).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  })
  return str.charAt(0).toUpperCase() + str.slice(1)
})

const dateParam = computed(() => {
  if (!selectedDate.value) return ""
  const d = new Date(selectedDate.value)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
})

const hasReadings = computed(() => {
  if (!calendarData.value) return false
  return calendarData.value.readings.temporal.length > 0 || calendarData.value.readings.sanctoral.length > 0
})

const fetchCalendarData = async () => {
  if (!dateParam.value) return
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`https://ecof-api-production.up.railway.app/api/calendar/${dateParam.value}`)
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)
    calendarData.value = await response.json()
  } catch (err) {
    error.value = `Erreur lors du chargement des données: ${err.message}`
    console.error("Erreur:", err)
  } finally {
    loading.value = false
  }
}

const navigateToSaint = (id) => router.push(`/saint/${id}`)
const navigateToReading = (id) => router.push(`/reading/${id}`)
const handleDateChange = (event) => {
  const [date] = event.detail.value.split("T")
  selectedDate.value = `${date}T00:00:00`
  modal.value.$el.dismiss()
}

onMounted(fetchCalendarData)
watch(dateParam, fetchCalendarData)
</script>

<style scoped>
.date-item {
  --border-radius: 10px;
  margin-bottom: 8px;
}

.section {
  margin-top: 30px;
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--ion-color-primary);
  margin-bottom: 15px;
  padding-left: 16px;
}

.subsection-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ion-color-medium-shade);
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 16px;
}

ion-list {
  background: transparent;
}

ion-item {
  --padding-start: 16px;
  --inner-padding-end: 16px;
  margin-bottom: 8px;
}
</style>
