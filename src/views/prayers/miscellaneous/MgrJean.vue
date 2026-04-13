<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/prayers/miscellaneous"></ion-back-button>
        </ion-buttons>
        <ion-title>Prière du matin de Monseigneur Jean</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="priere-container">
        <h1>Prière du matin de Monseigneur Jean</h1>

        <ion-accordion-group class="about-accordion">
          <ion-accordion>
            <ion-item slot="header" color="primary">
              <ion-label>À propos</ion-label>
            </ion-item>
            <div slot="content" class="about-content">
              <p>Prière de Monseigneur Jean, évêque de Saint-Denis&nbsp;:</p>
              <p>
                Je vais vous révéler un secret de sainteté et de bonheur&nbsp;:&nbsp;si tous les jours, pendant cinq minutes, vous savez faire taire votre imagination, fermer vos yeux aux choses
                sensibles et vos oreilles à tous les bruits de la terre pour entrer en vous-même, là, dans le sanctuaire de votre âme qui est le temple du Saint-Esprit en lui disant :
              </p>
              <p>
                «&nbsp;Ô Saint Esprit, âme de mon âme, je T'adore, éclaire-moi, guide- moi, fortifie-moi, console-moi&nbsp;; dis-moi ce que je dois faire, donne-moi tes ordres. Je te promets de me
                soumettre à tout ce que Tu désires de moi et d'accepter tout ce que Tu permets qu'il m'arrive. Fais-moi seulement connaître Ta volonté.&nbsp;»
              </p>
              <p>
                Si vous faites cela, votre vie s'écoulera heureuse, sereine et consolée, même au milieu des peines, car la grâce sera proportionnée à l'épreuve, vous donnant la force de la porter et
                vous arriverez à la porte du Paradis.
              </p>
              <p>Cette soumission au Saint-Esprit est le secret de la sainteté.</p>
            </div>
          </ion-accordion>
        </ion-accordion-group>

        <div class="priere-texte">
          <p>
            Ô Saint-Esprit, âme de mon âme, je T'adore, éclaire-moi, guide-moi, fortifie-moi, console-moi ; dis-moi ce que je dois faire, donne- moi tes ordres. Je te promets de me soumettre à tout ce
            que Tu désires de moi et d'accepter tout ce que Tu permets qu'il m'arrive. Fais-moi seulement connaître Ta volonté.
          </p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel } from "@ionic/vue"
</script>

<style scoped>
.priere-container {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--ion-color-primary);
}

.about-accordion {
  margin-bottom: 2rem;
}

.about-content {
  padding: 0.75rem 1rem;
  background: var(--ion-color-light);
}

.about-content p {
  font-size: 0.88rem;
  font-style: italic;
  color: var(--ion-color-medium);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.priere-texte {
  line-height: 1.8;
  text-align: left;
}

.priere-texte p {
  margin-bottom: 1.5rem;
}
</style>
