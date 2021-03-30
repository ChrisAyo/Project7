<template>
  <v-row justify="space-around">
    <v-menu
      v-for="([text, rounded], index) in btns"
      :key="text"
      :rounded="rounded"
      offset-y
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          @click="test()"
          :color="colors[index]"
          class="white--text ma-5"
          v-bind="attrs"
          v-on="on"
        >
          {{ text }}
        </v-btn>
      </template>
    </v-menu>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    btns: [["Filter ratings", "lg"]],
    colors: ["teal darken-1"],
    // items: [...Array(4)].map((_, i) => `Item ${i}`),
  }),

  methods: {
    test() {
      this.$emit("range", [
        // minValue this.rating,
      ]);
    },
  },
};
</script>