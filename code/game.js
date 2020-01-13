class Game {
  constructor (snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
  }

  get status() {
    return {snake: this.snake, ghostSnake: this.ghostSnake, food: this.food};
  }

  update() {
    this.snake.move();
    this.ghostSnake.move();

    if (this.snake.hasEaten(this.food)) {
      this.food.changePosition();
      this.snake.increase();
    }
  }
}