import { Component } from "@angular/core";
import { GameService } from "./services/game.service";
import { BoardService } from "./services/board.service";
import { Board } from "../board";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Game of Life";

  public board: Board;

  // constructor(private gameService: GameService) {}
  ngOnInit() {}
  onGenerate() {}
}
