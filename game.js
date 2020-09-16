let direction = "";
let snake = [];
let food = undefined;
let playground = undefined;

const changeDirection = (dir) => {
  const modifier = dir === "left" ? 1 : -1;
  const dirs = ["UP", "LEFT", "DOWN", "RIGHT"];
  direction = dirs[(dirs.indexOf(direction) + 4 + modifier) % 4];
};

const genFood = () => {
  while (true) {
    const x = Math.floor(10 * Math.random());
    const y = Math.floor(10 * Math.random());
    if (snake.filter((s) => s[0] === x && s[1] === y).length === 0) {
      food = [x, y];
      return;
    }
  }
};

const drawSnake = () => {
  playground.innerHTML = "";
  const e = document.createElement("div");
  e.className = "food";
  e.style = `left: ${8 * food[0]}vw; top: ${8 * food[1]}vh`;
  playground.appendChild(e);
  snake.forEach((part) => {
    const e = document.createElement("div");
    e.className = "snakePart";
    e.style = `left: ${8 * part[0]}vw; top: ${8 * part[1]}vh`;
    playground.appendChild(e);
  });
};

const testGameOver = () => {
  if (snake[0][0] < 0 || snake[0][0] > 9 || snake[0][1] < 0 || snake[0][1] > 9) return true;
  for (let i = 1; i < snake.length; i++) {
    if (snake[i][0] === snake[0][0] && snake[i][1] === snake[0][1]) return true;
  }
  return false;
};

const eat = () => {
  if (food[0] === snake[0][0] && food[1] === snake[0][1]) {
    snake = [...snake, [...snake[snake.length - 1]]];
    genFood();
  }
};

const moveSnake = () => {
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = [...snake[i - 1]];
  }
  const newHeadX = direction === "LEFT" ? snake[0][0] - 1 : direction === "RIGHT" ? snake[0][0] + 1 : snake[0][0];
  const newHeadY = direction === "UP" ? snake[0][1] - 1 : direction === "DOWN" ? snake[0][1] + 1 : snake[0][1];
  snake[0] = [newHeadX, newHeadY];
};

const sleep = (sleepDuration) => {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {}
};

const init = () => {
  document.body.innerHTML = "";

  playground = document.createElement("div");
  playground.className = "playground";
  document.body.appendChild(playground);

  ["left", "right"].forEach((dir) => {
    const btn = document.createElement("div");
    btn.className = "dirBtn " + dir;
    btn.onclick = () => changeDirection(dir);
    document.body.appendChild(btn);
  });

  direction = "UP";
  snake = [
    [5, 5],
    [5, 6],
    [5, 7],
    [5, 8],
  ];
  genFood();

  tick();
};

const tick = () => {
  drawSnake();
  moveSnake();
  eat();
  if (!testGameOver()) {
    setTimeout(tick, 500);
  } else {
    setTimeout(init, 2000);
  }
};

window.onload = init;
