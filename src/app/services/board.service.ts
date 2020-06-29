import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BoardService {
  public board = [];

  constructor() {}
  createBoard(height, width) {
    for (let i = 0; i < height; i++) {
      this.board[i] = new Array(width);
    }
    this.fillTheBoard(height, width);
    return this.board;
  }
  fillTheBoard(height, width) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        this.board[i][j] = 0;
      }
    }
  }
}
