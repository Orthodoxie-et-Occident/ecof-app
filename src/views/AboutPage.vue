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
    
    <ion-content class="ion-padding">
      
      <!-- Sources -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Sources</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            Les ressources utilisées pour cette application s'appuient sur la tradition liturgique de l'
            <a href="https://eglise-catholique-orthodoxe-de-france.fr/" target="_blank">
              Église Catholique Orthodoxe de France
            </a>.
          </p>
          <p>Les lectures quotidiennes font usage de traductions libres de droits de la Bible :</p>
          <ul>
            <li>
              <em>Bible Segond 1910</em>, en utilisant le vocable « le Seigneur » de préférence à « l'Éternel ».
            </li>
            <li>
              <em>Bible Crampon 1923</em>, pour certains livres de l'Ancien Testament absents des Bibles protestantes, 
              en remplaçant le vouvoiement de Dieu par le tutoiement.
            </li>
          </ul>
        </ion-card-content>
      </ion-card>

      <!-- Contact -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Contact</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Pour toute question ou suggestion, vous pouvez nous contacter&nbsp;:</p>
          <ul>
            <li>
              E-mail : <a href="mailto:contact@ecof.info">contact@ecof.info</a>
            </li>
          </ul>
        </ion-card-content>
      </ion-card>

      <!-- Application Android -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Application Android</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ul>
            <li>
              Rechercher et télécharger l'application ECOF via le 
              <a href="https://play.google.com/store/apps/details?id=info.ecof.www.twa&pcampaignid=web_share" target="_blank">
                Google Play Store
              </a>
            </li>
          </ul>
        </ion-card-content>
      </ion-card>

      <!-- Installation iOS -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Installation sur iOS</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ol>
            <li>Ouvrir Safari</li>
            <li>Se rendre sur la page <a href="/" target="_blank">www.ecof.info</a></li>
            <li>
              Appuyer sur le bouton « Partager » situé en bas de l'écran 
              (icône représentant un carré avec une flèche)
            </li>
            <li>
              Dans le menu qui s'affiche, sélectionner l'option « Ajouter à l'écran d'accueil »
            </li>
            <li>Ceci créera une icône sur l'écran d'accueil</li>
          </ol>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonMenuButton, 
  IonTitle, 
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/vue';
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}

ion-card {
  margin-bottom: 16px;
}

ion-card-content {
  line-height: 1.6;
}

ion-card-content p {
  margin-bottom: 12px;
}

ion-card-content ul,
ion-card-content ol {
  padding-left: 20px;
  margin-top: 8px;
}

ion-card-content li {
  margin-bottom: 8px;
}

a {
  color: var(--ion-color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>