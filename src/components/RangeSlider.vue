<template>
  <v-card flat color="transparent">
    <v-subheader>Restaurant Ratings Filter</v-subheader>

    <v-card-text>
      <v-row>
        <v-col class="px-4">
          <p>Min rating</p>
          <v-text-field
            min="1"
            :max="max"
            v-model="range[0]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 60px"
            @change="sliderChange"
          ></v-text-field>
          <p>Max rating</p>
          <v-text-field
            max="5"
            :min="min"
            v-model="range[1]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 60px"
            @change="sliderChange"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      min: 1,
      max: 5,
      range: [1, 5],
    };
  },
  methods: {
    sliderChange() {
      this.$emit("rating", this.range);
    },
  },
};
</script>