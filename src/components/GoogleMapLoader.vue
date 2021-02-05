<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
export default {
  props: {
    mapConfig: Object,
    apiKey: {
      type: String,
      required: true,
    },
    restaurant: {
      // is reviews accesible globally ??
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      google: null,
      map: null,
      geometry: null,
      placesService: null,
    };
  },

  async mounted() {
    if (!this.google && !this.map) {
      const googleMapApi = await GoogleMapsApiLoader({
        libraries: ["places", "geometry"],
        apiKey: this.apiKey,
      });
      this.google = googleMapApi;
      this.initializeMap();
    }
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      // if (!this.$refs.googleMap.textContent) {
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
      this.geometry = this.google.maps.geometry;
      this.placesService = new this.google.maps.places.PlacesService(this.map);
      this.$emit("loaded", {
        google: this.google,
        map: this.map,
        placesService: this.placesService,
        geometry: this.geometry,
      });

      // const pyrmont = { lat: 51.512829, lng: -0.128001 };
      // const service = new google.maps.places.PlacesService(this.map);
      // service.nearbySearch(
      //   { location: pyrmont, radius: 50, type: "restaurant" },
      //   (results, status) => {
      //     if (status !== "OK") return;
      //     for (var i = 0; i < results.length; i++) {
      //       var restaurant = results[i];
      //       const marker = new google.maps.Marker({
      //         map: this.map,
      //         position: restaurant.geometry.location,
      //         label: restaurant.name,
      //       });

      //       // var myLatlng = new google.maps.LatLng(restaurant., res);
      //       // var marker = new google.maps.Marker({
      //       //   position: myLatlng,
      //       //   title: restaurant.title,
      //       // });

      //       // To add the marker to the map, call setMap();

      //       //add event listent
      //       // marker.addListener("click", () => {
      //       //   console.log("hello");
      //       //   // this.infoWindow.open(this.map, this.gMarker);
      //       // });
      //       // marker.setMap(this.map);
      //     }

      //   }
      // );
    },
  },
};
</script>

<style>
.google-map {
  height: 500px;
  width: 100%;
}
</style>
