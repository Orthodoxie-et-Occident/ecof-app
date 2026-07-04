<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/prayers/hours"></ion-back-button>
        </ion-buttons>
        <ion-title>Complies</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h1 class="office-titre">{{ titreOffice }}</h1>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { IonPage, IonHeader, IonButtons, IonBackButton, IonToolbar, IonTitle, IonContent } from "@ionic/vue"

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]

const route = useRoute()

// Parse "YYYY-MM-DD" en date locale (évite le décalage UTC de new Date("YYYY-MM-DD"))
function parseISO(str) {
  const [y, m, d] = str.split("-").map(Number)
  return new Date(y, m - 1, d)
}

const jourSoir = computed(() => {
  return route.query.date ? parseISO(route.query.date) : new Date()
})

const jourLiturgique = computed(() => {
  const d = new Date(jourSoir.value)
  d.setDate(d.getDate() + 1)
  return d
})

const titreOffice = computed(() => {
  const nomLiturgique = JOURS[jourLiturgique.value.getDay()]
  const nomSoir = JOURS[jourSoir.value.getDay()]
  return `Office de Complies du ${nomLiturgique} (célébré le ${nomSoir} soir)`
})
</script>

<style scoped>
.office-titre {
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  margin: 16px 0 4px;
}
</style>
