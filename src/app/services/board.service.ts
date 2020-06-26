import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BoardService {
  constructor(width: number, height: number = width) {
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
