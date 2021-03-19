<template>
  <div>
    <v-img height="150" :src="apiSource"> </v-img>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    lat: {
      type: Number,
      default() {
        return 0;
      },
    },
    lng: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  computed: {
    apiSource() {
      return `https://maps.googleapis.com/maps/api/streetview?location=${this.lat},${this.lng}&size=456x456&key=AIzaSyAWCeHVGAhiySpUN9nKx7hV-b1yRL-QtMk`;
    },
  },
  methods: {},
};
</script>

