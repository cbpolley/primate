<template>
  <ion-modal 
    ref="modal" 
    :animated="true"
    :isOpen="openModal" 
    :initial-breakpoint="0.75" 
    :breakpoints="[0, 0.25, 0.5, 0.75, 1]">
    <ion-content class="ion-no-padding">
      <ion-title class="ion-text-start ion-padding-horizontal">
        <h6>
          How many individuals did you see?
        </h6>
      </ion-title>
      <ion-card class="custom">
        <ion-card-content class="ion-no-padding">
          <IteratorRow @amountChange="updateValue('totalNumber', $event)" label="Total Number"/>
          <ion-item lines="none">
            <h6 slot="start">Split into (if known)</h6>
          </ion-item>
          <IteratorRow :item="extraInfoDetails.totalNumber" label="Adult female"/>
          <IteratorRow :item="extraInfoDetails.totalNumber" label="Adult male"/>
          <IteratorRow :item="extraInfoDetails.totalNumber" label="Juvenile/Infant"/>
        </ion-card-content>
      </ion-card>
      <ion-title class="ion-text-start ion-padding-horizontal">
        <h6>
          How many troops did you see?
        </h6>
      </ion-title>
      <ion-card class="custom">
        <ion-card-content class="ion-no-padding">
          <IteratorRow :item="extraInfoDetails.totalNumber" label="Troop number"/>
        </ion-card-content>
      </ion-card>
      <ion-title class="ion-text-start ion-padding-horizontal">
        <h6>
          Add photos if possible
        </h6>
      </ion-title>
      <ion-grid>
        <ion-row>
          <ion-col v-for="(photo, index) in extraInfoDetails.photos" :key="`photo${index}`">
            <ion-card class="ion-margin" @click="takePicture(index)">
              <ion-card-content class="ion-text-center" style="height:100px; width:100px; margin:auto; display:flex; justify-content:center; align-items:center;">
                    <ion-icon :icon="images.camera" style="height:32px; width:32px;"></ion-icon>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-title class="ion-text-start ion-padding-horizontal">
        <h6>
          Any other observations
        </h6>
      </ion-title>      
      <ion-card class="ion-margin-bottom" style="margin:24px; 0px">
        <ion-textarea v-model="extraInfoDetails.observations" fill="outline" rows="6"></ion-textarea>
      </ion-card>
    </ion-content> 
  </ion-modal>  
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import IteratorRow from '@/components/global/IteratorRow.vue'
  import { Camera, CameraResultType } from '@capacitor/camera';

  import { 
    IonContent,
    IonGrid, IonRow, IonCol,
    IonTitle, 
    IonIcon,
    IonCard,
    IonCardContent,
    IonTextarea,
    IonItem,
    IonModal  } from '@ionic/vue';
  import { closeOutline, searchOutline, addOutline } from 'ionicons/icons';

  export default defineComponent({
    components: {
      IonContent,
      IteratorRow,
      IonGrid, IonRow, IonCol,
      IonTitle, 
      IonCard,
      IonCardContent,
      IonTextarea,
      IonIcon,
      IonModal,
      IonItem
    },
    props:['openModal'],
    setup() {
      const images = { 
        orangutan : require('@/assets/images/orangutan.svg'),
        moreDetails: require('@/assets/icons/moreDetails.svg'),
        magnify: require('@/assets/icons/magnify.svg'),
        camera: require('@/assets/icons/camera.svg'),
      } 

      const searchTerm = ref('')
      const progress = ref(0.5)

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

      const extraInfoDetails = ref({
        totalNumber: 1,
        adultFemale:0,
        adultMale:0,
        infant:0,
        troops:0,
        otherObservations:0,
        photos: Array(3)
      })
      
      return { 
        images,
        searchTerm,
        list,
        closeOutline,
        searchOutline,
        addOutline,
        progress,
        extraInfoDetails
      };
    },
    computed:{
      filteredList (){
        if (this.searchTerm !== ''){
          return this.list.filter(v => v.name.includes(this.searchTerm))
        } else {
          return this.list
        }
      }
    },
    methods:{
      updateValue(location, value){
        console.log(value)
        this.extraInfoDetails[location] = value
        console.log(this.extraInfoDetails)
      },
      async takePicture (index) {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.Uri
        });

        const imageUrl = image.webPath;

        extraInfoDetails.photos[index] = imageUrl;
      }
    }
  });
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

ion-item.custom {
  margin:24px;
}

ion-card.custom {
  --border-radius: 10px;
  box-shadow: 0px 4px 46px 0px rgba(14, 15, 17, 0.06);
  margin:24px;
  
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

ion-textarea{
  border-radius: 4px;
border: 1px solid var(--grey-70, #555C63);
}
</style>