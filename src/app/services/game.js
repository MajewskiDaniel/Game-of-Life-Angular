"use strict";
// import { BehaviorSubject } from "rxjs";
const Rx = require("rxjs");

class GameOfLife {
  constructor(board, initialCells, generationLimit) {
    this.board = board;
    this.initialCells = initialCells;
    this.initialFlag = true;
    this.endGameFlag = false;
    this.livingCells = [];
    this.numberOfGenerations = 1;
    this.generationLimit = generationLimit;
    this.emergingCells = [];
    this.dyingCells = [];
    this.survivingCells = [];
    this.surroundings = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    this.board$ = new Rx.BehaviorSubject();
  }
  startTheGame() {
    if (!this.endGameFlag) {
      this.enliveInitialCells();
      this.numberOfGenerations++;
      this.checkLivingCells();
      this.isAnyoneBorn();
      this.letThemLive();
      this.letThemDie();
      this.refreshLivingCells();
      this.board$.next(this.board);
      console.log(`Generation: ${this.numberOfGenerations}`);
      // console.table(this.board);
      setTimeout(() => {
        if (!this.isTheGameOver()) {
          this.startTheGame();
        }
      }, 500);
    } else this.endGame();
  }
  enliveInitialCells() {
    if (this.initialFlag) {
      this.initialCells.forEach((cell) => {
        this.board[cell[0]][cell[1]] = 1;
      });
      this.livingCells = this.initialCells;
      this.initialFlag = false;
      // console.log(`Generation: ${this.numberOfGenerations}`);
      // console.table(this.board);
    }
  }
  checkLivingCells() {
    this.livingCells.forEach((cell) => {
      let surroundingLife = 0;
      for (let i = 0; i < this.surroundings.length; i++) {
        if (
          cell[0] + this.surroundings[i][0] >= 0 &&
          cell[0] + this.surroundings[i][0] < this.board.length &&
          this.board[cell[0] + this.surroundings[i][0]][
            cell[1] + this.surroundings[i][1]
          ] === 1
        ) {
          surroundingLife++;
        }
      }
      if (surroundingLife === 2 || surroundingLife === 3) {
        this.survivingCells.push(cell);
      } else this.dyingCells.push(cell);
    });
  }
  isAnyoneBorn() {
    this.livingCells.forEach((cell) => {
      let surroundingCoordinates = [];
      for (let i = 0; i < this.surroundings.length; i++) {
        if (
          cell[0] + this.surroundings[i][0] >= 0 &&
          cell[0] + this.surroundings[i][0] < this.board.length &&
          cell[1] + this.surroundings[i][1] >= 0 &&
          cell[1] + this.surroundings[i][1] < this.board[0].length
        ) {
          surroundingCoordinates.push([
            cell[0] + this.surroundings[i][0],
            cell[1] + this.surroundings[i][1],
          ]);
        }
      }
      surroundingCoordinates.forEach((cell) => {
        let surroundingLife = 0;
        for (let i = 0; i < this.surroundings.length; i++) {
          if (
            cell[0] + this.surroundings[i][0] >= 0 &&
            cell[0] + this.surroundings[i][0] < this.board.length &&
            this.board[cell[0] + this.surroundings[i][0]][
              cell[1] + this.surroundings[i][1]
            ] === 1
          ) {
            surroundingLife++;
          }
        }
        if (surroundingLife === 3) {
          this.emergingCells.push(cell);
        }
      });
      surroundingCoordinates.length = 0;
    });
  }
  letThemLive() {
    this.emergingCells
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      .forEach((cell) => {
        this.board[cell[0]][cell[1]] = 1;
      });
  }
  letThemDie() {
    this.dyingCells.forEach((cell) => {
      this.board[cell[0]][cell[1]] = 0;
    });
    this.dyingCells.length = 0;
  }
  refreshLivingCells() {
    this.livingCells.length = 0;
    for (let row = 0; row < this.board.length; row++) {
      for (let column = 0; column < this.board[row].length; column++) {
        if (this.board[row][column] === 1) {
          this.livingCells.push([row, column]);
        }
      }
    }
    this.emergingCells.length = 0;
    this.survivingCells.length = 0;
  }
  isTheGameOver() {
    return (
      this.numberOfGenerations === this.generationLimit ||
      this.livingCells.length === 0
    );
  }
  endGame() {
    this.endGameFlag = true;
  }
}

module.exports = GameOfLife;
