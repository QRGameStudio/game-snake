/// <reference path="./types.d.ts" />
/// <reference path="./snake.ts" />
/// <reference path="./food.ts" />
/// <reference path="./gameView.ts" />

class Game {
  readonly snake: Snake;
  readonly food: Food;
  readonly gameView: GameView;
  private highScore: number;

  constructor(contentElement: HTMLElement) {
    this.snake = new Snake();
    this.food = new Food(this.snake);
    this.gameView = new GameView(this, contentElement);
    this.highScore = this.loadHighScore();
  }

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

  private saveHighScore = () => {
    localStorage.setItem("QRSnakeHS", Math.max(this.getScore(), this.highScore).toString());
  };

  private loadHighScore = () => {
    return parseInt(localStorage.getItem("QRSnakeHS") || "0");
  };

  getHighScore = () => this.highScore;

  getScore = () => this.snake.getLength() - this.snake.initialLength;

  tick = () => {
    this.snake.move();
    this.eat();
    if (this.testGameOver()) {
      this.saveHighScore();
      return true;
    }
    this.gameView.draw();
    return false;
  };
}
