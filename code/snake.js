class Snake {
  constructor (positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get status() {
    return {
      location: this.positions.slice(),
      direction: this.direction,
      species: this.type,
    }
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  hasEaten(food) {
    const [foodColId, foodRowId] = food.position;
    const [headColId, headRowId] = this.positions[this.positions.length - 1];
    return headColId === foodColId && headRowId === foodRowId;
  }

  increase() {
    this.positions.unshift(this.previousTail);
  }

  hasTouchedItself() {
    const [headColId, headRowId] = this.positions[this.positions.length - 1];
    const touchablePositions = this.positions.slice(0, this.positions.length - 2);

    return touchablePositions.some(([colId, rowId]) => {
      return headColId === colId && headRowId === rowId;
    });
  }

  hasTouched(snake) {
    const [headColId, headRowId] = this.positions[this.positions.length - 1];

    return snake.status.location.some(([colId, rowId]) => {
      return headColId === colId && headRowId === rowId;
    });
  }

  hasCrossed(grid) {
    const [headColId, headRowId] = this.positions[this.positions.length - 1];

    return headColId >= grid.noOfCols || headColId < 0 ||
      headRowId >= grid.noOfRows || headRowId < 0;
  }

  hasTouchedWall(grid) {
    const [headColId, headRowId] = this.positions[this.positions.length - 1];

    return headColId === grid.noOfCols - 1 || headColId === 0 ||
      headRowId === grid.noOfRows - 1 || headRowId === 0;
  }
}