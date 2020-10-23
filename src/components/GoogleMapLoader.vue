<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'
export default {

  props: {
    mapConfig: Object,
    apiKey: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      google: null,
      map: null,
      geometry: null,
      places: null
    }
  },

  async mounted () {
    if (!this.google && !this.map) {
      const googleMapApi = await GoogleMapsApiLoader({
        libraries: ['places', 'geometry'],
        apiKey: this.apiKey
      })
      this.google = googleMapApi
      this.initializeMap()
    }
  },
  methods: {
    initializeMap () {
      const mapContainer = this.$refs.googleMap
      // if (!this.$refs.googleMap.textContent) {
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig)
      this.geometry = this.google.maps.geometry
      this.places = new this.google.maps.places.PlacesService(this.map)
      this.$emit('loaded', {
        google: this.google,
        map: this.map,
        places: this.places,
        geometry: this.geometry
      })
      const radius = 10000000
      // this.google.maps.Circle({
      //   center: this.mapConfig.center,
      //   radius,
      //   fillColor: '#FF0000',
      //   map: this.map
      // })
      const bounds = new this.google.maps.LatLngBounds()

      const gmarkers = this.resturants.map(resturant => {
        const marker = new this.google.maps.Marker({
          position: { lat: resturant.lat, lng: resturant.lng },
          map: this.map
        })
        marker.place_id = resturant.place_id
        const name = resturant.restaurantName + resturant.address
        const InfoWindow = new this.google.maps.InfoWindow({
          content: name
        })
        marker.addListener('click', () => {
          InfoWindow.open(this.map, marker)
        })
        return marker
      })
      this.map.addListener('click', (e) => {
        this.placeMarkerAndPanTo(e.latLng)
      })

      this.map.addListener('idle', () => {
        for (let i = 0; i < gmarkers.length; i++) {
          const currentPosition = this.google.maps.geometry.spherical.computeDistanceBetween(gmarkers[i].getPosition(), this.map.getCenter())
          if (currentPosition < radius) {
            bounds.extend(gmarkers[i].getPosition())
            gmarkers[i].setMap(this.map)
          } else {
            gmarkers[i].setMap(null)
          }
        }
      })
    },
    placeMarkerAndPanTo (position) {
      const form = document.createElement('label')
      form.setAttribute('for', 'name')
      form.innerText = 'Resturant name'

      const input = document.createElement('input')
      input.setAttribute('type', 'text')
      input.setAttribute('id', 'fname')
      input.setAttribute('name', 'name')

      const button = document.createElement('button')
      button.innerText = 'submit'
      const div = document.createElement('div')
      div.appendChild(form)
      div.appendChild(input)
      div.appendChild(button)

      button.addEventListener('click', (e) => {
        var details = input.value
        const foodPlaces = {
          place_id: Date.now(),
          restaurantName: details,
          address: '',
          lat: position.lat(),
          lng: position.lng(),
          ratings: []
        }
        console.log(foodPlaces)
        const x = document.getElementById('fname').value
        if (x === '' || x === null) {
          e.preventDefault()
        // return false why return false???
        } else {
          this.resturants.push(foodPlaces)
          InfoWindow.close()
        }
      })
      const InfoWindow = new this.google.maps.InfoWindow({
        content: div

      })
      this.map.panTo(position)
      const marker = new this.google.maps.Marker({
        position: position,
        map: this.map
      })
      InfoWindow.open(this.map, marker)
      InfoWindow.addListener('closeclick', function () {
        marker.setMap(null)
      })
    }
  }
}

</script>

<style>
.google-map {
  height: 500px;
  width: 100%;
}
</style>
