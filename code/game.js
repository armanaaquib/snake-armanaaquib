class Game {
  constructor (snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.score = new Score();
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

  get gameScore() {
    return this.score.currentScore;
  }

  update() {
    this.snake.move();
    this.ghostSnake.move();

    if (this.snake.hasEaten(this.food)) {
      this.generateFood();
      this.snake.increase();
      this.score.increment();
    }
  }

  generateFood() {
    const colId = Math.floor(Math.random() * 100);
    const rowId = Math.floor(Math.random() * 60);

    this.food = new Food(colId, rowId);
  }

  turnSnakeLeft() {
    this.snake.turnLeft();
  }

  turnGhostSnakeLeft() {
    this.ghostSnake.turnLeft();
  }

  isOver() {
    return this.snake.hasTouchedItself();
  }
}
