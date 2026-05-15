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
          <ion-menu-toggle auto-hide="false" v-for="item in menuItems" :key="item.route">
            <ion-item button :router-link="item.route" router-direction="root">
              <ion-label>{{ item.label }}</ion-label>
              <img slot="start" :src="item.image" :alt="item.label" class="menu-img" />
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

<script setup>
import { onMounted } from "vue"
import { IonApp, IonRouterOutlet, IonMenu, IonMenuToggle, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, useBackButton, useIonRouter } from "@ionic/vue"
import { App } from "@capacitor/app"
import { Capacitor } from "@capacitor/core"
import { checkUpdate } from "@/services/appUpdate"

import synaxarImage from "@/assets/img/layout/saints.png"
import parishImage from "@/assets/img/layout/ange.png"
import newsImage from "@/assets/img/layout/ange-b.png"
import aboutImage from "@/assets/img/layout/about.png"
import prayerImage from "@/assets/img/layout/seraphim.png"
import mapImage from "@/assets/img/layout/pins.png"
import calendarImage from "@/assets/img/layout/christ.png"

const menuItems = [
  { label: "Paroisses", route: "/", image: parishImage },
  { label: "Calendrier", route: "/calendar", image: calendarImage },
  { label: "Annonces", route: "/news", image: newsImage },
  { label: "Prières", route: "/prayers", image: prayerImage },
  { label: "Synaxaire", route: "/synaxar", image: synaxarImage },
  { label: "Carte", route: "/map", image: mapImage },
  { label: "À propos", route: "/about", image: aboutImage },
]

const ionRouter = useIonRouter()

useBackButton(10, () => {
  const path = ionRouter.route?.value?.path || window.location.pathname

  // 1. EXIT UNIQUEMENT SUR HOME
  if (path === "/") {
    App.exitApp()
    return
  }

  // 2. BACK IONIC PROPRE
  if (ionRouter.canGoBack()) {
    ionRouter.back()
    return
  }

  // 3. FALLBACK SAFE (évite blocage)
  ionRouter.push("/")
})

onMounted(async () => {
  if (Capacitor.isNativePlatform()) {
    await checkUpdate()
  }
})
</script>

<style scoped>
ion-menu ion-item {
  --min-height: 80px;
}

.menu-img {
  height: 70px;
  width: 70px;
  object-fit: contain;
  object-position: center;
}
</style>
