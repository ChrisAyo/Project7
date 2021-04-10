<template>
  <!-- <v-app> -->
  <div>
    <v-app-bar clipped-right app color="indigo" dark>
      <v-toolbar-title class="white--text">
        <span class="font-weight-light">Ola's</span>
        &nbsp;
        <span>Resturant Review</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <ModalWindow />

      <!-- <v-btn flat color="grey"> -->
      <!-- click.stop and click gives me the same reaction
      and also its pushing everything to one side, and not shifting-->

      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        color="white"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- </v-toolbar> -->

    <!-- V model= drawer is meant to display the drawer however without it its still working ?? why  -->
    <v-navigation-drawer v-model="drawer" app clipped right>
      <v-subheader> Resturants <RatingBtn /> </v-subheader>
      <RangeSlider @rating="sliderChange" />
      <v-list dense>
        <div>
          <v-list-item-group active-class="primary">
            <v-list-item
              link
              v-for="(restaurant, index) in restaurants"
              :key="index"
              @click="showInfo(restaurant)"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ restaurant.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
import RatingBtn from "./ratingBtn";
import RangeSlider from "./RangeSlider";
import ModalWindow from "./ModalWindow";
export default {
  components: {
    RatingBtn,
    RangeSlider,
    ModalWindow,
  },
  data: () => ({
    drawer: true,
    show: false,
    selected: false,
    selection: null,
    plan: null,
    selectedReview: null,
  }),

  props: {
    restaurants: {
      // is reviews accesible globally ??
      type: Array,
      default() {
        return [];
      },
    },
  },

  methods: {
    showInfo(restaurant) {
      this.$emit("select", restaurant);
    },

    sliderChange(range) {
      this.$emit("rating", range);
      // this.$emit("slider", range);
    },
  },

  // Getdetails( ) from google, reviews ratings etc....
  //call the function get details on click of this.currentRestaurant,
  // this.currentRestaurant then = to the result of getdetails to populate that field
};
</script>
