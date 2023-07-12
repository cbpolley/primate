<template>
  <ion-fab slot="fixed" horizontal="end" vertical="top" :activated="true" >
    <ion-fab-list v-model="listModel">
      <ion-fab-button :disabled="true">
        <ion-icon :icon="images.layer"></ion-icon>
      </ion-fab-button>
      <ion-fab-button :disabled="true">
        <ion-icon :icon="images.direction"></ion-icon>
      </ion-fab-button>
      <ion-fab-button :disabled="true">
        <ion-icon :icon="images.pin"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>
</template>

<script setup>
  import { ref } from 'vue'
  import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/vue';

  const images = { 
    layer: require('@/assets/icons/layer.svg'),
    direction : require('@/assets/icons/direction.svg'),
    pin : require('@/assets/icons/pin.svg'),
  } 

  const listModel = ref()

</script>

<style>
ion-fab{
  right:60px;
  top:20px;
}
</style>