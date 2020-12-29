<template>
  <v-card class="mx-auto my-12" max-width="374">
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
    <!-- <v-list-item-content v-for="(review, index) in reviews" :key="index"> -->
    <v-card-title>{{ restaurant.restaurantName }}</v-card-title>
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

      <div v-for="(rating, name) in restaurant">
        {{ name }}:{{ rating }}
        </div>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Leave a Review</v-card-title>

    <v-card-text>
      <v-col cols="12">
        <v-text-field v-model="comment" label="Leave a comment"></v-text-field>
      </v-col>
      <!-- <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group> -->
      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text
          @click="updateComment()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: 0,
    comment: "",
  }),
  props: {
    name: {
      type: [Object, String],
      default: {},
    },
    address: {
      type: [Object, String],
      default() {
        return {};
      },
    },
    ratings: {
      type: Array,
      default() {
        return [];
      },
    },
    restaurant: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    updateComment() {
      this.$emit("update", {
        comment: this.comment,
      });
    },
  },
};
</script>