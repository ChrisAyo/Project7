<template>
  <div>
    <v-app-bar clipped-right app color="indigo" dark>
      <v-toolbar-title class="white--text">
        <span class="font-weight-light">Ola's</span>
        &nbsp;
        <span>Resturant Review</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <ModalWindow @newRestSubmit="newRestCreated" />
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        color="white"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app clipped right>
      <v-subheader> Resturants </v-subheader>
      <RangeSlider @rating="sliderChange" />
      <v-list dense>
        <div>
          <v-list-item-group active-class="primary">
            <v-list-item
              link
              v-for="(restaurant, index) in restaurants"
              :key="index"
              @click="showInfo(restaurant)"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ restaurant.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
import RangeSlider from "./RangeSlider";
import ModalWindow from "./ModalWindow";
export default {
  components: {
    RangeSlider,
    ModalWindow,
  },
  data: () => ({
    drawer: true,
  }),

  props: {
    restaurants: {
      type: Array,
      default() {
        return [];
      },
    },

    details: {
      type: [Object],
      default() {
        return {};
      },
    },
  },

  methods: {
    showInfo(restaurant) {
      this.$emit("select", restaurant);
    },
    sliderChange(range) {
      this.$emit("rating", range);
    },
    newRestCreated(restInfomartion) {
      this.$emit("newRestSubmit", restInfomartion);
    },
  },
};
</script>
<style >
.fill-height {
  height: calc(100vh - 52px);
}
</style>