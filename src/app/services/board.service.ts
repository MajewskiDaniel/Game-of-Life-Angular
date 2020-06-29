import { Injectable } from "@angular/core";
import * as Board from "./lifeboard";
import * as Game from "./game";
import { delay, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BoardService {
  public board;
  private livingCells: any[];
  public gameBoard;

  constructor() {}
  createBoard(height = 10, width = 10) {
    const board = new Board(height, width);
    this.board = board.createBoard();
    this.livingCells = [];
  }

  toggleCell(i, j) {
    this.board[i][j] = this.board[i][j] === 0 ? 1 : 0;

    // const idx = this.livingCells.findIndex(
    //   (cell) => cell[0] === i && cell[1] === j
    // );
    // if (idx === -1) {
    //   this.livingCells.push([i, j]);
    // } else {
    //   this.livingCells.splice(idx, 1);
    // }
  }

  startGame(generationLimit: number) {
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

    const game = new Game(this.board, this.livingCells, generationLimit);
    game.startTheGame();
    game.board$
      .pipe(
        //delay(500),
        tap((board) => console.table(board))
      )
      .subscribe((board) => (this.gameBoard = board));
  }
}
