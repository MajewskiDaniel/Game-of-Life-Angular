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

  constructor(private boardService: BoardService) {}
  ngOnInit() {}
  onInputWidth(value: number) {
    this.boardDimensions.width = value;
    console.log(value);
  }
  onInputHeight(value: number) {
    this.boardDimensions.height = value;
    console.log(value);
  }
  onGenerate() {
    this.boardService.createBoard(
      this.boardDimensions.height,
      this.boardDimensions.width
    );
    console.table(this.boardService.board);
  }
}
