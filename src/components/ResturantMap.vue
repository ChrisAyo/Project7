<template>
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
</template>

<script>
import GoogleMapLoader from './GoogleMapLoader'
import GoogleMapMarker from './GoogleMapMarker'
import resturants from '../assets/resturantReview.json'

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker
  },
  // import JSON data to ResturnatMap
  data () {
    return {
      resturants: resturants,
      markers: [
        // { position: { lat: 51.512829, lng: -0.128001 } },
        // { position: { lat: 51.512429, lng: -0.126896 } },
        // { position: { lat: 51.513951, lng: -0.122732 } },
        // { position: { lat: 51.5123591, lng: -0.1372875 } }
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
      // return this.markers[1].position this doesnt seem to make a diffrence ???
    }
  },

  methods: {
    mapLoaded ({ google, map, places, geometry }) {

    }
  }
}

</script>
