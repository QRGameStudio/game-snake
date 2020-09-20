/// <reference path="./types.d.ts" />

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

  getLength = () => this.body.length;

  initialLength = 4;
}
