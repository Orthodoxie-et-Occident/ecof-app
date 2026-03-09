<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Paroisses</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <template v-for="(paroisses, departement) in paroissesByDept" :key="departement">
        <ion-list-header>
          <ion-label
            ><h2>{{ departement }}</h2></ion-label
          >
        </ion-list-header>
        <ion-list>
          <ion-item button v-for="p in paroisses" :key="p.id" @click="showEvents(p.id, p.nom)">
            <ion-thumbnail slot="start">
              <img :src="p.img" :alt="p.nom" />
            </ion-thumbnail>
            <ion-label>
              <h2>{{ p.nom }}</h2>
              <p>{{ p.ville }}</p>
            </ion-label>
            <ion-icon :icon="chevronForward" slot="end"></ion-icon>
          </ion-item>
        </ion-list>
      </template>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { useRouter } from "vue-router"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonThumbnail, IonLabel, IonIcon } from "@ionic/vue"
import { chevronForward } from "ionicons/icons"

import bordeauxImg from "@/assets/img/parishes/bordeaux.png"
import montpellierImg from "@/assets/img/parishes/montpellier.png"
import amboiseImg from "@/assets/img/parishes/amboise.png"
import grenobleImg from "@/assets/img/parishes/grenoble.png"
import nantesImg from "@/assets/img/parishes/nantes.png"
import orleansImg from "@/assets/img/parishes/orleans.png"
import stloupImg from "@/assets/img/parishes/st-loup.png"
import angersImg from "@/assets/img/parishes/angers.png"
import vannesImg from "@/assets/img/parishes/vannes.png"
import lyonImg from "@/assets/img/parishes/lyon.png"
import parisImg from "@/assets/img/parishes/paris.png"
import poitiersImg from "@/assets/img/parishes/poitiers.png"
import lisieuxImg from "@/assets/img/parishes/lisieux.png"

const router = useRouter()

const paroissesByDept = {
  "14 - Calvados": [{ id: "lisieux", nom: "Paroisse Notre-Dame en Normandie", ville: "Le Mesnil-Germain", img: lisieuxImg }],
  "33 - Gironde": [{ id: "bordeaux", nom: "Paroisse de l'Exaltation de la Sainte Croix et Saint-Paulin de Nole", ville: "Bordeaux", img: bordeauxImg }],
  "34 - Hérault": [{ id: "montpellier", nom: "Paroisse de la Théophanie", ville: "Montpellier", img: montpellierImg }],
  "37 - Indre-et-Loire": [{ id: "amboise", nom: "Paroisse du Moutier Saint-Martin", ville: "Amboise", img: amboiseImg }],
  "38 - Isère": [{ id: "grenoble", nom: "Paroisse de la Résurrection", ville: "Grenoble", img: grenobleImg }],
  "44 - Loire-Atlantique": [{ id: "nantes", nom: "Paroisse de la Trinité et Saint-Clair", ville: "Nantes", img: nantesImg }],
  "45 - Loiret": [
    { id: "orleans", nom: "Paroisse Saint-Avit", ville: "Orléans", img: orleansImg },
    { id: "stloup", nom: "Chapelle Saint-Loup de Sens et Sainte-Radegonde", ville: "Saint-Loup-des-Vignes", img: stloupImg },
  ],
  "49 - Maine-et-Loire": [{ id: "angers", nom: "Paroisse Saint-Martin d'Anjou", ville: "Angers", img: angersImg }],
  "56 - Morbihan": [{ id: "vannes", nom: "Chapelle Saint-Martin du Moustoir", ville: "Vannes", img: vannesImg }],
  "69 - Rhône": [{ id: "lyon", nom: "Paroisse Sainte-Marie et Saint-Jean", ville: "Lyon", img: lyonImg }],
  "75 - Paris": [{ id: "paris", nom: "Cathédrale Saint Irénée", ville: "Paris", img: parisImg }],
  "86 - Vienne": [{ id: "poitiers", nom: "Paroisse Saint-Savin et Saint-Cyprien", ville: "Poitiers", img: poitiersImg }],
}

const showEvents = (id, nom) => {
  router.push({ path: `/paroisse/${id}/horaires`, query: { nom } })
}
</script>

<style scoped>
ion-list-header {
  padding-top: 20px;
}

ion-thumbnail {
  --size: 80px;
  --border-radius: 5px;
}

ion-thumbnail img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

ion-list-header h2 {
  font-weight: 600;
  color: var(--ion-color-primary);
}
</style>
