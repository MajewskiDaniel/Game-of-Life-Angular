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
  public generationLimit = 0;
  public gameSpeed;

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
  onInputGens(generationLimit) {
    this.generationLimit = generationLimit;
  }
  onStart() {
    this.boardService.startGame(this.generationLimit, this.gameSpeed);
    this.board = this.boardService.board;
  }
  onPause() {
    // TODO: pause code
  }
  onCellClick(i, j) {
    this.boardService.toggleCell(i, j);
  }
  onInputSpeed(gameSpeed) {
    this.gameSpeed = gameSpeed * 1000;
  }
}
