<template>

    <ion-content class="ion-no-padding" style="position:relative;" :fullscreen="true">
      <SpeciesCardFocus :item="speciesCardItem" style="position:absolute; top:50px;"/>
      <FabColumn/>
      <div id="map-container" style="width:100vw; height:100vh;">
        <div id="map"></div>
      </div>
      <ExtraInfoModal :openModal="openModal"/>
    </ion-content>
    <ion-footer :translucent="true"  collapse="fade" class="custom">
      <ion-grid>
        <ion-row>
          <ion-col class="ion-text-center ion-no-padding">
            <ion-button color="primary" size="large" expand="block" class="custom">Submit</ion-button>
          </ion-col>
        </ion-row>
        <ion-row class="ion-padding-bottom">
          <ion-col class="ion-text-center">
            <ion-button @click="openModal = !openModal" fill="clear" class="info-custom">
                Add Extra Info
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-footer>
</template>

<script>
  import { ref, defineComponent } from 'vue';
  import { get } from '@/store/index.js'
  import mapboxgl from 'mapbox-gl';
  import SpeciesCardFocus from '@/components/global/SpeciesCardFocus.vue'
  import FabColumn from '@/components/global/FabColumn.vue'
  import ExtraInfoModal from '@/components/form/ExtraInfoModal.vue'

  import { 
    IonContent,
    IonFooter,
    IonGrid, IonCol, IonRow,
    IonButton
 } from '@ionic/vue';
  import { closeOutline, searchOutline } from 'ionicons/icons';

  export default defineComponent({
    components: {
      IonContent,
      IonFooter,
      IonGrid, IonCol, IonRow,
      IonButton,
      SpeciesCardFocus,
      FabColumn,
      ExtraInfoModal
    },
    setup() {
      const images = { 
        orangutan : require('@/assets/images/orangutan.svg'),
        moreDetails: require('@/assets/icons/moreDetails.svg'),
        magnify: require('@/assets/icons/magnify.svg'),
      }
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;

      const speciesCardItem = ref()

      const searchTerm = ref('')
      const progress = ref(0.5)
      const geolocation = ref([117.22, 3.8])
      const popup = ref(new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        anchor:'top'
      }))
      const openModal = ref(false)
      const marker = ref()
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
      

      return { 
        images,
        searchTerm,
        list,
        closeOutline,
        searchOutline,
        progress,
        geolocation,
        speciesCardItem,
        marker,
        popup,
        openModal
      };
    },
    async mounted(){
      this.setMap();
      this.speciesCardItem = await get('focusCard')
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
      onDragEnd() {
        this.geolocation.value = this.marker.getLngLat();
      },
      async setMap(){
        const map = new mapboxgl.Map({
          container: 'map', // container ID
          style: 'mapbox://styles/mapbox/satellite-v9', // style URL
          center: [117.22, 3.8], // starting position [lng, lat]
          zoom: 9, // starting zoom
          height:'100vh',
          width:'100%'
        });

      const el = document.createElement('div');
      el.className = 'marker';

      this.marker = await new mapboxgl.Marker({
        element:el,
        draggable:true
      })
      .setLngLat([117.22, 3.8])
      .addTo(map)
      .on('drag', this.onDragEnd)

      // map.addControl(new mapboxgl.NavigationControl());
      map.on('idle',function(){
        map.resize()
      })

      map.getCanvas().style.cursor = 'pointer';
      
      }

    }
  });
</script>

<style>

#map{
  height: 100%; 
  width: 100%;
}
#map-container{
  height: 100vh; 
  width: auto;
}

.marker {
  background-image: url('/src/assets/images/marker.svg');
  background-size: cover;
  width: 50px;
  height: 70px;
}

.mapboxgl-popup-tip{
  display: none;
}

ion-footer.custom{
  box-shadow: none;
}

ion-button.custom{
  font-weight: 700;
  margin-right: 24px;
  margin-left: 24px;
}
ion-button.info-custom{
  font-weight: 700;
  font-size: 16px;
  height:44px;
  margin: 0px 0px 52px 0px;
}



</style>