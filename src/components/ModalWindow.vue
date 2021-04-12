<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Add Restaurant
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add New Restaurant</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="restaurantName"
                  label="Restaurant Name"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-container>
            <GoogleMapLoader
              @loaded="mapLoaded"
              :mapConfig="{
                center: { lat: 51.512829, lng: -0.128001 },
                zoom: 12,
              }"
              apiKey="AIzaSyAWCeHVGAhiySpUN9nKx7hV-b1yRL-QtMk"
            >
              <template slot-scope="{ google, map }">
                <template v-for="marker in markers">
                  <GoogleMapMarker
                    :marker="marker"
                    :google="google"
                    :map="map"
                    :key="marker.lat"
                  />
                </template>
              </template>
            </GoogleMapLoader>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="select"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import GoogleMapLoader from "./GoogleMapLoader.vue";
import GoogleMapMarker from "./GoogleMapMarker";
export default {
  components: { GoogleMapLoader, GoogleMapMarker },
  data: () => ({
    dialog: false,
    restaurantName: "",
    address: "",
    location: null,
    lat: null,
    lng: null,
    pointer: [],
    markers: [],
    rating: 0.0,
    google: null,
    map: null,
    geometry: null,
    placesService: null,
  }),

  methods: {
    select() {
      this.$emit("newRestSubmit", {
        name: this.restaurantName,
        lat: parseFloat(this.lat),
        lng: parseFloat(this.lng),
        address: this.address,
        rating: 3,
      });
      console.log(this.restaurantName);
      this.restaurantName = null;
      this.lat = null;
      this.lng = null;
      this.address = null;
      this.rating = null;
      this.markers = [];
      this.dialog = false;
    },
    mapLoaded({ google, map }) {
      google.maps.event.addListener(map, "click", (event) => {
        this.lat = event.latLng.lat();
        this.lng = event.latLng.lng();
        this.markers = [{ lat: this.lat, lng: this.lng }];
      });
    },
  },
};
</script>
 <style >
/* .fill-height {
  height: calc(100vh - 52px);
} */
</style>
