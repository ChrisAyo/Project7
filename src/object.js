class Resturant {
  constructor (id, name, position, ratings) {
    this.id = id
    this.name = name
    this.position = position
    this.ratings = ratings
    this.marker = null
  }

  addMarker (google, map) {
      this.marker = new google.maps.Marker({
          position: this.position,
          map: map
  }
}

class App {
  constrcutor (google, mapElement, mapOptions) {
    this.map = new this.google.maps.Map(mapElement, this.mapConfig)
    this.resturant = []
  }
}

