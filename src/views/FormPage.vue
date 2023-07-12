<!-- Starting point for the form process. -->
<!-- Main functionality contained within the SpeciesPage & LocationPage components  -->
<!-- Pages conditionally rendered with the progress variable -->
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title class="ion-text-center">
          <strong>
            {{titles[progress - 1]}}
          </strong>
        </ion-title>
        <ion-buttons slot="end">
          <ion-button color="dark" fill="solid" shape="round" style="width:40px; height:40px;" @click="firstPage" >
            <ion-icon :icon="closeOutline" size="large" style="box-shadow:0 4px 16px rgba(0, 0, 0, 0.12);"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-progress-bar :value="getProgressPercent"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
   <SpeciesPage v-if="progress === 1" @clickedCard="nextStep"/>
   <LocationPage v-else-if="progress === 2" />
  </ion-page>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import SpeciesPage from '@/components/form/SpeciesPage.vue'
  import LocationPage from '@/components/form/LocationPage.vue'
  
  import { 
    IonPage,
    IonProgressBar,
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon  } from '@ionic/vue';

  import { closeOutline } from 'ionicons/icons';

  const progress = ref(1)

  const titles = [
    'What have you seen?',
    'Where did you see it?',
    'Add extra info?'
  ]

  function nextStep(){
        setTimeout(() => {
          progress.value++;
        }, 500);
      }

  function firstPage (){
    progress.value = 1;
  }

  const getProgressPercent = computed(() => progress.value * 0.34)

</script>

<style scoped>


ion-item {
  --border-radius: 10px;
  box-shadow: 0px 4px 46px 0px rgba(14, 15, 17, 0.06);
}

ion-toolbar{
  --min-height:56px;
}

.primate-search::part(native){
  height:62px;
  border-radius:50px;
  --box-shadow:0;
}

ion-progress-bar{
  height: 7px;
}
ion-progress-bar::part(progress){
  background: rgba(85, 255, 163, 1);  
  border-radius: 5px;
}

ion-progress-bar::part(track){
  display: none;
}

</style>