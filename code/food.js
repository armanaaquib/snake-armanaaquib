class Food {
  #location;
  #type;
  #value;
  constructor (location, type, value) {
    this.#location = location.slice();
    this.#type = type;
    this.#value = value;
  }

  get status() {
    return {
      location: this.#location.slice(),
      point: this.#value,
      type: this.#type
    }
  }
}