import { Component } from "@angular/core";
// import { GameService } from "./services/game.service";
import { BoardService } from "./services/board.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Game of Life";

  public boardDimensions = {
    height: 0,
    width: 0,
  };
  public board = [];
  public numOfGenerations = 0;

  constructor(private boardService: BoardService) {}
  ngOnInit() {}
  onInputWidth(value: number) {
    this.boardDimensions.width = value;
  }
  onInputHeight(value: number) {
    this.boardDimensions.height = value;
  }
  onGenerate() {
    this.boardService.createBoard(
      this.boardDimensions.height,
      this.boardDimensions.width
    );
    console.table(this.boardService.board);
    this.board = this.boardService.board;
  }
  onInputGens(numOfGenerations) {
    this.numOfGenerations = numOfGenerations;
  }
  onPlay() {}
  onCellClick(row, column) {
    this.board[row][column] = 1; //need to toggle 1/0 and class .living
  }
}
