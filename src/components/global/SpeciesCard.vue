<template>
  <ion-item lines="none" class="ion-margin" style="height:72px">
    <ion-avatar slot="start">
      <img alt="Species image" :src="props.item?.image??''" />
    </ion-avatar>
    <ion-label>
      <h6>{{ props.item?.name??'' }}</h6>
      <p>{{ props.item?.sciName??'' }}</p>
    </ion-label>
    <ion-thumbnail slot="end">
      <img alt="More Details" :src="images?.moreDetails??''"/>
    </ion-thumbnail>            
  </ion-item>
</template>

<script setup>
  import { defineProps } from "vue";

  import { 
    IonAvatar,
    IonItem,
    IonLabel,
    IonThumbnail
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

ion-item {
  --border-radius: 10px;
  box-shadow: 0px 4px 46px 0px rgba(14, 15, 17, 0.06);
}
</style>