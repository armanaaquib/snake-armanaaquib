class Game {
  constructor (snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.previousFood = food;
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

  get previousFoodStatus() {
    return {
      location: this.previousFood.position.slice()
    }
  }

  update() {
    this.snake.move();
    this.ghostSnake.move();

    if (this.snake.hasEaten(this.food)) {
      this.previousFood = this.food;
      this.generateFood();
      this.snake.increase();
    }
  }

  generateFood() {
    const colId = Math.round(Math.random() * 100);
    const rowId = Math.round(Math.random() * 60);

    this.food = new Food(colId, rowId);
  }

  turnSnakeLeft() {
    this.snake.turnLeft();
  }
}
