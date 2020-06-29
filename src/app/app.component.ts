import { Component } from "@angular/core";
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

    this.board = this.boardService.board;
  }
  onInputGens(numOfGenerations) {
    this.numOfGenerations = numOfGenerations;
  }
  onPlay() {
    this.boardService.startGame(this.numOfGenerations);
    this.board = this.boardService.gameBoard;
  }
  onCellClick(i, j) {
    this.boardService.toggleCell(i, j);
  }
}
