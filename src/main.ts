/// <reference path="./types.d.ts" />
/// <reference path="./game.ts" />

const createButtons = (game: Game, content: HTMLElement) => {
  ["LEFT", "RIGHT"].forEach((dir) => {
    const btn = document.createElement("div");
    btn.className = "dirBtn " + dir.toLowerCase();
    btn.onclick = () => game.snake.turn(dir as Move);
    content.appendChild(btn);
  });
};

const gameOver = () => {
  const gameOverElement = document.createElement("div");
  gameOverElement.innerHTML = "GAME OVER";
  gameOverElement.className = "go";
  gameOverElement.onclick = (e) => {
    init();
  };
  document.getElementById("game-content").appendChild(gameOverElement);
};

const init = () => {
  const content = document.getElementById("game-content");
  content.innerHTML = "";
  const game = new Game(content);
  createButtons(game, content);
  tick(game);
};

const tick = (game: Game) => {
  // @ts-ignore
  new GTheme().apply();
  if (game.tick()) {
    gameOver();
  } else {
    setTimeout(() => tick(game), 500);
  }
};

window.onload = init;
