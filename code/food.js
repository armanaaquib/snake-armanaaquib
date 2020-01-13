class Food {
  constructor (colId, rowId) {
    this.colId = colId;
    this.rowId = rowId;
  }

  get position() {
    return [this.colId, this.rowId];
  }

  changePosition() {
    this.colId = Math.round(Math.random() * 100);
    this.rowId = Math.round(Math.random() * 60);
  }
}