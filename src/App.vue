<template>
  <v-app>
    <Navbar
      :restaurants="restaurants"
      @select="chosen"
      :google="google"
      :map="map"
      :geometry="geometry"
    />
    <v-content>
      <v-container>
        <GoogleMapLoader
          :restaurant="restaurants"
          @loaded="mapLoaded"
          :mapConfig="{ center: { lat: 51.512829, lng: -0.128001 }, zoom: 12 }"
          apiKey="AIzaSyAWCeHVGAhiySpUN9nKx7hV-b1yRL-QtMk"
        >
          <template slot-scope="{ google, map }">
            <template v-for="restaurant in restaurants">
              <GoogleMapInfoWindow
                :google="google"
                :map="map"
                :content="restaurant.restaurantName"
                :key="restaurant.lat"
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
          <RestCard
            @update="addComments"
            :restaurant="currentRestaurant"
            :name="selectedResturantName"
            :address="address"
            :reviews="currentReviews"
            :googleAddress="currentAddress"
            :details="currentDetails"
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
import jsonRestaurants from "./assets/restaurantReview.json";
import Navbar from "./components/Navbar";
import GoogleMapInfoWindow from "./components/GoogleMapInfoWindow";
import ModalWindow from "./components/ModalWindow";
import RestCard from "./components/RestCard";
import RestInfoVue from "./components/RestInfo.vue";
import StreetView from "./components/StreetView";
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
    StreetView,
  },

  data() {
    return {
      currentDetails: [],
      currentAddress: "",
      currentReviews: [],
      localRestaurants: jsonRestaurants,
      googleRestaurants: [],
      markers: [],
      restaurantName: "",
      dialog: false,
      selectedResturantName: "",
      address: "",
      currentRestaurant: null,
      google: null,
      map: null,
      placesService: null,
      geometry: null,
      location: {
        lat: 0,
        lng: 0,
      },
    };
  },

  methods: {
    getLocation() {
      if (navigator.geolocation) {
        var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };

        function success(pos) {
          var crd = pos.coords;

          console.log("Your current position is:");
          console.log(`Latitude : ${crd.latitude}`);
          console.log(`Longitude: ${crd.longitude}`);
          console.log(`More or less ${crd.accuracy} meters.`);
        }

        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
      } else {
        console.log("Geolocation is not supported by this browser");
      }
    },
    showPosition(position) {
      this.location.lat = position.coords.latitude;
      this.location.lng = position.coords.longitude;
    },
    removeMarkers() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    mapLoaded({ google, map, placesService, geometry }) {
      //when the map is idle run nearbySearch for new location, (Event Listner)
      //consider renaming places to placeService
      this.google = google;
      this.map = map;
      this.placesService = placesService;
      this.geometry = geometry;
      this.getLocation();

      map.addListener("idle", () => {
        const request = {
          location: this.map.getCenter(),
          radius: 50,
          type: "restaurant",
        };

        this.removeMarkers();

        // another function that lists through current list of google markers - and sets the map to null
        placesService.nearbySearch(request, this.nearbySearchCallback);
      });
    },

    nearbySearchCallback(results, status) {
      console.log(results, status);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          const restaurant = results[i];
          // add marker array in data this.markers.push marker so the markers can be used and cleared.
          const marker = new google.maps.Marker({
            map: this.map,
            position: restaurant.geometry.location,
            label: restaurant.name,
          });
          this.markers.push(marker);
        }
        // this.googleRestaurants = results;
        this.googleRestaurants = this.createRestaurants(results);
      }
    },

    updateRestaurant(payload) {
      payload.place_id = Date.now();
      this.localRestaurants.push(payload);
    },
    chosen(payload) {
      this.currentAddress = "";
      this.currentDetails = [];
      this.currentReviews = [];
      this.currentRestaurant = payload;
      this.dialog = true;
      const request = {
        placeId: payload.place_id,
        fields: [
          "name",
          "formatted_address",
          "place_id",
          "geometry",
          "reviews",
          "rating",
          "formatted_phone_number",
        ],
      };
      // display the data inside to components, look inside Restcard props. v-for loop to dispaly the arrays
      // Data create currentReviews - then set it inside chosen place.reviews
      // rest card component define a new prop called reviews
      // placesServices needs to be defined here i need to give this application access.
      this.placesService.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if (place.reviews) {
            this.currentReviews = this.createReviews(place.reviews);
            this.currentAddress = place.formatted_address;
            // this.currentDetails = place;
          }
        }
      });
    },
    // data binding?
    createReviews(reviews) {
      const result = [];
      for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i];

        result.push({
          userName: review.author_name,
          stars: review.rating,
          comment: review.text,
        });
      }
      return result;
    },

    createRestaurants(data) {
      const restInfo = [];
      for (let i = 0; i < data.length; i++) {
        const item = data[i];

        restInfo.push({
          name: item.name,
          lat: item.geometry.location.lat(),
          lng: item.geometry.location.lng(),
          place_id: item.place_id,
          address: item.formatted_address,
        });
      }

      return restInfo;
    },

    addComments(payload) {
      this.currentReviews.push(payload);
      // this.googleRestaurants.ratings.push(payload);
    },
  },
  computed: {
    restaurants() {
      return [...this.localRestaurants, ...this.googleRestaurants];
      // find out way to call the computed function and then display...
    },
  },
};
</script>
