<template>
  <!-- <v-dialog> -->
  <v-card class="mx-auto my-12" max-width="374">
    <!-- <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template> -->
    <StreetView :lat="restaurant.lat" :lng="restaurant.lng" />
    <!-- <v-list-item-content v-for="(review, index) in reviews" :key="index"> -->
    <v-card-title>{{ restaurant.name }}</v-card-title>
    <!-- </v-list-item-content> -->
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="restaurant.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
        <div class="grey--text ml-4">{{ restaurant.rating }}</div>
        <div v-if="restaurant.ratings" class="grey--text ml-4">
          ({{ restaurant.ratings.length }})
        </div>
      </v-row>
      <div class="my-4 subtitle-1">{{ restaurant.address }}</div>
      <!-- <div class="my-4 subtitle-1">{{ googleAddress }}</div> -->
    </v-card-text>
    <v-card-text>
      <div class="my-4 subtitle-1"><h2>Reviews</h2></div>
      <!--Two loops for displaying ratings?</div> -->
      <div v-for="(restaurant, place_id) in restaurant.ratings" :key="place_id">
        <b>
          <u>{{ restaurant.userName }} </u>
        </b>
        Rating:{{ restaurant.stars }}- Comments {{ restaurant.comment }}
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>

    <v-card-title>Leave a Review</v-card-title>
    <v-form v-model="valid">
      <v-card-text>
        <v-text-field v-model="name" required label="Name"></v-text-field>
        <v-col cols="12">
          <v-text-field
            type="number"
            step="any"
            min="1"
            max="5"
            v-model="stars"
            label="stars"
          ></v-text-field>
          <v-text-field
            v-model="comment"
            label="Leave a comment"
          ></v-text-field>
        </v-col>

        <v-card-actions>
          <!-- Make the close button actually close the window -->
          <v-btn color="deep darken-1" text @click="$emit('closeWindow')">
            Close
          </v-btn>
          <v-btn color="deep darken-1" text @click="updateComment()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-form>
  </v-card>
  <!-- </v-dialog> -->
</template>

<script>
import StreetView from "./streetView";

export default {
  components: {
    StreetView,
  },
  data: () => ({
    valid: false,
    dialog: false,
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
    // stars can only be between 1-5 the user can't input more
    closeModal() {
      this.$emit("closeWindow");
    },

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
  },
};
</script>