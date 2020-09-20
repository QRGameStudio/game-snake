type Direction = "UP" | "LEFT" | "DOWN" | "RIGHT";
type Move = "LEFT" | "RIGHT";

class Snake {
  private body: number[][];
  private direction: Direction;

  constructor() {
    this.direction = "UP";
    this.body = [
      [5, 5],
      [5, 6],
      [5, 7],
      [5, 8],
    ];
  }

  move = () => {
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i] = [...this.body[i - 1]];
    }
    const newHeadX =
      this.direction === "LEFT" ? this.body[0][0] - 1 : this.direction === "RIGHT" ? this.body[0][0] + 1 : this.body[0][0];
    const newHeadY =
      this.direction === "UP" ? this.body[0][1] - 1 : this.direction === "DOWN" ? this.body[0][1] + 1 : this.body[0][1];
    this.body[0] = [newHeadX, newHeadY];
  };

  turn = (dir: Move) => {
    const modifier = dir === "LEFT" ? 1 : -1;
    const dirs = ["UP", "LEFT", "DOWN", "RIGHT"] as Direction[];
    this.direction = dirs[(dirs.indexOf(this.direction) + 4 + modifier) % 4];
  };

  grow = () => {
    this.body = [...this.body, [...this.body[this.body.length - 1]]];
  };

  getBody = () => [...this.body];
}

class Food {
  position: number[];
  private snake: Snake;

  constructor(snake: Snake) {
    this.snake = snake;
    this.regenerate();
  }

  regenerate = () => {
    while (true) {
      const x = Math.floor(10 * Math.random());
      const y = Math.floor(10 * Math.random());
      if (this.snake.getBody().filter((s) => s[0] === x && s[1] === y).length === 0) {
        this.position = [x, y];
        return;
      }
    }
  };
}

class Game {
  readonly snake: Snake;
  readonly food: Food;
  readonly playground: HTMLDivElement;

  constructor(playground: HTMLDivElement) {
    this.playground = playground;
    this.snake = new Snake();
    this.food = new Food(this.snake);
  }

  private clearPlayground = () => {
    this.playground.innerHTML = "";
  };

  private setRectDimensions = (e: HTMLDivElement, pos: number[]) => {
    const w = Math.floor(0.1 * (this.playground.getBoundingClientRect().width - 16));
    e.style.left = `${w * pos[0]}px`;
    e.style.top = `${w * pos[1]}px`;
    e.style.width = `${w - 2}px`;
    e.style.height = `${w - 2}px`;
  };

  private drawFood = () => {
    const e = document.createElement("div");
    e.className = "food";
    this.setRectDimensions(e, this.food.position);
    this.playground.appendChild(e);
  };

  private drawSnake = () => {
    this.snake.getBody().forEach((part) => {
      const e = document.createElement("div");
      e.className = "snakePart";
      this.setRectDimensions(e, part);
      this.playground.appendChild(e);
    });
  };

  private draw = () => {
    this.clearPlayground();
    this.drawFood();
    this.drawSnake();
  };

  private testGameOver = () => {
    if (
      this.snake.getBody()[0][0] < 0 ||
      this.snake.getBody()[0][0] > 9 ||
      this.snake.getBody()[0][1] < 0 ||
      this.snake.getBody()[0][1] > 9
    )
      return true;
    for (let i = 1; i < this.snake.getBody().length; i++) {
      if (
        this.snake.getBody()[i][0] === this.snake.getBody()[0][0] &&
        this.snake.getBody()[i][1] === this.snake.getBody()[0][1]
      )
        return true;
    }
    return false;
  };

  private eat = () => {
    if (this.food.position[0] === this.snake.getBody()[0][0] && this.food.position[1] === this.snake.getBody()[0][1]) {
      this.snake.grow();
      this.food.regenerate();
    }
  };

  tick = () => {
    this.draw();
    this.snake.move();
    this.eat();
    return this.testGameOver();
  };
}

const sleep = (sleepDuration) => {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {}
};

const init = () => {
  const content = document.getElementById("game-content");
  content.innerHTML = "";
  const width = Math.floor(Math.min(content.getBoundingClientRect().width, content.getBoundingClientRect().height) * 0.8);

  const playground = document.createElement("div");
  playground.className = "playground";
  playground.style.width = `${width}px`;
  playground.style.height = `${width}px`;
  playground.style.left = `${Math.floor((content.getBoundingClientRect().width - width) / 2)}px`;
  content.appendChild(playground);

  const game = new Game(playground);
  ["LEFT", "RIGHT"].forEach((dir) => {
    const btn = document.createElement("div");
    btn.className = "dirBtn " + dir.toLowerCase();
    btn.onclick = () => game.snake.turn(dir as Move);
    content.appendChild(btn);
  });

  tick(game);
};

const tick = (game: Game) => {
  if (game.tick()) {
    setTimeout(init, 2000);
  } else {
    setTimeout(() => tick(game), 500);
  }
};

window.onload = init;
