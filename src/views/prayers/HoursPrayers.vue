<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/prayers"></ion-back-button>
        </ion-buttons>
        <ion-title>Office des Heures</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="ion-padding">
        <ion-list>
          <ion-item
            button
            v-for="office in OFFICES"
            :key="office.heure"
            :router-link="{ path: office.route, query: { date: fmtISO(aujourdhui) } }"
            router-direction="forward"
            :color="officeEnCours && officeEnCours.heure === office.heure ? 'light' : undefined"
            detail
          >
            <ion-label>
              <h2>{{ office.titre }}</h2>
              <p>{{ office.sous }}</p>
              <p class="note-heure">{{ office.note }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed } from "vue"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel } from "@ionic/vue"

const OFFICES = [
  { heure: 0, titre: "Nocturnes", sous: "A la 6ème heure de la nuit", note: "Environ minuit", route: "/prayers/hours/vigils" },
  { heure: 3, titre: "Laudes", sous: "Au lever du soleil", note: "Environ 3h", route: "/prayers/hours/lauds" },
  { heure: 6, titre: "Prime", sous: "A la 1ère heure du jour", note: "Environ 6h", route: "/prayers/hours/prime" },
  { heure: 9, titre: "Tierce", sous: "A la 3ème heure du jour", note: "Environ 9h", route: "/prayers/hours/tierce" },
  { heure: 12, titre: "Sexte", sous: "A la 6ème heure du jour", note: "Environ midi", route: "/prayers/hours/sext" },
  { heure: 15, titre: "None", sous: "A la 9ème heure du jour", note: "Environ 15h", route: "/prayers/hours/none" },
  { heure: 18, titre: "Vêpres", sous: "Au coucher du soleil", note: "Environ 18h", route: "/prayers/hours/vespers" },
  { heure: 21, titre: "Complies", sous: "A la 3ème heure de la nuit", note: "Environ 21h", route: "/prayers/hours/compline" },
]

function fmtISO(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

// ── Jour actuel, figé au chargement du composant ──
const aujourdhui = new Date()

// ── Office en cours ──
const officeEnCours = computed(() => {
  const h = new Date().getHours()
  let courant = OFFICES[0]
  for (const o of OFFICES) {
    if (h >= o.heure) courant = o
  }
  return courant
})
</script>

<style scoped>
.note-heure {
  font-size: 0.8em;
  font-style: italic;
  opacity: 0.6;
}
</style>
