import { Injectable } from "@angular/core";
import * as Board from "./lifeboard";
import * as Game from "./game";
// import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BoardService {
  public board;
  private livingCells: any[];
  public gameBoard;

  constructor() {}
  createBoard(height: number, width: number) {
    const board = new Board(height, width);
    this.board = board.createBoard();
    this.livingCells = [];
  }

  toggleCell(i, j) {
    this.board[i][j] = this.board[i][j] === 0 ? 1 : 0;
  }

  startGame(generationLimit: number, gameSpeed: number = 500) {
    const getLivingCellsFromBoard = (board) => {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === 1) {
            this.livingCells.push([i, j]);
            this.board[i][j] = 0;
          }
        }
      }
    };
    getLivingCellsFromBoard(this.board);
    // console.log(gameSpeed);
    const game = new Game(this.board, this.livingCells, generationLimit);
    setTimeout(() => {
      game.startTheGame();
      game.board$.subscribe((board) => (this.board = board));
    }, gameSpeed);
  }
  // endGame() {}
}
