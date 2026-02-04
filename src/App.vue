<template>
  <ion-app>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item button @click="navigateTo('paroisses')">
            <ion-label>Paroisses</ion-label>
            <ion-icon slot="end" :src="churchIcon"></ion-icon>
          </ion-item>

          <ion-item button @click="navigateTo('calendar')">
            <ion-label>Calendrier</ion-label>
            <ion-icon slot="end" :src="calendarIcon"></ion-icon>
          </ion-item>

          <ion-item button @click="navigateTo('map')">
            <ion-label>Carte</ion-label>
            <ion-icon slot="end" :src="mapIcon"></ion-icon>
          </ion-item>

          <ion-item button @click="navigateTo('prayers')">
            <ion-label>Prières</ion-label>
            <ion-icon slot="end" :src="prayersIcon"></ion-icon>
          </ion-item>

          <ion-item button @click="navigateTo('synaxar')">
            <ion-label>Synaxaire</ion-label>
            <ion-icon slot="end" :src="synaxarIcon"></ion-icon>
          </ion-item>

          <ion-item button @click="navigateTo('about')">
            <ion-label>À propos</ion-label>
            <ion-icon slot="end" :src="aboutIcon"></ion-icon>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

<script setup>
import { 
  IonApp, 
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  menuController
} from '@ionic/vue';
import { useRouter } from 'vue-router';

import churchIcon from '@/assets/icons/church.svg';
import calendarIcon from '@/assets/icons/calendar-days.svg';
import mapIcon from '@/assets/icons/map-pin.svg';
import prayersIcon from '@/assets/icons/book-marked.svg';
import synaxarIcon from '@/assets/icons/book-a.svg';
import aboutIcon from '@/assets/icons/info.svg';

const router = useRouter();

const navigateTo = async (routePath) => {
  await menuController.close();
  router.push(`/${routePath}`);
};
</script>