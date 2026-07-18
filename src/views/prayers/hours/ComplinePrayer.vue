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

    <ion-content class="ion-padding hours" :class="{ 'is-short': shortVersion }">
      <h1>Complies du {{ jourLiturgiqueNom }}</h1>
      <p class="subtitle">Célébrées le {{ jourSoirNom }} soir</p>
      <ion-toggle v-model="withPriest" label-placement="end">Avec prêtre</ion-toggle><br />
      <ion-toggle v-model="shortVersion" label-placement="end">Office abrégé</ion-toggle><br />

      <div class="hide-on-short">
        <h2>Préparation</h2>
        <div v-html="withPriest ? preparationWithPriest : preparationWithoutPriest"></div>
      </div>

      <h2>Ouverture</h2>
      <p><span class="rubric">Face au sanctuaire, le préchantre chante :</span></p>
      <Score :mei="ouvertureMei" />

      <div class="hide-on-short">
        <h2>Psalmodie</h2>
        <h3>Antienne</h3>
        <p>Aie pitié de moi, Seigneur, exauce ma prière.</p>
        <h3>Psaume 4 (récité sur la note la)</h3>
        <p>- Quand je crie, réponds-moi, Dieu Qui me fais juste ! Quand je suis dans la détresse Tu desserres mon angoisse ! / Aie pitié de moi, exauce ma prière !</p>
        <p>- Fils des hommes, jusques à quand aurez-vous le coeur endurci ? / Jusques à quand aimerez-vous la vanité et chercherez-vous le mensonge ?</p>
        <p>- Sachez donc que le Seigneur S'est choisi un Juste : / Le Seigneur m'entend quand je crie vers Lui.</p>
        <p>- Tremblez et ne péchez plus ; / sur votre couche, méditez dans vos coeurs, puis silence !</p>
        <p>- Offrez de justes sacrifices / et espérez dans le Seigneur.</p>
        <p>- Beaucoup disent : « Qui nous fera voir le bonheur ? » / Fais briller sur nous, Seigneur, la lumière de Ta face.</p>
        <p>- Tu as mis dans mon coeur plus de joie qu'ils n'en ont / quand abondent leur blé et leur vin nouveau.</p>
        <p>- Je me couche et je m'endors en paix / car Toi seul, Seigneur, Tu me donnes la sécurité dans ma demeure.</p>
        <p><span class="rubric">Tous (se levant et s'inclinant) :</span></p>
        <p>- Gloire au Père et au Fils et au Saint-Esprit, / Comme il était au commencement et maintenant et toujours / Et aux siècles des siècles. Amen.</p>
        <h3>Psaume 91 (on hausse la voix d'un ton)</h3>
        <p>- Celui qui demeure à l'abri du Très-Haut / et repose à l'ombre du puissant,</p>
        <p>- Dit au Seigneur : « Mon secours, mon refuge, / mon Dieu en Qui je me confie. »</p>
        <p>- C'est Lui qui te délivrera du filet de l'oiseleur / et de la maladie mortelle.</p>
        <p>- Il te couvrira de ses ailes, et sous son plumage tu trouveras un refuge ; / Sa vérité est un bouclier et une cuirasse.</p>
        <p>- Tu ne craindras ni la terreur de la nuit / ni la flèche qui vole le jour,</p>
        <p>- Ni la peste qui s'avance dans les ténèbres, / ni la ruine qui frappe à midi.</p>
        <p>- Que mille tombent à ton côté et dix mille à ta droite : / rien ne pourra t'atteindre,</p>
        <p>- Mais de tes propres yeux / tu verras le châtiment des pécheurs,</p>
        <p>- Car Toi, Seigneur, Tu es mon refuge, / Ô Très-Haut Tu as établi en moi Ta demeure.</p>
        <p>- Le malheur ne rôdera pas autour de Toi / et le fléau n'approchera pas de ta tente,</p>
        <p>- Car Il ordonnera à Ses anges / de te garder dans toutes tes voies.</p>
        <p>- Dans leurs mains ils te porteront / de peur que ton pied ne heurte une pierre.</p>
        <p>- Tu marcheras sur le lion et sur l'aspic, / tu fouleras le fauve et le dragon.</p>
        <p>- Parce qu'il M'aime, Je le délivrerai. Je serai avec lui dans la détresse / et Je le sauverai et Je le glorifierai.</p>
        <p>- Je le rassasierai de longs jours / et Je lui ferai voir Mon salut.</p>
        <p><span class="rubric">Tous (se levant et s'inclinant) :</span></p>
        <p>- Gloire au Père et au Fils et au Saint-Esprit, / Comme il était au commencement et maintenant et toujours / Et aux siècles des siècles. Amen.</p>
        <h3>Psaume 134 (on hausse la voix d'un ton)</h3>
        <p>- Et maintenant, pendant la nuit, serviteurs du Seigneur, bénissez le Seigneur / vous tous qui veillez dans la Maison du Seigneur.</p>
        <p>- Elevez vos mains vers le Sanctuaire / et bénissez le Seigneur.</p>
        <p>- Le Seigneur te bénira de Sion, / Lui qui a fait le ciel et la terre.</p>
        <p><span class="rubric">Tous (se levant et s'inclinant) :</span></p>
        <p>- Gloire au Père et au Fils et au Saint-Esprit, / Comme il était au commencement et maintenant et toujours / Et aux siècles des siècles. Amen.</p>
        <h3>Antienne</h3>
        <p><span class="rubric">Tous :</span>Aie pitié de moi, Seigneur, exauce ma prière.</p>

        <h2>Hymne</h2>
        <p><span class="rubric">H :</span> Avant que s'achève le jour, Dieu Créateur de l'univers, ensemble nous Te demandons, que Ton amour veille et nous garde.</p>
        <p><span class="rubric">F :</span> Que loin de nous passent les songes et les phantasmes de la nuit. Garde nos coeurs de l'ennemi, afin qu'ils ne soient pas souillés.</p>
        <p><span class="rubric">HF :</span> Exauce-nous, Père très bon, Toi Fils Unique égal au Père, et Toi Esprit consolateur, régnant dans les siècles des siècles. Amen.</p>

        <h2>Répons bref</h2>
        <p><span class="rubric">V :</span> Garde-nous, Seigneur, comme la prunelle de l'oeil.</p>
        <p><span class="rubric">R :</span> Sous l'abri de Tes ailes, protège nous.</p>

        <h2>Capitule</h2>
        <p><span class="rubric">V :</span> Tu es avec nous, Seigneur, et Ton Saint Nom a été invoqué sur nous. Ne nous abandonne pas, ô Seigneur, notre Dieu.</p>
        <p><span class="rubric">R :</span> Rendons grâce à Dieu.</p>
      </div>

      <h2>Répons long</h2>
      <p><span class="rubric">V :</span> Entre Tes mains, Seigneur, je remets mon esprit.</p>
      <p><span class="rubric">R :</span> Entre Tes mains, Seigneur, je remets mon esprit.</p>
      <p><span class="rubric">V :</span> Tu nous a rachetés, Seigneur, Dieu de vérité.</p>
      <p><span class="rubric">R :</span> Entre Tes mains, Seigneur, je remets mon esprit.</p>
      <p><span class="rubric">V :</span> Gloire au Père et au Fils, et au Saint-Esprit.</p>
      <p><span class="rubric">R :</span> Entre Tes mains, Seigneur, je remets mon esprit.</p>

      <h2>Nunc Dimittis</h2>

      <div class="hide-on-short">
        <h3>Antienne</h3>
        <p>Sauve nous, Seigneur, durant la veille, garde nous durant le sommeil, afin que nous puissions veiller avec le Christ, et nous reposer en paix.</p>
      </div>

      <h3>Cantique de Siméon</h3>
      <p><span class="rubric">V :</span> Et maintenant, Seigneur, laisse Ton serviteur,</p>
      <p>
        <span class="rubric">R :</span> Selon Ta parole s'en aller en paix. Parce que mes yeux ont vu le salut qui vient de Toi, que Tu as préparé pour être mis devant tous les peuples, Lumière qui
        doit se révéler aux nations et la gloire de ton peuple, Israël. Gloire au Père et au Fils et au Saint-Esprit, comme il était au commencement et maintenant et toujours et aux siècles des
        siècles. Amen.
      </p>

      <div class="hide-on-short">
        <h3>Antienne</h3>
        <p>Sauve nous, Seigneur, durant la veille, garde nous durant le sommeil, afin que nous puissions veiller avec le Christ, et nous reposer en paix.</p>
      </div>

      <h2>Trisagion</h2>
      <p><span class="rubric">V :</span> Agios o Theos</p>
      <p><span class="rubric">Tous :</span> Agios Ischiros</p>
      <p><span class="rubric">V :</span> Agios Athanatos</p>
      <p><span class="rubric">Tous :</span> Eleison Imas</p>
      <p><span class="rubric">V :</span> Sanctus Deus</p>
      <p><span class="rubric">Tous :</span> Sanctus Fortis</p>
      <p><span class="rubric">V :</span> Sanctus Immortalis</p>
      <p><span class="rubric">Tous :</span> Miserere nobis</p>
      <p><span class="rubric">V :</span> Saint Dieu</p>
      <p><span class="rubric">Tous :</span> Saint Fort</p>
      <p><span class="rubric">V :</span> Saint Immortel</p>
      <p><span class="rubric">Tous :</span> Aie pitié de nous</p>
      <p><span class="rubric">V :</span> Kyrie eleison</p>

      <h2>Notre-Père</h2>
      <div v-html="withPriest ? paterWithPriest : paterWithoutPriest"></div>
      <p>
        <span class="rubric">V :</span> Nous T'en prions, Seigneur, visite cette demeure et éloigne toutes les embûches de l'ennemi ; que Tes saints anges y habitent et nous gardent en paix, et que Ta
        bénédiction soit toujours sur nous, par notre Seigneur Jésus-Christ, Qui vit et règne avec Toi et le Saint-Esprit, aux siècles des siècles.
      </p>
      <p><span class="rubric">R :</span> Amen.</p>

      <h2>Clôture</h2>
      <div v-html="withPriest ? closingWithPriest : closingWithoutPriest"></div>

      <h2>Hymne à la Vierge</h2>
      <p>Salut Marie, pleine de grâce, le Seigneur est avec Toi, Tu es bénie parmi toutes les femmes et Jésus, le fruit de Tes entrailles est béni.</p>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useRoute } from "vue-router"
import { IonPage, IonHeader, IonButtons, IonBackButton, IonToolbar, IonTitle, IonContent, IonToggle } from "@ionic/vue"
import Score from "@/components/Score.vue"
import ouvertureMei from "@/assets/mei/ouverture.mei?raw"

const withPriest = ref(false)
const shortVersion = ref(false)

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]

const route = useRoute()

function parseISO(str) {
  const [y, m, d] = str.split("-").map(Number)
  return new Date(y, m - 1, d)
}

function fmtISO(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

const jourSoir = computed(() => {
  return route.query.date ? parseISO(route.query.date) : new Date()
})

const jourLiturgique = computed(() => {
  const d = new Date(jourSoir.value)
  d.setDate(d.getDate() + 1)
  return d
})

const jourLiturgiqueNom = computed(() => JOURS[jourLiturgique.value.getDay()])
const jourSoirNom = computed(() => JOURS[jourSoir.value.getDay()])

// ── Chargement des saints du jour liturgique ──
const saints = ref([])

async function loadSaints(dateISO) {
  try {
    const res = await fetch(`https://api.ecof.app/synaxar/${dateISO}`)
    if (!res.ok) throw new Error("Erreur de chargement du synaxaire")
    saints.value = await res.json()
  } catch (err) {
    console.error(err)
    saints.value = []
  }
}

const jourLiturgiqueISO = computed(() => fmtISO(jourLiturgique.value))

watch(jourLiturgiqueISO, (dateISO) => loadSaints(dateISO), { immediate: true })

// échapper le HTML pour éviter tout souci d'injection dans le v-html
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

const saintsNamesHtml = computed(() => {
  if (!saints.value.length) return "NN..."
  return saints.value.map((s) => `<span class="saint-name">${escapeHtml(s.saint)}</span>`).join(", ")
})

const preparationWithPriest = computed(
  () => `
<p><span class="rubric">Lecteur :</span> Mon père, veuille me bénir.</p>
<p><span class="rubric">Prêtre :</span> + Que le Dieu Tout-Puissant nous accorde une nuit tranquille et une fin heureuse.</p>
<p><span class="rubric">R :</span>Amen.</p>
<h3>Leçon brève</h3>
<p><span class="rubric">V :</span> Mes frères, soyez sobres et vigilants, car votre adversaire le diable rôde autour de vous comme un lion rugissant, cherchant qui il pourra dévorer. Résistez-lui en étant forts dans la foi.</p>
<p><span class="rubric">Il s'incline :</span> Et Toi, Seigneur, aie pitié de moi.</p>
<p><span class="rubric">R :</span>Rendons grâces à Dieu.</p>
<h3>Confession</h3>
<p><span class="rubric">P :</span> + Notre secours soit au nom du Seigneur,</p>
<p><span class="rubric">R :</span> Qui a fait le ciel et la terre.</p>
<p><span class="rubric">Le prêtre, seul, profondément incliné :</span></p>
<p><span class="rubric">P :</span> Je confesse devant la Face du Seigneur très clément, devant la bienheureuse Marie toujours Vierge, Mère de Dieu, saint Michel Archange, saint Jean-Baptiste, les saints Apôtres Pierre, Paul, Jean et Jacques, les saints ${saintsNamesHtml.value}, tous les saints, et devant vous mes frères et soeurs, que j'ai beaucoup péché par pensées, par paroles, par actions, par omissions, consciemment et inconsciemment, volontairement et involontairement.</p>
<p><span class="rubric">Il se frappe trois fois la poitrine :</span></p>
<p>Aie pitié de moi, Seigneur. Aie pitié de moi, Seigneur. Aie pitié de moi, Seigneur, selon Ta grande miséricorde ! C'est pourquoi je supplie la bienheureuse Marie toujours Vierge, Mère de Dieu, saint Michel Archange, saint Jean-Baptiste, les saints Apôtres Pierre, Paul, Jean et Jacques, les saints ${saintsNamesHtml.value}, tous les saints et vous mes frères et soeurs, de prier pour moi le Seigneur notre Dieu.</p>
<p><span class="rubric">R :</span> Que le Dieu Tout-Puissant aie pitié de toi, qu'Il te pardonne tes péchés et te conduise à la vie éternelle.</p>
<p><span class="rubric">P :</span> Amen</p>
<p><span class="rubric">R :</span> Je confesse devant la Face du Seigneur très clément, devant la bienheureuse Marie toujours Vierge, Mère de Dieu, saint Michel Archange, saint Jean-Baptiste, les saints Apôtres Pierre, Paul, Jean et Jacques, les saints ${saintsNamesHtml.value}, tous les saints, et devant toi, mon père, que j'ai beaucoup péché par pensées, par paroles, par actions, par omissions, consciemment et inconsciemment, volontairement et involontairement.</p>
<p><span class="rubric">On se frappe trois fois la poitrine :</span></p>
<p>Aie pitié de moi, Seigneur. Aie pitié de moi, Seigneur. Aie pitié de moi, Seigneur, selon Ta grande miséricorde ! C'est pourquoi je supplie la bienheureuse Marie toujours Vierge, Mère de Dieu, saint Michel Archange, saint Jean-Baptiste, les saints Apôtres Pierre, Paul, Jean et Jacques, les saints ${saintsNamesHtml.value}, tous les saints, et toi, mon père, de prier pour moi le Seigneur notre Dieu.</p>
<p><span class="rubric">P :</span> Que le Dieu Tout-Puissant aie pitié de vous, qu'Il vous pardonne vos péchés et vous conduise à la vie éternelle.</p>
<p><span class="rubric">R :</span> Amen.</p>
<p><span class="rubric">P :</span> Que le Seigneur Tout-Puissant et Miséricordieux vous accorde le pardon, l'absolution et la rémission de vos péchés ; qu'Il vous absolve de vos fautes et renouvelle vos coeurs par l'effusion du Saint-Esprit. + Au nom du Père, du Fils et du Saint-Esprit.</p>
<p><span class="rubric">R :</span> Amen.</p>
<p><span class="rubric">P :</span> Convertis-nous, ô Dieu Qui es notre salut !</p>
<p><span class="rubric">R :</span> Et détourne de nous Ta colère.</p>
`,
)

const preparationWithoutPriest = computed(
  () => `
<p><span class="rubric">Lecteur :</span> Que le Dieu Tout-Puissant nous accorde une nuit tranquille et une fin heureuse.</p>
<p><span class="rubric">R :</span> Amen.</p>
<h3>Leçon brève</h3>
<p><span class="rubric">V :</span> Mes frères, soyez sobres et vigilants, car votre adversaire le diable rôde autour de vous comme un lion rugissant, cherchant qui il pourra dévorer. Résistez-lui en étant forts dans la foi.</p>
<p><em>Il s'incline :</em> Et Toi, Seigneur, aie pitié de moi.</p>
<p><span class="rubric">R :</span> Rendons grâces à Dieu.</p>
<h3>Confession</h3>
<p><span class="rubric">V :</span> + Notre secours soit au nom du Seigneur,</p>
<p><span class="rubric">R :</span> Qui a fait le ciel et la terre.</p>
<p><span class="rubric">Tous :</span> Je confesse devant la Face du Seigneur très clément, devant la bienheureuse Marie toujours Vierge, Mère de Dieu, saint Michel Archange, saint Jean-Baptiste, les saints Apôtres Pierre, Paul, Jean et Jacques, les saints ${saintsNamesHtml.value}, tous les saints, et devant vous mes frères et soeurs, que j'ai beaucoup péché par pensées, par paroles, par actions, par omissions, consciemment et inconsciemment, volontairement et involontairement.</p>
<p><span class="rubric">On se frappe trois fois la poitrine :</span></p>
<p>Aie pitié de moi, Seigneur. Aie pitié de moi, Seigneur. Aie pitié de moi, Seigneur, selon Ta grande miséricorde ! C'est pourquoi je supplie la bienheureuse Marie toujours Vierge, Mère de Dieu, saint Michel Archange, saint Jean-Baptiste, les saints Apôtres Pierre, Paul, Jean et Jacques, les saints ${saintsNamesHtml.value}, tous les saints et vous mes frères et soeurs, de prier pour moi le Seigneur notre Dieu. Que le Dieu Tout-Puissant aie pitié de nous, qu'Il nous pardonne nos péchés et nous conduise à la vie éternelle. Amen.</p>
<p><span class="rubric">V :</span> Convertis-nous, ô Dieu Qui est notre salut !</p>
<p><span class="rubric">R :</span> Et détourne de nous Ta colère.</p>
`,
)

const closingWithPriest = `
<p><span class="rubric">P :</span> Le Seigneur soit toujours avec vous.</p>
<p><span class="rubric">R :</span> Et avec ton esprit.</p>
<p><span class="rubric">P :</span> Bénissons le Seigneur.</p>
<p><span class="rubric">R :</span> Rendons grâces à Dieu.</p>
<p><span class="rubric">P :</span> Que les âmes des fidèles défunts, par la miséricorde de Dieu, reposent en paix.</p>
<p><span class="rubric">R :</span> Amen.</p>
<p><span class="rubric">P :</span> Que le Seigneur Tout-Puissant et miséricordieux, + Père, Fils et Saint-Esprit, vous bénisse et vous garde.</p>
<p><span class="rubric">R :</span> Amen.</p>
`

const closingWithoutPriest = `
<p><span class="rubric">V :</span> Seigneur, écoute ma prière,</p>
<p><span class="rubric">R :</span> Et que mon cri parvienne jusqu'à Toi.</p>
<p><span class="rubric">V :</span> Bénissons le Seigneur.</p>
<p><span class="rubric">R :</span> Rendons grâces à Dieu.</p>
<p><span class="rubric">V :</span> Que les âmes des fidèles défunts, par la miséricorde de Dieu, reposent en paix.</p>
<p><span class="rubric">R :</span> Amen.</p>
<p><span class="rubric">V :</span> Que le Seigneur Tout-Puissant et miséricordieux (+), Père, Fils et Saint-Esprit, nous bénisse et nous garde.</p>
<p><span class="rubric">R :</span> Amen.</p>
`

const paterWithPriest = `
<p><span class="rubric">Le prêtre dit le Notre-Père :</span></p>
<p>Notre Père qui es aux cieux, que Ton Nom soit sanctifié, que Ton Règne arrive, que Ta volonté soit faite sur la terre comme au ciel. Donne-nous aujourd'hui notre Pain substantiel, et remets-nous nos dettes comme nous remettons à nos débiteurs, et ne nous soumets pas à l'épreuve, mais délivre-nous du malin.</p>
`

const paterWithoutPriest = `
<p><span class="rubric">V :</span> Notre Père qui es aux cieux ...</p>
<p><em>(à voix basse) ... que Ton Nom soit sanctifié, que Ton Règne arrive, que Ta volonté soit faite sur la terre comme au ciel. Donne-nous aujourd'hui notre Pain substantiel, et remets-nous nos dettes comme nous remettons à nos débiteurs ...</em>
<p><span class="rubric">V :</span> ... et ne nous soumets pas à l'épreuve.</p>
<p><span class="rubric">R :</span> Mais délivre nous du malin. Amen.</p>
`
</script>
