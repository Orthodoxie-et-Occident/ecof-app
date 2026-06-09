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
          <ion-card-title>Sources</ion-card-title>
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

      <!-- Contribution -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Contribuer</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Le contenu de l'application s'enrichit continuellement et toutes les contributions sont les bienvenues.</p>
        </ion-card-content>
      </ion-card>

      <!-- Contact -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Contact</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Pour toute question, suggestion ou contribution vous pouvez nous contacter&nbsp;:</p>
          <ul>
            <li>E-mail : <a href="mailto:contact@ecof.app">contact@ecof.app</a></li>
          </ul>
        </ion-card-content>
      </ion-card>
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
</style>
