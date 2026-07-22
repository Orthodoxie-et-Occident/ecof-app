<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>À propos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Ressources</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            Les ressources utilisées pour cette application s'appuient sur la tradition liturgique de l'<a href="https://eglise-catholique-orthodoxe-de-france.fr/" target="_blank"
              >Église catholique orthodoxe de France</a
            >.
          </p>
          <p>Les lectures quotidiennes font usage de traductions libres de droits de la Bible&nbsp;:</p>
          <ul>
            <li><em>Bible Segond 1910</em>, en utilisant le vocable «&nbsp;le Seigneur&nbsp;» de préférence à «&nbsp;l'Éternel&nbsp;».</li>
            <li><em>Bible Crampon 1923</em>, pour certains livres de l'Ancien Testament absents des Bibles protestantes, en remplaçant le vouvoiement de Dieu par le tutoiement.</li>
          </ul>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Bibliothèques</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            Le rendu des partitions musicales de cette application s'appuie sur
            <a href="https://www.verovio.org/" target="_blank">Verovio</a>, une bibliothèque open-source de gravure musicale développée par le
            <a href="https://rism.digital/" target="_blank">RISM Digital Center</a>, distribuée sous <a href="https://www.gnu.org/licenses/lgpl-3.0.html" target="_blank">licence LGPL v3</a>.
          </p>
          <p>
            Le code source de Verovio est disponible sur
            <a href="https://github.com/rism-digital/verovio" target="_blank">GitHub</a>.
          </p>
        </ion-card-content>
      </ion-card>

      <!-- Contribution -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Contribuer</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Le contenu de l'application s'enrichit continuellement, toutes les contributions sont les bienvenues, notamment des ressources libres de droits sur la vie des saints.</p>
        </ion-card-content>
      </ion-card>

      <!-- Contact -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Contact</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Pour toute question, suggestion ou contribution vous pouvez nous contacter à l'adresse <a href="mailto:contact@ecof.app">contact@ecof.app</a></p>
        </ion-card-content>
      </ion-card>

      <p class="version">Version 3.5.3</p>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/vue"
</script>

<style scoped>
ion-card {
  margin-bottom: 16px;
}

ion-card-content {
  line-height: 1.6;
  font-size: 16px;
}

ion-card-content p,
ion-card-content li {
  font-size: 16px;
  margin-bottom: 8px;
}

ion-card-content p {
  margin-bottom: 12px;
}

ion-card-content ul,
ion-card-content ol {
  padding-left: 20px;
  margin-top: 8px;
}

a {
  color: var(--ion-color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.version {
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
  margin-bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
}
</style>
