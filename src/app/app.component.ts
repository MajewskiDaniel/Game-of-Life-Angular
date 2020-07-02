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
    height: 30,
    width: 30,
  };
  public board = [];
  public generationLimit = 0;
  public gameSpeed;
  public showDescr = true;
  public descrBtn = "Hide description";
  public showRules = true;
  public rulesBtn = "Hide rules";

  constructor(private boardService: BoardService) {}
  ngOnInit() {}
  onDescriptionBtn() {
    this.showDescr = !this.showDescr;
    this.descrBtn = this.showDescr ? "Hide description" : "Show description";
  }
  onRulesBtn() {
    this.showRules = !this.showRules;
    this.rulesBtn = this.showRules ? "Hide rules" : "Show rules";
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
  // onPause() {
  //   // TODO: pause code
  // }
  onCellClick(i, j) {
    this.boardService.toggleCell(i, j);
  }
  onInputSpeed(gameSpeed) {
    this.gameSpeed = gameSpeed * 1000;
  }
}
