<template>
    <ion-content class="ion-no-padding">
      <ion-item class="primate-search ion-no-padding ion-margin-top ion-padding-horizontal" lines="none" fill="outline">
        <img alt="Search icon" :src="images.magnify" size="10"/>
        <ion-input placeholder="Search primates" class="ion-margin-start"></ion-input>
      </ion-item>
      <ion-list>
        <RecycleScroller 
          key-field="id" 
          class="scroller" 
          :items="filteredList" 
          :item-size="86">
          <template #default="{ item }">
            <SpeciesCard :item="item" @click="clickedCard(item)"></SpeciesCard>
          </template>
        </RecycleScroller>
      </ion-list>
    </ion-content>
</template>

<script setup>
  import { ref, computed } from 'vue';

  import SpeciesCard from '../global/SpeciesCard.vue';

  import { set } from '/src/store/index.js'
  import {
    IonContent,
    IonItem,
    IonInput,
    IonList  
  } from '@ionic/vue';

  const images = { 
    orangutan : require('@/assets/images/orangutan.svg'),
    magnify: require('@/assets/icons/magnify.svg'),
  } 

  const searchTerm = ref('')

  const list = (() => {
    const array = []

    for (let index = 0; index <= 30; index++) {
      array.push({
        id: index,
        name:`${index}oranguatan`,
        sciName: 'scientific name',
        image:images.orangutan
      })
    }
    return array;
  })();

  const emit = defineEmits(['clickedCard', 'amount'])

  async function clickedCard(item){
    await set('focusCard', item)
    emit('clickedCard')
  }

  const filteredList = computed(() => {
    if (searchTerm.value !== ''){
      return list.filter(v => v.name.includes(searchTerm.value))
    } else {
      return list
    }
  })

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

.vue-recycle-scroller ion-item{
  border-radius:12px;
}
</style>