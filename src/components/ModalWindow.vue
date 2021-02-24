<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Add Restaurant
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="restaurantName"
                  label="Restaurant Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  type="number"
                  step="any"
                  v-model="lat"
                  label="Lat"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  type="number"
                  step="any"
                  v-model="lng"
                  label="Lng"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="address" label="Address"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="rating" label="Ratings"></v-text-field>
              </v-col>
              <!-- <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col> -->
            </v-row>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="select"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  // props:{
  //    google: {
  //     type: Object,
  //     required: true,
  //   },
  //   map: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  data: () => ({
    dialog: false,
    restaurantName: "",
    address: "",
    lat: null,
    lng: null,
    rating: "",
  }),

  // mounted(){
  //   new google.maps.places.Autocomplete(document.getElementById("autocomplete"))

  // },

  methods: {
    select() {
      this.$emit("submit", {
        name: this.restaurantName,
        lat: parseFloat(this.lat),
        lng: parseFloat(this.lng),
        // address: this.address,
        rating: this.ratings,
      });
      this.restaurantName = null;
      this.lat = null;
      this.lng = null;
      this.address = null;
      this.ratings = null;
      this.dialog = false;

      //  var obj = $.parseJSON( '{ "name": "John" }')
      // var newObj =  {
      // 'restaurantName': $('[name="First"]').val(),
      // 'lat': $('[name="Middle"]').val(),
      // 'lng': $('[name="Last"]').val(),
    },
  },
};
</script>

