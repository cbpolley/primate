<template>
  <ion-card class="ion-margin ion-no-padding custom">
    <ion-card-content class="ion-no-padding">
      <ion-item lines="none" class="ion-no-margin custom">
        <ion-avatar slot="start">
          <img :src="item?.image??''" />
        </ion-avatar>
        <ion-label>
          <h6>{{ item?.name??'' }}</h6>
          <p>{{ item?.sciName??'' }}</p>
        </ion-label>
        <ion-thumbnail slot="end">
          <img alt="More Details" :src="images.moreDetails"/>
        </ion-thumbnail>            
      </ion-item>
    </ion-card-content>
  </ion-card>
</template>

<script setup>
  import { defineProps } from "vue";
  
  import { 
    IonAvatar,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonCard,
    IonCardContent
  } from '@ionic/vue';

  const images = { 
    moreDetails: require('@/assets/icons/moreDetails.svg'),
  } 

  const props = defineProps(['item'])

</script>

<style scoped>
ion-thumbnail {
  --size: 20px;
  --border-radius: 14px;
}

ion-card.custom{
  position: absolute;
  width: calc(100% - 32px);
  border-radius: 10px;
  top:0px;
  left:0px;
  z-index: 9999;
}

ion-item {
  --border-radius: 10px;
  box-shadow: 0px 4px 46px 0px rgba(14, 15, 17, 0.06);
}
</style>