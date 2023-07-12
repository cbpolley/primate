<template>
  <ion-item lines="none">
    <ion-label slot="start" class="ion-no-margin">{{props.label}}</ion-label>
    <ion-grid>
      <ion-row class="ion-align-items-center ion-justify-content-end">

          <ion-button :color="amount?'dark':'medium'" @click="iterateAmount('minus')">
            <ion-icon size="large" color="primary" :icon="removeOutline" aria-label="Remove item"></ion-icon>
          </ion-button>
          <div style="min-width:50px;">
              <h1 class="ion-text-center">
                <strong>
                  {{ amount }}
                </strong>
              </h1>
          </div>
          <div style="flex-grow-1"></div>
          <ion-button :color="amount?'dark':'medium'" @click="iterateAmount('plus')">
            <ion-icon size="large" color="primary" :icon="addOutline" aria-label="Add item"></ion-icon>
          </ion-button>
      </ion-row>
    </ion-grid>
  </ion-item>
</template>

<script setup>
import { ref } from 'vue';
import { 
    IonGrid, IonRow, IonCol,
    IonItem,
    IonButton, IonLabel, IonIcon  } from '@ionic/vue';
import { addOutline, removeOutline } from 'ionicons/icons';

const amount = ref(0)

const props = defineProps(['item', 'label'])
const emit = defineEmits(['amountChange', 'amount'])

function iterateAmount(type) {
  if (amount.value > 0 && type === 'minus'){
    amount.value--;
  } else if (type === 'plus'){
    amount.value++
  }
  emit('amountChange', amount.value)
}
  
</script>

<style scoped>

ion-button{
  --border-radius:40px;
  height:36px;
  width:36px;
}

ion-button::part(native){
  padding: 0;
}

ion-button ion-icon{
  height:22px;
  width:22px;
}

ion-icon {
  color: red;
}
</style>