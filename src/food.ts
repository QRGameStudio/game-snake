/// <reference path="./snake.ts" />

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
