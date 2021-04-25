<template>
  <v-app>
    <Navbar
      :restaurants="restaurants"
      @select="chosen"
      :google="google"
      :map="map"
      :geometry="geometry"
      @rating="filterRating"
      @newRestSubmit="updateRestaurant"
    />
    <v-content class="fill-height">
      <GoogleMapLoader
        :restaurant="restaurants"
        @loaded="mapLoaded"
        :mapConfig="{ center: { lat: 51.512829, lng: -0.128001 }, zoom: 12 }"
        apiKey="AIzaSyAWCeHVGAhiySpUN9nKx7hV-b1yRL-QtMk"
      >
        <template slot-scope="{ google, map }">
          <template v-if="currentPosition">
            <GoogleMapMarker
              :marker="currentPosition"
              :google="google"
              :map="map"
            />
          </template>
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
      <v-container>
        <v-dialog v-model="dialog">
          <RestCard
            @update="addComments"
            :restaurant="currentRestaurant"
            :reviews="currentReviews"
            :googleAddress="currentAddress"
            @closeWindow="closeModal"
          />
        </v-dialog>
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
      currentPosition: null,
      minValue: 1,
      maxValue: 5,

      currentAddress: "",
      currentReviews: [],
      localRestaurants: jsonRestaurants,
      googleRestaurants: [],
      markers: [],
      restaurantName: "",
      dialog: false,

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
    getLocation(map) {
      if (navigator.geolocation) {
        var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };
        const self = this;
        function success(pos) {
          var crd = pos.coords;
          map.setCenter({ lat: crd.latitude, lng: crd.longitude });
          self.currentPosition = {
            lat: crd.latitude,
            lng: crd.longitude,
            icon: true,
          };
          console.log(this);
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
      this.google = google;
      this.map = map;
      this.placesService = placesService;
      this.geometry = geometry;
      this.getLocation(map);

      map.addListener("idle", () => {
        const request = {
          location: this.map.getCenter(),
          radius: 50,
          type: "restaurant",
        };

        this.removeMarkers();

        // function that lists through current list of google markers - and sets the map to null
        placesService.nearbySearch(request, this.nearbySearchCallback);
      });
    },

    nearbySearchCallback(results, status) {
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
      this.googleRestaurants = this.createRestaurants(results);
    },

    updateRestaurant(payload) {
      payload.place_id = Date.now();
      this.localRestaurants.push(payload);
    },
    chosen(payload) {
      this.currentAddress = "";
      this.currentReviews = [];
      this.currentRestaurant = payload;
      this.dialog = true;
      if (!this.currentRestaurant.ratings) {
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

        this.placesService.getDetails(request, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (place.reviews) {
              let reviews = this.createReviews(place.reviews);
              this.currentAddress = place.formatted_address;
              payload.address = place.formatted_address;
              this.currentRestaurant.ratings = reviews;
            }
          }
        });
      }
    },
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
          rating: item.rating,
        });
      }

      return restInfo;
    },

    addComments(payload) {
      this.currentRestaurant.ratings.push(payload);
      let totalSum = 0;
      for (let i = 0; i < this.currentRestaurant.ratings.length; i++) {
        totalSum = parseInt(this.currentRestaurant.ratings[i].stars) + totalSum;
        console.log(totalSum);
      }

      this.currentRestaurant.rating = Math.floor(
        totalSum / this.currentRestaurant.ratings.length
      );
      // this.dialog = false;
      // this.currentReviews.push(payload);
      // use the rating number to create a new average rating and set it to this.current/restaurant.rating what it is actively looking at.
    },

    filterRating(payload) {
      this.minValue = payload[0];
      this.maxValue = payload[1];
      console.log(this.minValue, this.maxValue);
    },
    closeModal() {
      this.dialog = false;
    },
  },

  computed: {
    restaurants() {
      let filteredRestaurants = [];

      for (let i = 0; i < this.localRestaurants.length; i++) {
        const rating = this.localRestaurants[i].rating;

        if (rating >= this.minValue && rating <= this.maxValue) {
          filteredRestaurants.push(this.localRestaurants[i]);
        }
      }

      for (let i = 0; i < this.googleRestaurants.length; i++) {
        const rating = this.googleRestaurants[i].rating;

        if (rating >= this.minValue && rating <= this.maxValue) {
          filteredRestaurants.push(this.googleRestaurants[i]);
        }
      }
      return filteredRestaurants;
    },
  },
};
</script>

<style>
.fill-height {
  height: calc(100vh - 64px);
}
</style>