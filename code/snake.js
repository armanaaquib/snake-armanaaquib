class Snake {
  #positions;
  #direction;
  #type;
  #previousTail;
  constructor (positions, direction, type) {
    this.#positions = positions.slice();
    this.#direction = direction;
    this.#type = type;
    this.#previousTail = [0, 0];
  }

  get status() {
    return {
      location: this.#positions.slice(),
      direction: this.#direction,
      species: this.#type,
    }
  }

  turnLeft() {
    this.#direction.turnLeft();
  }

  turnRight() {
    this.#direction.turnRight();
  }

  move() {
    const [headX, headY] = this.#positions[this.#positions.length - 1];
    this.#previousTail = this.#positions.shift();

    const [deltaX, deltaY] = this.#direction.delta;

    this.#positions.push([headX + deltaX, headY + deltaY]);
  }

  wrapMove(grid) {
    const snakeLength = this.#positions.length;

    let [headX, headY] = this.#positions[snakeLength - 1];
    headX = (headX + grid.noOfCols) % grid.noOfCols;
    headY = (headY + grid.noOfRows) % grid.noOfRows;

    this.#positions[snakeLength - 1] = [headX, headY];
  }

  hasEaten(food) {
    const [foodColId, foodRowId] = food.location;
    const [headColId, headRowId] = this.#positions[this.#positions.length - 1];
    return headColId === foodColId && headRowId === foodRowId;
  }

  increase() {
    this.#positions.unshift(this.#previousTail);
  }

  hasTouchedItself() {
    const [headColId, headRowId] = this.#positions[this.#positions.length - 1];
    const touchablePositions = this.#positions.slice(0, this.#positions.length - 2);

    return touchablePositions.some(([colId, rowId]) => {
      return headColId === colId && headRowId === rowId;
    });
  }

  hasTouched(snake) {
    const [headColId, headRowId] = this.#positions[this.#positions.length - 1];

    return snake.status.location.some(([colId, rowId]) => {
      return headColId === colId && headRowId === rowId;
    });
  }

  hasCrossed(grid) {
    const [headColId, headRowId] = this.#positions[this.#positions.length - 1];

    return headColId >= grid.noOfCols || headColId < 0 ||
      headRowId >= grid.noOfRows || headRowId < 0;
  }

}