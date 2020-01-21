const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function (grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function () {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const eraseSnake = function (snake) {
  const snakeLength = snake.location.length;

  const [headColId, headRowId] = snake.location[snakeLength - 1];
  const cell = getCell(headColId, headRowId);
  cell.classList.remove("snake-head");

  const snakeBodyLocation = snake.location.slice(0, snakeLength - 1);
  snakeBodyLocation.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.remove(snake.species);
  });
};

const drawSnake = function (snake) {
  const snakeLength = snake.location.length;

  const [headColId, headRowId] = snake.location[snakeLength - 1];
  const cell = getCell(headColId, headRowId);
  cell.classList.add("snake-head");

  const snakeBodyLocation = snake.location.slice(0, snakeLength - 1);
  snakeBodyLocation.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const eraseFood = function (food) {
  let [colId, rowId] = food.location;
  const cell = getCell(colId, rowId);
  cell.classList.remove(food.type);
};

const drawFood = function (food) {
  const [colId, rowId] = food.location;
  const cell = getCell(colId, rowId);
  cell.classList.add(food.type);
};

const showScore = function (score) {
  const scoreCard = document.getElementById('score');
  scoreCard.innerText = score;
}

const erase = function (game) {
  eraseSnake(game.snakeStatus);
  eraseSnake(game.ghostSnakeStatus);
  eraseFood(game.foodStatus);
};

const draw = function (game) {
  drawSnake(game.snakeStatus);
  drawSnake(game.ghostSnakeStatus);
  drawFood(game.foodStatus);
  showScore(game.score)
};

const showResult = function (score) {
  const container = document.getElementsByClassName('container')[0];
  const resultMessage = '<div class="game-over"><h1>Game Over</h1><label>Score: ' + score + '</label><hr><button onclick="window.location.reload();">Restart Game</button></div>';
  container.innerHTML = resultMessage;
}

const updateGame = function (game, gameInterval, ghostTurnInterval) {
  erase(game);
  game.update();

  if (game.isOver()) {
    showResult(game.score);
    clearInterval(gameInterval);
    clearInterval(ghostTurnInterval);
    return;
  }

  draw(game);
};

const randomlyTurnGhostSnake = function (game, ghostTurnInterval) {
  let num = Math.random() * 100;

  if (num > 50) {
    game.turnGhostSnakeLeft();
  }

};

const initializeGame = function (game) {
  const ghostTurnInterval = setInterval(() => {
    randomlyTurnGhostSnake(game);
  }, 500);

  const gameInterval = setInterval(() => {
    updateGame(game, gameInterval, ghostTurnInterval);
  }, 100);

};

const handleKeyPress = game => {
  game.turnSnakeLeft();
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game);
};

const setup = function (game) {
  attachEventListeners(game);
  createGrids();
  draw(game);
  initializeGame(game);
};

const initSnake = function () {
  const snakePosition = [
    [40, 25],
    [41, 25],
    [42, 25]
  ];

  return new Snake(snakePosition, new Direction(EAST), 'snake');
};

const initGhost = function () {
  const ghostPosition = [
    [40, 30],
    [41, 30],
    [42, 30]
  ];

  return new Snake(ghostPosition, new Direction(SOUTH), 'ghost');
}

const main = function () {
  const snake = initSnake();
  const ghostSnake = initGhost();
  const food = new Food([5, 5], 'food', 1);

  const grid = {noOfCols: 100, noOfRows: 60};
  const game = new Game(snake, ghostSnake, food, grid);
  setup(game);
};
