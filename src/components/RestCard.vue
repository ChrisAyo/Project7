<template>
  <v-card class="mx-auto my-12" max-width="374">
    <StreetView :lat="restaurant.lat" :lng="restaurant.lng" />
    <v-card-title>{{ restaurant.name }}</v-card-title>
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
    </v-card-text>
    <v-card-text>
      <div class="my-4 subtitle-1"><h2>Reviews</h2></div>

      <div v-for="(restaurant, place_id) in restaurant.ratings" :key="place_id">
        <b>
          <u>{{ restaurant.userName }}</u>
        </b>
        Rating:{{ restaurant.stars }}- Comments: {{ restaurant.comment }}
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>

    <v-card-title>Leave a Review</v-card-title>
    <v-form>
      <v-card-text>
        <v-col cols="12">
          <v-text-field v-model="name" required label="Name"></v-text-field>
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
</template>

<script>
import StreetView from "./streetView";

export default {
  components: {
    StreetView,
  },
  data: () => ({
    dialog: false,
    comment: "",
    stars: null,
    name: "",
  }),
  props: {
    restaurant: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  methods: {
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