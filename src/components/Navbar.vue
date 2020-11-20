
<template>
  <!-- <v-app> -->
  <nav>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title class="white--text">
        <span class="font-weight-light">Ola's</span>
        &nbsp;
        <span>Resturant Review</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn flat color="grey"> -->
      <!-- click.stop and click gives me the same reaction
      and also its pushing everything to one side, and not shifting-->

      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- </v-toolbar> -->

    <!-- V model= drawer is meant to display the drawer however without it its still working ?? why  -->
    <v-navigation-drawer v-model="drawer" app right>
      <v-subheader>
        Resturants
      </v-subheader>
      <v-list dense >

        <v-list-item link  v-for="(review,index) in reviews" :key="index">

          <v-list-item-content >
            <v-list-item-title>{{review.restaurantName}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
  </nav>
  <!-- </v-app> -->
</template>

<script>
// import json from "./assets/data.json";
// computed instead of data ??
export default {
  data: () => ({
    drawer: true
  }),

  props: {
    reviews: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
