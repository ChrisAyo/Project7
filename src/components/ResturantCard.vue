<template >
  <v-card>
    <v-card-title>{{name}}</v-card-title>
  </v-card>

  <!-- <h1>lets go shopping</h1> -->
</template>

<script>
// import file from "./assets/resturantReview.json";

export default {
  props: {
    name: String
  },

  data () {
    return {
      // myJson: file
    }
  }
}
</script>
