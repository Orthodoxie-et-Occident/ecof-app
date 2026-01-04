<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Carte</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <h1>Carte des lieux de culte</h1>
      
      <!-- Carte uMap -->
      <div class="map-container">
        <iframe
          :src="umapUrl"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonMenuButton, 
  IonTitle, 
  IonContent 
} from '@ionic/vue';

// Remplacez par l'URL de votre carte uMap
const umapUrl = 'https://umap.openstreetmap.fr/fr/map/ecof-france_1159509?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&editMode=disabled&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true';
</script>

<style scoped>
.map-container {
  width: 100%;
  height: calc(100vh - 200px);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Pour rendre responsive */
@media (max-width: 768px) {
  .map-container {
    height: calc(100vh - 200px)
  }
}
</style>