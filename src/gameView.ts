/// <reference path="./game.ts" />

class GameView {
  readonly playground: HTMLDivElement;
  readonly scoreBox: HTMLDivElement;
  readonly game: Game;

  constructor(game: Game, contentElement: HTMLElement) {
    this.game = game;
    this.playground = this.createPlayground(contentElement);
    this.scoreBox = this.createScoreBox(contentElement);
  }

  private createPlayground = (contentElement: HTMLElement) => {
    const width =
      10 *
        Math.floor(
          (Math.min(contentElement.getBoundingClientRect().width, contentElement.getBoundingClientRect().height) * 0.8 - 16) /
            10
        ) +
      16;
    const playground = document.createElement("div");
    playground.className = "pg";
    playground.style.width = `${width}px`;
    playground.style.height = `${width}px`;
    playground.style.left = `${Math.floor((contentElement.getBoundingClientRect().width - width) / 2)}px`;
    contentElement.appendChild(playground);
    return playground;
  };

  private createScoreBox = (contentElement: HTMLElement) => {
    const scoreBox = document.createElement("div");
    scoreBox.className = "sBox";
    contentElement.appendChild(scoreBox);
    return scoreBox;
  };

  private clearPlayground = () => {
    this.playground.innerHTML = "";
  };

  private setRectDimensions = (e: HTMLDivElement, pos: number[]) => {
    const w = Math.floor(0.1 * (this.playground.getBoundingClientRect().width - 16));
    e.style.left = `${w * pos[0]}px`;
    e.style.top = `${w * pos[1]}px`;
    e.style.width = `${w}px`;
    e.style.height = `${w}px`;
  };

  private drawFood = () => {
    const e = document.createElement("div");
    e.className = "food";
    this.setRectDimensions(e, this.game.food.position);
    this.playground.appendChild(e);
  };

  private drawSnake = () => {
    this.game.snake.getBody().forEach((part) => {
      const e = document.createElement("div");
      e.className = "snkPart";
      this.setRectDimensions(e, part);
      this.playground.appendChild(e);
    });
  };

  private updateScore = () => {
    this.scoreBox.innerHTML = `SCORE: ${this.game.getScore()} (${this.game.getHighScore() || 0})`;
  };

  draw = () => {
    this.clearPlayground();
    this.drawFood();
    this.drawSnake();
    this.updateScore();
  };
}
