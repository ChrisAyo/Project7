<template>
  <div>
    <slot :info-window="infoWindow" />
  </div>
</template>

<script>
export default {
  props: {
    google: {
      type: Object,
      required: true,
    },
    map: {
      type: Object,
      required: true,
    },
    marker: {
      type: Object,
    },
    content: {
      type: [String, Object, Array],
    },
  },
  data() {
    return {
      infoWindow: null,
    };
  },

  mounted() {
    this.infoWindow = new this.google.maps.InfoWindow({
      content: this.content,
    });
  },
};
</script>

