class Game {
  constructor (snake, ghostSnake, food, grid) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.grid = grid;
    this.scoreCard = new ScoreCard();
  }

  get snakeStatus() {
    return this.snake.status;
  }

  get ghostSnakeStatus() {
    return this.ghostSnake.status;
  }

  get foodStatus() {
    return {
      location: this.food.position.slice(),
    };
  }

  get score() {
    return this.scoreCard.score;
  }

  update() {
    this.snake.move();
    this.ghostSnake.move();

    if (this.snake.hasEaten(this.food)) {
      this.generateFood();
      this.snake.increase();
      this.scoreCard.update(this.food.point);
    }
  }

  generateFood() {
    const colId = Math.floor(Math.random() * 100);
    const rowId = Math.floor(Math.random() * 60);

    this.food = new Food(colId, rowId, 1);
  }

  turnSnakeLeft() {
    this.snake.turnLeft();
  }

  turnGhostSnakeLeft() {
    this.ghostSnake.turnLeft();
  }

  isOver() {
    return this.snake.hasTouchedItself() ||
      this.snake.hasTouched(this.ghostSnake) ||
      this.ghostSnake.hasTouched(this.snake) ||
      this.snake.hasCrossed(this.grid);
  }
}
