class Game {
  #snake;
  #ghostSnake;
  #food;
  #grid;
  #scoreCard;
  #noOfEatenFood;
  constructor (snake, ghostSnake, food, grid) {
    this.#snake = snake;
    this.#ghostSnake = ghostSnake;
    this.#food = food;
    this.#grid = grid;
    this.#scoreCard = new ScoreCard();
    this.#noOfEatenFood = 0;
  }

  get snakeStatus() {
    return this.#snake.status;
  }

  get ghostSnakeStatus() {
    return this.#ghostSnake.status;
  }

  get foodStatus() {
    return this.#food.status;
  }

  get score() {
    return this.#scoreCard.score;
  }

  update() {
    this.#snake.move();
    this.#ghostSnake.move();
    this.#ghostSnake.wrapMove(this.#grid);

    if (this.#snake.hasEaten(this.#food.status)) {

      if (this.#food.status.type === 'food') {
        this.#snake.increase();
      }

      this.#noOfEatenFood += 1;
      this.#scoreCard.update(this.#food.status.point);
      const createFood = this.#noOfEatenFood % 5 === 0 ? () => this.generateSpecialFood() : () => this.generateFood();
      createFood();
    }
  }

  generateFood() {
    const colId = Math.floor(Math.random() * 100);
    const rowId = Math.floor(Math.random() * 60);

    this.#food = new Food([colId, rowId], 'food', 1);
  }

  generateSpecialFood() {
    const colId = Math.floor(Math.random() * 100);
    const rowId = Math.floor(Math.random() * 60);

    this.#food = new Food([colId, rowId], 'special-food', 10);
  }

  turnSnake(direction) {
    this.#snake['turn' + direction]();
  }

  turnGhostSnakeLeft() {
    this.#ghostSnake.turnLeft();
  }

  isOver() {
    return this.#snake.hasTouchedItself() ||
      this.#snake.hasTouched(this.#ghostSnake) ||
        this.#snake.hasCrossed(this.#grid);
  }
}
