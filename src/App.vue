<template> <!-- Move ResturantMap into App.vue

 -->
  <v-app>
    <!-- <div class="d-flex align-center"></div> -->
    <!-- <v-spacer></v-spacer> adds space betewwen Nav and the top header area  -->
    <Navbar :reviews="resturants" />
    <v-content>
      <v-container>
         <GoogleMapLoader
    :loaded="mapLoaded"
    :mapConfig="{ center: {lat: 51.512829, lng: -0.128001}, zoom: 12 }"
    apiKey="AIzaSyAWCeHVGAhiySpUN9nKx7hV-b1yRL-QtMk"
  >
    <template slot-scope="{ google, map }">
      <!-- {{ map }}
      {{ google }}-->
      <GoogleMapMarker
        v-for="(marker,index) in markers"
        :key="index"
        :marker="marker"
        :google="google"
        :map="map"
      />
    </template>
  </GoogleMapLoader>
      </v-container>
      <v-container>
        <!-- <v-card>
          <v-card-title>{{name}}</v-card-title>
          <li v-for="(data,index) in myJson" :key="index">{{data}}</li>
        </v-card>-->
      </v-container>
      <v-container>
        <!-- <li v-for="reviews in myJson" :key="reviews">{{reviews.restaurantName}}</li> -->

      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import GoogleMapLoader from './components/GoogleMapLoader'
import GoogleMapMarker from './components/GoogleMapMarker'
import resturants from './assets/resturantReview.json'
import Navbar from './components/Navbar'
// import review from "./assets/review.json";

export default {
  name: 'App',

  components: {
    Navbar,
    GoogleMapLoader,
    GoogleMapMarker
  },

  data () {
    return {
      resturants: resturants,
      markers: [
      ]
    }
  },

  computed: {
    mapConfig () {
      return {
        center: this.mapCenter
      }
    },

    mapCenter () {
      return this.markers[1].position
    }
  },

  methods: {
    mapLoaded ({ google, map, places, geometry }) {
    }
  }
}
</script>
