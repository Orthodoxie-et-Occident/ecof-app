<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>Paroisses</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">

            <ion-list-header>
                <ion-label>
                    <h2>33 - Gironde</h2>
                </ion-label>
            </ion-list-header>
            <ion-list>
                <ion-item button @click="voirHoraires(1)">
                    <ion-thumbnail slot="start">
                        <img src="/favicon.png" alt="Cathédrale Saint-Louis" />
                    </ion-thumbnail>
                    <ion-label>
                        <h2>Paroisse de l'Exaltation de la Sainte Croix et Saint-Paulin de Nole</h2>
                        <p>Bordeaux</p>
                    </ion-label>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
            </ion-list>

            <ion-list-header>
                <ion-label>
                    <h2>34 - Hérault</h2>
                </ion-label>
            </ion-list-header>
            <ion-list>
                <ion-item button @click="voirHoraires(3)">
                    <ion-thumbnail slot="start">
                        <img src="/favicon.png" alt="Église Notre-Dame" />
                    </ion-thumbnail>
                    <ion-label>
                        <h2>Paroisse de la Théophanie</h2>
                        <p>Montpellier</p>
                    </ion-label>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
            </ion-list>

            <ion-list-header>
                <ion-label>
                    <h2>37 - Indre-et-Loire</h2>
                </ion-label>
            </ion-list-header>
            <ion-list>
                <ion-item button @click="voirHoraires(4)">
                    <ion-thumbnail slot="start">
                        <img src="/favicon.png" alt="Cathédrale Saint-Pierre" />
                    </ion-thumbnail>
                    <ion-label>
                        <h2>Paroisse du Moutier Saint-Martin</h2>
                        <p>Amboise</p>
                    </ion-label>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
            </ion-list>

            <ion-list-header>
                <ion-label>
                    <h2>38 - Isère</h2>
                </ion-label>
            </ion-list-header>
            <ion-list>
                <ion-item button @click="voirHoraires(4)">
                    <ion-thumbnail slot="start">
                        <img src="/favicon.png" alt="Cathédrale Saint-Pierre" />
                    </ion-thumbnail>
                    <ion-label>
                        <h2>Paroisse de la Résurrection</h2>
                        <p>Grenoble</p>
                    </ion-label>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
            </ion-list>

            <ion-list-header>
                <ion-label>
                    <h2>44 - Loire-Atlantique</h2>
                </ion-label>
            </ion-list-header>
            <ion-list>
                <ion-item button @click="voirHoraires(4)">
                    <ion-thumbnail slot="start">
                        <img src="/favicon.png" alt="Cathédrale Saint-Pierre" />
                    </ion-thumbnail>
                    <ion-label>
                        <h2>Paroisse de la Trinité et Saint-Clair</h2>
                        <p>Nantes</p>
                    </ion-label>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
            </ion-list>

            <ion-list-header>
                <ion-label>
                    <h2>45 - Loiret</h2>
                </ion-label>
            </ion-list-header>
            <ion-list>
                <ion-item button @click="voirHoraires(4)">
                    <ion-thumbnail slot="start">
                        <img src="/favicon.png" alt="Cathédrale Saint-Pierre" />
                    </ion-thumbnail>
                    <ion-label>
                        <h2>Paroisse Saint-Avit</h2>
                        <p>Orléans</p>
                    </ion-label>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
                <ion-item button @click="voirHoraires(4)">
                    <ion-thumbnail slot="start">
                        <img src="/favicon.png" alt="Cathédrale Saint-Pierre" />
                    </ion-thumbnail>
                    <ion-label>
                        <h2>Chapelle Saint-Loup de Sens et Sainte-Radegonde</h2>
                        <p>Saint-Loup-des-Vignes</p>
                    </ion-label>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
            </ion-list>

            <ion-list-header>
                <ion-label>
                    <h2>49 - Maine-et-Loire</h2>
                </ion-label>
            </ion-list-header>
            <ion-list>
                <ion-item button @click="voirHoraires(4)">
                    <ion-thumbnail slot="start">
                        <img src="/favicon.png" alt="Cathédrale Saint-Pierre" />
                    </ion-thumbnail>
                    <ion-label>
                        <h2>Paroisse Saint-Martin d'Anjou</h2>
                        <p>Angers</p>
                    </ion-label>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
            </ion-list>

            <ion-list-header>
                <ion-label>
                    <h2>56 - Morbihan</h2>
                </ion-label>
            </ion-list-header>
            <ion-list>
                <ion-item button @click="voirHoraires(4)">
                    <ion-thumbnail slot="start">
                        <img src="/favicon.png" alt="Cathédrale Saint-Pierre" />
                    </ion-thumbnail>
                    <ion-label>
                        <h2>Chapelle Saint-Martin du Moustoir</h2>
                        <p>Vannes</p>
                    </ion-label>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
            </ion-list>

            <ion-list-header>
                <ion-label>
                    <h2>69 - Rhône</h2>
                </ion-label>
            </ion-list-header>
            <ion-list>
                <ion-item button @click="voirHoraires(4)">
                    <ion-thumbnail slot="start">
                        <img src="/favicon.png" alt="Cathédrale Saint-Pierre" />
                    </ion-thumbnail>
                    <ion-label>
                        <h2>Paroisse Sainte-Marie et Saint-Jean</h2>
                        <p>Lyon</p>
                    </ion-label>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
            </ion-list>

            <ion-list-header>
                <ion-label>
                    <h2>75 - Paris</h2>
                </ion-label>
            </ion-list-header>
            <ion-list>
                <ion-item button @click="voirHoraires(4)">
                    <ion-thumbnail slot="start">
                        <img src="/favicon.png" alt="Cathédrale Saint-Pierre" />
                    </ion-thumbnail>
                    <ion-label>
                        <h2>Cathédrale Saint Irénée</h2>
                        <p>Paris</p>
                    </ion-label>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
            </ion-list>

            <ion-list-header>
                <ion-label>
                    <h2>86 - Vienne</h2>
                </ion-label>
            </ion-list-header>
            <ion-list>
                <ion-item button @click="voirHoraires(4)">
                    <ion-thumbnail slot="start">
                        <img src="/favicon.png" alt="Cathédrale Saint-Pierre" />
                    </ion-thumbnail>
                    <ion-label>
                        <h2>Paroisse Saint-Savin et Saint-Cyprien</h2>
                        <p>Poitiers</p>
                    </ion-label>
                    <ion-icon :icon="chevronForward" slot="end"></ion-icon>
                </ion-item>
            </ion-list>

        </ion-content>
    </ion-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonList,
    IonListHeader,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonIcon
} from '@ionic/vue';
import { chevronForward } from 'ionicons/icons';

const router = useRouter();

const voirHoraires = (paroisse_id) => {
    router.push(`/paroisses/${paroisse_id}/horaires`);
};
</script>

<style scoped>
ion-list-header {
    padding-top: 20px;
}

ion-list-header h2 {
    font-weight: 600;
    color: var(--ion-color-primary);
}
</style>