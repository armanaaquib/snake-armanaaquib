class Snake {
  constructor (positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
  }

  get status() {
    return {
      location: this.positions.slice(),
      direction: this.direction,
      species: this.type
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
    const head = this.positions[this.positions.length - 1];
    return head[0] === foodColId && head[1] === foodRowId;
  }

  increase() {
    this.positions.unshift(this.previousTail);
  }
}