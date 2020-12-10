<template>
  <div></div>
</template>
<script>
// import { POINT_MARKER_ICON_CONFIG } from "@/constants/mapSettings";

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
      required: true,
    },
    infoWindow: {
      type: Object,
    },
  },
  data() {
    return {
      gMarker: null,
    };
  },

  mounted() {
    this.gMarker = new this.google.maps.Marker({
      position: { lat: this.marker.lat, lng: this.marker.lng },
      map: this.map,
    });
    this.gMarker.addListener("click", () => {
      this.infoWindow.open(this.map, this.gMarker);
    });
  },
};
</script>
