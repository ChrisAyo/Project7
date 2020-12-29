<template>
  <v-app>
    <Navbar :reviews="restaurants" @select="chosen" />
    <v-content>
      <v-container>
        <GoogleMapLoader
          :loaded="mapLoaded"
          :mapConfig="{ center: { lat: 51.512829, lng: -0.128001 }, zoom: 12 }"
          apiKey="AIzaSyAWCeHVGAhiySpUN9nKx7hV-b1yRL-QtMk"
        >
          <template slot-scope="{ google, map }">
            <template v-for="(restaurant, index) in restaurants">
              <GoogleMapInfoWindow
                :google="google"
                :map="map"
                :content="restaurant.restaurantName"
                :key="index"
              >
                <template slot-scope="{ infoWindow }">
                  <GoogleMapMarker
                    :marker="restaurant"
                    :google="google"
                    :map="map"
                    :info-window="infoWindow"
                  />
                </template>
              </GoogleMapInfoWindow>
            </template>
          </template>
        </GoogleMapLoader>
      </v-container>
      <v-container>
        <v-dialog v-model="dialog">
          <RestCard @update="addComments"
            :restaurant="currentRestaurant"
            :name="selectedResturantName"
            :address="address"
            :ratings="restaurants"
          />
        </v-dialog>
        <ModalWindow @submit="updateRestaurant" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import GoogleMapLoader from "./components/GoogleMapLoader";
import GoogleMapMarker from "./components/GoogleMapMarker";
import restaurants from "./assets/restaurantReview.json";
import Navbar from "./components/Navbar";
import GoogleMapInfoWindow from "./components/GoogleMapInfoWindow";
import ModalWindow from "./components/ModalWindow";
import RestCard from "./components/RestCard";
// import review from "./assets/review.json";

export default {
  name: "App",

  components: {
    Navbar,
    GoogleMapLoader,
    GoogleMapMarker,
    GoogleMapInfoWindow,
    ModalWindow,
    RestCard,
  },

  data() {
    return {
      restaurants: restaurants,
      markers: [],
      restaurantName: "",
      dialog: false,
      selectedResturantName: "",
      address: "",
      ratings:restaurants,
      currentRestaurant:null
    };
  },

  methods: {
    mapLoaded({ google, map, places, geometry }) {
      const radius = 10000000;
      this.google.maps.Circle({
        center: this.mapConfig.center,
        radius,
        fillColor: "#FF0000",
        map: this.map,
      });

      // const content = this.resturants.restaurantName;
      //   const bounds = new this.google.maps.LatLngBounds()

      //   const gmarkers = this.resturants.map(resturant => {
      //     const marker = new this.google.maps.Marker({
      //       position: { lat: resturant.lat, lng: resturant.lng },
      //       map: this.map
      //     })
      //     marker.place_id = resturant.place_id
      //     const name = resturant.restaurantName + resturant.address
      //     const InfoWindow = new this.google.maps.InfoWindow({
      //       content: name
      //     })
      //     marker.addListener('click', () => {
      //       InfoWindow.open(this.map, marker)
      //     })
      //     return marker
      //   })
      //   this.map.addListener('click', (e) => {
      //     this.placeMarkerAndPanTo(e.latLng)
      //   })

      //   this.map.addListener('idle', () => {
      //     for (let i = 0; i < gmarkers.length; i++) {
      //       const currentPosition = this.google.maps.geometry.spherical.computeDistanceBetween(gmarkers[i].getPosition(), this.map.getCenter())
      //       if (currentPosition < radius) {
      //         bounds.extend(gmarkers[i].getPosition())
      //         gmarkers[i].setMap(this.map)
      //       } else {
      //         gmarkers[i].setMap(null)
      //       }
      //     }
      //   })
      // },
      // placeMarkerAndPanTo (position) {
      //   const form = document.createElement('label')
      //   form.setAttribute('for', 'name')
      //   form.innerText = 'Resturant name'

      //   const input = document.createElement('input')
      //   input.setAttribute('type', 'text')
      //   input.setAttribute('id', 'fname')
      //   input.setAttribute('name', 'name')

      //   const button = document.createElement('button')
      //   button.innerText = 'submit'
      //   const div = document.createElement('div')
      //   div.appendChild(form)
      //   div.appendChild(input)
      //   div.appendChild(button)

      //   button.addEventListener('click', (e) => {
      //     var details = input.value
      //     const foodPlaces = {
      //       place_id: Date.now(),
      //       restaurantName: details,
      //       address: '',
      //       lat: position.lat(),
      //       lng: position.lng(),
      //       ratings: []
      //     }
      //     console.log(foodPlaces)
      //     const x = document.getElementById('fname').value
      //     if (x === '' || x === null) {
      //       e.preventDefault()
      //     // return false why return false???
      //     } else {
      //       this.resturants.push(foodPlaces)
      //       InfoWindow.close()
      //     }
      //   })
      //   const InfoWindow = new this.google.maps.InfoWindow({
      //     content: div

      //   })
      //   this.map.panTo(position)
      //   const marker = new this.google.maps.Marker({
      //     position: position,
      //     map: this.map
      //   })
      //   InfoWindow.open(this.map, marker)
      //   InfoWindow.addListener('closeclick', function () {
      //     marker.setMap(null)
      //   })
    },
    updateRestaurant(payload) {
      // why payload???
      this.restaurants.push(payload);
    },
    chosen(payload) {
      this.currentRestaurant = payload
      this.dialog = true;
      // console.log(selectedReview)
    },
    addComments(payload){
      this.currentRestaurant.ratings.push(payload)
    }
    // display(payload) {
    //   this.plan = payload;
    //   console.log(payload)
    // },
  },
};
</script>
