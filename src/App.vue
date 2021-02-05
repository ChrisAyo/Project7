<template>
  <v-app>
    <Navbar
      :restaurants="restaurants"
      @select="chosen"
      :google="google"
      :map="map"
      :placesService="placesService"
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
          <RestCard
            @update="addComments"
            :restaurant="currentRestaurant"
            :name="selectedResturantName"
            :address="address"
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
        // navigator.geolocation.getCurrentPosition((position) => {
        //   console.log(position);
        //   this.location.lat = position.coords.latitude;
        //   this.location.lng = position.coords.longitude;
        //   this.map.setCenter({
        //     lat: position.coords.latitude,
        //     lng: position.coords.longitude,
        //   });
        // });
      } else {
        console.log("Geolocation is not supported by this browser");
      }
    },
    showPosition(position) {
      this.location.lat = position.coords.latitude;
      this.location.lng = position.coords.longitude;
      // this.map.setCenter({
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude,
      // });
      // console.log("lat");
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

      // To add the marker to the map, call setMap();

      // add event listent
      // marker.addListener("click", () => {
      //   console.log("hello");
      //   // this.infoWindow.open(this.map, this.gMarker);
      // });
      // marker.setMap(this.map);
      //     }
      //   }
      // );
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
          this.googleRestaurants = results;
          this.markers.push(marker);
        }
      }
    },

    updateRestaurant(payload) {
      // why payload???
      this.restaurants.push(payload);
    },
    chosen(payload) {
      this.currentRestaurant = payload;
      this.dialog = true;
      const request = {
        placeId: "ChIJoQ6CZc0EdkgRrPCbvL6UQ8M",
        fields: [
          "name",
          "formatted_address",
          "place_id",
          "geometry",
          "reviews",
          "rating",
          "user_ratings_total",
        ],
      };

      placesService.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(place.reviews);
          // const marker = new google.maps.Marker({
          //   map,
          //   position: place.geometry.location,
          // });

          // google.maps.event.addListener(marker, "click", function () {
          //   infowindow.setContent(
          //     "<div><strong>" +
          //       place.name +
          //       "</strong><br>" +
          //       "Place ID: " +
          //       place.place_id +
          //       "<br>" +
          //       place.formatted_address +
          //       "</div>"
          //   );
          //   infowindow.open(map, this);
          // });
        }
      });
    },
    addComments(payload) {
      this.currentRestaurant.ratings.push(payload);
    },
    // display(payload) {
    //   this.plan = payload;
    //   console.log(payload)
    // },

    //  callback = (results, status) {
    //   if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     console.log(results)
    //     // for (var i = 0; i < results.length; i++) {
    //     //   createMarker(results[i]);
    //     // }
    //       }
    //     }
  },
  computed: {
    restaurants() {
      return [...this.localRestaurants, ...this.googleRestaurants];
      // find out way to call the computed function and then display...
    },
  },
};
</script>
