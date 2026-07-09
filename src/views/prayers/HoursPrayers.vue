<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/prayers"></ion-back-button>
        </ion-buttons>
        <ion-title>Office des Heures</ion-title>
      </ion-toolbar>

      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button :disabled="!peutReculer" @click="jourPrecedent">
            <ion-icon slot="icon-only" :icon="chevronBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title size="small">{{ libelleJour }}</ion-title>
        <ion-buttons slot="end">
          <ion-button :disabled="!peutAvancer" @click="jourSuivant">
            <ion-icon slot="icon-only" :icon="chevronForward"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item
          button
          v-for="office in OFFICES"
          :key="office.heure"
          :router-link="{ path: office.route, query: { date: fmtISO(jourAffiche) } }"
          router-direction="forward"
          :color="officeEnCours && officeEnCours.heure === office.heure ? 'light' : undefined"
          detail
        >
          <ion-label>
            <h2>{{ office.titre }}</h2>
            <p>{{ office.sous }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed, ref } from "vue"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon, IonButton } from "@ionic/vue"
import { chevronBack, chevronForward } from "ionicons/icons"

const OFFICES = [
  { heure: 0, titre: "Nocturnes", sous: "A la 6ème heure de la nuit (environ minuit)", route: "/prayers/hours/vigils" },
  { heure: 3, titre: "Laudes", sous: "Au lever du soleil, à la 9ème heure de la nuit (environ 3h)", route: "/prayers/hours/lauds" },
  { heure: 6, titre: "Prime", sous: "A la 1ère heure du jour (environ 6h)", route: "/prayers/hours/prime" },
  { heure: 9, titre: "Tierce", sous: "A la 3ème heure du jour (environ 9h)", route: "/prayers/hours/tierce" },
  { heure: 12, titre: "Sexte", sous: "A la 6ème heure du jour (environ midi)", route: "/prayers/hours/sext" },
  { heure: 15, titre: "None", sous: "A la 9ème heure du jour (environ 15h)", route: "/prayers/hours/none" },
  { heure: 18, titre: "Vêpres", sous: "Au coucher du soleil (environ 18h)", route: "/prayers/hours/vespers" },
  { heure: 21, titre: "Complies", sous: "A la 3ème heure de la nuit (environ 21h)", route: "/prayers/hours/compline" },
]

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function startOfDay(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function fmtISO(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function estAujourdhui(d) {
  return startOfDay(d).getTime() === startOfDay(new Date()).getTime()
}

// ── Navigation jour précédent / suivant, bornée à -1 / +1 ──
const aujourdhui = startOfDay(new Date())

const bordureMin = (() => {
  const d = new Date(aujourdhui)
  d.setDate(d.getDate() - 1)
  return d
})()

const bordureMax = (() => {
  const d = new Date(aujourdhui)
  d.setDate(d.getDate() + 1)
  return d
})()

const jourAffiche = ref(new Date(aujourdhui))

const peutReculer = computed(() => jourAffiche.value.getTime() > bordureMin.getTime())
const peutAvancer = computed(() => jourAffiche.value.getTime() < bordureMax.getTime())

function jourPrecedent() {
  if (!peutReculer.value) return
  const d = new Date(jourAffiche.value)
  d.setDate(d.getDate() - 1)
  jourAffiche.value = d
}

function jourSuivant() {
  if (!peutAvancer.value) return
  const d = new Date(jourAffiche.value)
  d.setDate(d.getDate() + 1)
  jourAffiche.value = d
}

const libelleJour = computed(() => {
  const d = jourAffiche.value
  if (estAujourdhui(d)) return "Aujourd'hui"
  return `${capitalize(JOURS[d.getDay()])} ${d.getDate()} ${MOIS[d.getMonth()]}`
})

// ── Office en cours (uniquement si on regarde aujourd'hui) ──
const officeEnCours = computed(() => {
  if (!estAujourdhui(jourAffiche.value)) return null
  const h = new Date().getHours()
  let courant = OFFICES[0]
  for (const o of OFFICES) {
    if (h >= o.heure) courant = o
  }
  return courant
})
</script>
