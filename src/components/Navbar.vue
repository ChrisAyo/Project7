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

      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        color="white"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- </v-toolbar> -->

    <!-- V model= drawer is meant to display the drawer however without it its still working ?? why  -->
    <v-navigation-drawer v-model="drawer" app right>
      <v-subheader> Resturants </v-subheader>
      <v-list dense>
        <div>
          <v-list-item-group v-model="selection" active-class="primary">
            <v-list-item
              link
              v-for="(review, index) in reviews"
              :key="index"
              @click="showInfo(review)"
            > 
              <v-list-item-content>
                <!-- <v-list-item-title
              @click="select"
              :class="{'active-plan': selected }"
              >{{ review.restaurantName }}</v-list-item-title> -->

                <v-list-item-title>
                  {{ review.restaurantName }}
                </v-list-item-title>

                <!-- <v-card class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 subtitle-1">$ • Italian, Cafe</div>

      <div>
        Small plates, salads & sandwiches - an intimate setting with 12 indoor
        seats plus patio seating.
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="reserve">
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card> -->
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    show: false,
    selected: false,
    selection: null,
    plan: null,
    selectedReview: null,
  }),

  props: {
    reviews: {
      // is reviews accesible globally ??
      type: Array,
      default() {
        return [];
      },
    },
  },

  methods: {
    showInfo(restaurant) {
      this.$emit("select",restaurant);
    },
  },
};
</script>
