"use strict";

class LifeBoard {
  constructor(width = 25, height = 25) {
    this.width = width;
    this.height = height;
    this.board = [];
  }
  createBoard() {
    for (let i = 0; i < this.height; i++) {
      this.board[i] = new Array(this.width);
    }
    this.fillTheBoard();
    return this.board;
  }
  fillTheBoard() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.board[i][j] = 0;
      }
    }
  }
}

module.exports = LifeBoard;
