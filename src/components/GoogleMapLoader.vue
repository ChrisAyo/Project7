<template>
  <div class="google-map" ref="googleMap">
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
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
      this.geometry = this.google.maps.geometry;
      this.placesService = new this.google.maps.places.PlacesService(this.map);
      this.$emit("loaded", {
        google: this.google,
        map: this.map,
        placesService: this.placesService,
        geometry: this.geometry,
      });
    },
  },
};
</script>

<style>
.google-map {
  height: 100%;
  width: 100%;
  min-height: 500px;
  min-width: 100%;
}
</style>
