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
      <div class="timeline">
        <template v-for="(slot, i) in slotsAffiches" :key="slot.uid">
          <!-- Bandeau de jour : affiché quand la date change (ou en tête de liste) -->
          <div v-if="i === 0 || slot.dateObj.toDateString() !== slotsAffiches[i - 1].dateObj.toDateString()" class="day-sep">
            <span class="day-sep-text">{{ fmtDate(slot.dateObj) }}</span>
          </div>

          <div class="scale" :class="{ 'scale-active': i === nbPasses }">
            <div class="ruler">
              <div class="ruler-inner">
                <div v-for="offset in [0, 1, 2]" :key="offset" class="r-tick" :style="{ top: offset * 36 + 'px' }">
                  <span class="r-label" :class="{ major: offset === 0 }"> {{ (slot.debut + offset) % 24 }}h </span>
                  <span class="r-dash" :class="offset === 0 ? 'major' : 'minor'"></span>
                </div>
              </div>
            </div>

            <div class="content-col">
              <div
                class="prayer-block"
                :class="{ active: i === nbPasses, disabled: slot.disabled }"
                @click="!slot.disabled && $router.push({ path: slot.route, query: { date: fmtISO(slot.dateObj) } })"
              >
                <div class="prayer-inner">
                  <div class="prayer-titre">
                    <span v-if="i === nbPasses" class="cur-dot" aria-label="En cours" />
                    {{ slot.titre }}
                  </div>
                  <div class="prayer-sous">{{ slot.sous }}</div>
                </div>
                <ion-icon :icon="chevronForward" class="chevron-nav" aria-hidden="true" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed } from "vue"
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonIcon } from "@ionic/vue"
import { chevronForward } from "ionicons/icons"

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]

function fmtDate(d) {
  return `${JOURS[d.getDay()]} ${d.getDate()} ${MOIS[d.getMonth()]}`
}

function fmtISO(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

const maintenant = new Date()

const OFFICES = [
  { debut: 18, titre: "Vêpres", sous: "Au coucher du soleil (environ 18h)", route: "/prayers/hours/vespers", disabled: false },
  { debut: 21, titre: "Complies", sous: "A la 3ème heure de la nuit (environ 21h)", route: "/prayers/hours/compline", disabled: false },
  { debut: 0, titre: "Nocturnes", sous: "A la 6ème heure de la nuit (environ minuit)", route: "/prayers/hours/vigils", disabled: false },
  { debut: 3, titre: "Laudes", sous: "Au lever du soleil, à la 9ème heure de la nuit (environ 3h)", route: "/prayers/hours/lauds", disabled: false },
  { debut: 6, titre: "Prime", sous: "A la 1ère heure du jour (environ 6h)", route: "/prayers/hours/prime", disabled: false },
  { debut: 9, titre: "Tierce", sous: "A la 3ème heure du jour (environ 9h)", route: "/prayers/hours/tierce", disabled: false },
  { debut: 12, titre: "Sexte", sous: "A la 6ème heure du jour (environ midi)", route: "/prayers/hours/sext", disabled: false },
  { debut: 15, titre: "None", sous: "A la 9ème heure du jour (environ 15h)", route: "/prayers/hours/none", disabled: false },
]

function buildSlots(nbCycles = 3) {
  const result = []
  const h = maintenant.getHours()
  const base = new Date(maintenant)
  if (h < 18) base.setDate(base.getDate() - 1)

  // Démarre à cycle -1 pour avoir toujours 2 offices passés disponibles
  for (let cycle = -1; cycle < nbCycles; cycle++) {
    OFFICES.forEach((o) => {
      const decalage = o.debut < 18 ? cycle + 1 : cycle
      const date = new Date(base)
      date.setDate(date.getDate() + decalage)
      result.push({ ...o, cycle, dateObj: date, uid: `${cycle}-${o.debut}` })
    })
  }
  return result
}

const tousSlots = buildSlots(3)

const indexEnCours = computed(() => {
  const h = new Date().getHours()
  const idx = tousSlots.findIndex((s) => s.cycle === 0 && h >= s.debut && h < s.debut + 3)
  return idx >= 0 ? idx : tousSlots.findIndex((s) => s.cycle === 0)
})

const debutEnCours = computed(() => tousSlots[indexEnCours.value]?.debut ?? null)

const slotsAffiches = computed(() => {
  const idx = indexEnCours.value
  const start = Math.max(0, idx - 2)
  return tousSlots.slice(start, start + 8)
})

// Toujours 2 blocs passés (cycle -1 garantit qu'ils existent)
const nbPasses = computed(() => 2)
</script>

<style scoped>
.timeline {
  padding-bottom: env(safe-area-inset-bottom);
}

/* ── Séparateur de jour ── */
.day-sep {
  padding: 12px 14px 14px 14px;
  background: var(--ion-color-step-50);
  border-top: 2px solid var(--ion-color-primary);
  border-bottom: 0.5px solid var(--ion-color-step-150);
}

.day-sep:first-child {
  border-top: none;
}

.day-sep-text {
  font-size: 15px;
  font-weight: 600;
  color: var(--ion-color-primary);
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

/* ── Ligne scale ── */
.scale {
  display: flex;
  border-bottom: 1.5px solid var(--ion-color-step-300);
}

/* ── Réglette ── */
.ruler {
  width: 52px;
  flex-shrink: 0;
  position: relative;
  background: var(--ion-color-step-50);
}

.scale-active .ruler {
  background: transparent;
}

.ruler-inner {
  position: relative;
  height: 108px;
}

.r-tick {
  position: absolute;
  right: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  transform: translateY(-50%);
}

.r-label {
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  color: var(--ion-color-medium);
  line-height: 1;
}

.r-label.major {
  font-size: 12px;
  font-weight: 500;
  color: var(--ion-color-dark);
}

.r-dash {
  flex-shrink: 0;
  height: 1.5px;
  border-radius: 1px;
  background: var(--ion-color-step-300);
}
.r-dash.major {
  width: 10px;
  background: var(--ion-color-step-500);
}
.r-dash.minor {
  width: 6px;
}

/* ── Contenu ── */
.content-col {
  flex: 1;
  border-left: 1.5px solid var(--ion-color-step-200);
}

.prayer-block {
  height: 108px;
  display: flex;
  align-items: flex-start;
  padding-top: 14px;
  cursor: pointer;
  box-sizing: border-box;
}

.scale.scale-active {
  background: color-mix(in srgb, var(--ion-color-primary) 16%, transparent);
}

.prayer-block.disabled {
  cursor: default;
  pointer-events: none;
}

.prayer-inner {
  flex: 1;
  padding: 0 8px 0 14px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.prayer-titre {
  font-size: 15px;
  font-weight: 500;
  color: var(--ion-text-color);
  display: flex;
  align-items: center;
  gap: 7px;
}

.cur-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ion-color-primary);
  flex-shrink: 0;
}

.prayer-sous {
  font-size: 12px;
  color: var(--ion-color-medium);
}

.chevron-nav {
  font-size: 16px;
  color: var(--ion-color-medium);
  margin-right: 12px;
  flex-shrink: 0;
}
</style>
