class Food {
  constructor (colId, rowId, value) {
    this.colId = colId;
    this.rowId = rowId;
    this.value = value;
  }

  get position() {
    return [this.colId, this.rowId];
  }

  get point() {
    return this.value;
  }
}