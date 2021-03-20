<template>
  <v-card class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <StreetView :lat="restaurant.lat" :lng="restaurant.lng" />
    <!-- <v-list-item-content v-for="(review, index) in reviews" :key="index"> -->
    <v-card-title>{{ restaurant.name }}</v-card-title>
    <!-- </v-list-item-content> -->
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

      <div class="my-4 subtitle-1">{{ restaurant.address }}</div>
      <!-- <div class="my-4 subtitle-1">{{ googleAddress }}</div> -->
      <!-- <div class="my-4 subtitle-1">{{ googleAddress }}</div> -->
    </v-card-text>
    <v-card-text>
      <div class="my-4 subtitle-1"><h2>Reviews</h2></div>

      <div v-for="(info, place_id) in reviews" :key="place_id">
        <b
          ><u>{{ info.userName }}:</u></b
        >
        Rating:{{ info.stars }}- Comments {{ info.comment }}
      </div>
    </v-card-text>
    <!-- <v-card-title>{{ reviews[0].rating }}</v-card-title> -->

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Leave a Review</v-card-title>

    <v-card-text>
      <v-text-field v-model="name" label="Name"></v-text-field>
      <v-col cols="12">
        <v-text-field
          type="number"
          step="any"
          v-model="stars"
          label="stars"
        ></v-text-field>
        <v-text-field v-model="comment" label="Leave a comment"></v-text-field>
      </v-col>

      <v-card-actions>
        <v-btn color="deep darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="deep darken-1" text @click="updateComment()">
          Save
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import StreetView from "./streetView";

export default {
  components: {
    StreetView,
  },
  data: () => ({
    dialog: false,
    loading: false,
    selection: 0,
    comment: "",
    stars: null,
    name: "",
  }),
  props: {
    details: {
      type: [Array],
      default() {
        return [];
      },
    },
    googleAddress: {
      type: [String],
    },
    // name: {
    //   type: [Object, String],
    //   default: {},
    // },
    address: {
      type: [Object, String],
      default() {
        return {};
      },
    },
    restaurant: {
      type: Object,
      default() {
        return {};
      },
    },
    reviews: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    updateComment() {
      this.$emit("update", {
        stars: this.stars,
        comment: this.comment,
        userName: this.name,
      });
      this.stars = null;
      this.comment = null;
      this.name = null;
    },

    // Getdetails( ) from google, reviews ratings etc....
    //call the function get details on click of this.currentRestaurant,
    // this.currentRestaurant then = to the result of getdetails to populate that field
  },
};
</script>