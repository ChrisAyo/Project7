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
          :color="colors[index]"
          class="white--text ma-5"
          v-bind="attrs"
          v-on="on"
        >
          {{ text }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item link>
          <v-list-item-title>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="2"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">{{ 2 }}</div>
            </v-row></v-list-item-title
          >
        </v-list-item>

        <v-list-item link>
          <v-list-item-title>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="3"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">{{ 3 }}</div>
            </v-row></v-list-item-title
          >
        </v-list-item>

        <v-list-item link>
          <v-list-item-title>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="4"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">{{ 4 }}</div>
            </v-row></v-list-item-title
          >
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">{{ 4.5 }}</div>
            </v-row></v-list-item-title
          >
        </v-list-item>
      </v-list>
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
};
</script>