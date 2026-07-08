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
      <h1>{{ titreOffice }}</h1>
      <ion-toggle v-model="withPriest" label-placement="start">Avec prêtre</ion-toggle><br /><br />

      <h2>Préparation</h2>
      <div v-html="withPriest ? preparationWithPriest : preparationWithoutPriest"></div>

      <h2>Ouverture</h2>
      <p><em>Face au sanctuaire, le préchantre chante :</em></p>
      <p>V : Ô Dieu, viens a mon aide.</p>
      <p>R : Seigneur, hâte toi de me secourir.</p>
      <p>V : Gloire au Père et au Fils et au Saint-Esprit,</p>
      <p>R : Comme il était au commencement et maintenant et toujours, et aux siècles des siècles. Amen.</p>

      <h2>Psalmodie</h2>
      <h3>Antienne</h3>
      <p>Aie pitié de moi, Seigneur, exauce ma prière.</p>
      <h3>Psaume 4</h3>
      <h3>Psaume 91</h3>
      <h3>Psaume 134</h3>
      <h3>Antienne</h3>
      <p>Aie pitié de moi, Seigneur, exauce ma prière.</p>

      <h2>Hymne</h2>
      <h2>Répons bref</h2>
      <h2>Capitule</h2>
      <h2>Répons long</h2>
      <h2>Nunc Dimittis</h2>
      <h2>Trisagion</h2>
      <h2>Notre-Père</h2>

      <h2>Clôture</h2>
      <div v-html="withPriest ? closingWithPriest : closingWithoutPriest"></div>

      <h2>Hymne a la Vierge</h2>
      <p>Salut Marie, pleine de grâce, le Seigneur est avec Toi, Tu es bénie parmi toutes les femmes et Jésus, le fruit de Tes entrailles est béni.</p>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import { IonPage, IonHeader, IonButtons, IonBackButton, IonToolbar, IonTitle, IonContent, IonToggle } from "@ionic/vue"

const withPriest = ref(false)

const preparationWithPriest = `
<p>Lecteur : Mon père, veuille me bénir.</p>
<p>Prêtre : + Que le Dieu Tout-Puissant nous accorde une nuit tranquille et une fin heureuse.</p>
<p>R : Amen.</p>
<h3>Leçon brève</h3>
<p>V : Mes frères, soyez sobres et vigilants, car votre adversaire le diable rôde autour de vous comme un lion rugissant, cherchant qui il pourra dévorer. Résistez-lui en étant forts dans la foi.</p>
<p><em>Il s'incline :</em> Et Toi, Seigneur, aie pitié de moi.</p>
<p>R : Rendons grâces à Dieu.</p>
<h3>Confession</h3>
`

const preparationWithoutPriest = `
<p>Lecteur : Que le Dieu Tout-Puissant nous accorde une nuit tranquille et une fin heureuse.</p>
<p>R : Amen.</p>
<h3>Leçon brève</h3>
<p>V : Mes frères, soyez sobres et vigilants, car votre adversaire le diable rôde autour de vous comme un lion rugissant, cherchant qui il pourra dévorer. Résistez-lui en étant forts dans la foi.</p>
<p><em>Il s'incline :</em> Et Toi, Seigneur, aie pitié de moi.</p>
<p>R : Rendons grâces à Dieu.</p>
<h3>Confession</h3>

<p>V : + Notre secours soit au nom du Seigneur,</p>
<p>R : Qui a fait le ciel et la terre.</p>
<p>Tous : Je confesse devant la Face du Seigneur très clément, devant la bienheureuse Marie toujours Vierge, Mère de Dieu, saint Michel Archange, saint Jean-Baptiste, les saints NN..., tous les saints, et devant vous mes frères et soeurs, que j'ai beaucoup péché par pensées, par paroles, par actions, par omissions, consciemment et inconsciemment, volontairement et involontairement.</p>
<p><em>On se frappe trois fois la poitrine :</em></p>
<p>Aie pitié de moi, Seigneur. Aie pitié de moi, Seigneur. Aie pitié de moi, Seigneur, selon Ta grande miséricorde ! C'est pourquoi je supplie la bienheureuse Marie toujours Vierge, Mère de Dieu, saint Michel Archange, saint Jean-Baptiste, les saints Apôtres Pierre, Paul, Jean, Jacques, les saints NN..., tous les saints et vous mes frères et soeurs, de prier pour moi le Seigneur notre Dieu. Que le Dieu Tout-Puissant aie pitié de nous, qu'Il nous pardonne nos péchés et nous conduise à la vie éternelle. Amen.</p>
<p>V : Convertis-nous, ô Dieu Qui est notre salut !</p>
<p>R : Et détourne de nous Ta colère.</p>
`
const closingWithPriest = `
<p>P : Le Seigneur soit toujours avec vous.</p>
<p>R : Et avec ton esprit.</p>
<p>P : Bénissons le Seigneur.</p>
<p>R : Rendons grâces à Dieu.</p>
<p>P : Que les âmes des fidèles défunts, par la miséricorde de Dieu, reposent en paix.</p>
<p>R : Amen.</p>
<p>P : Que le Seigneur Tout-Puissant et miséricordieux, + Père, Fils et Saint-Esprit, vous bénisse et vous garde.</p>
<p>R : Amen.</p>
`

const closingWithoutPriest = `
<p>V : Seigneur, écoute ma prière,</p>
<p>R : Et que mon cri parvienne jusqu'à Toi.</p>
<p>V : Bénissons le Seigneur.</p>
<p>R : Rendons grâces à Dieu.</p>
<p>V : Que les âmes des fidèles défunts, par la miséricorde de Dieu, reposent en paix.</p>
<p>R : Amen.</p>
<p>V : Que le Seigneur Tout-Puissant et miséricordieux (+), Père, Fils et Saint-Esprit, nous bénisse et nous garde.</p>
<p>R : Amen.</p>
`

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]

const route = useRoute()

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
  return `Office de Complies (célébré le ${nomSoir} soir)`
})
</script>

<style scoped>
h2 {
  text-align: center;
  text-transform: uppercase;
  border: 1px solid var(--ion-color-primary, #333);
  border-radius: 4px;
  padding: 8px 16px;
  margin: 24px 0 12px;
}
</style>
