import { autobind } from "../decorators/autobind";
import { Cell } from "./cell";
import { Tiles } from "../models/tiles";
import { dataStore } from "./data_store";

export class Board {
  private elem: HTMLDivElement;
  private cells: Cell[];
  private _shape = [
    [Tiles.Invalid, Tiles.Empty, Tiles.Empty, Tiles.Invalid],
    [Tiles.Empty, Tiles.Empty, Tiles.Empty, Tiles.Empty],
    [Tiles.Pig, Tiles.Empty, Tiles.Pig, Tiles.Empty],
    [Tiles.Invalid, Tiles.Empty, Tiles.Pig, Tiles.Empty],
  ];

  constructor() {
    this.elem = document.getElementById("board")! as HTMLDivElement;
    this.cells = [];

    this.renderContent();
  }

  private renderContent() {
    for (let row = 0; row < 4; row++) {
      let rowElem = document.createElement("div");
      rowElem.className = "row";

      for (let col = 0; col < 4; col++) {
        let cell = new Cell(row, col, this._shape[row][col]);
        cell.addListener("dragenter", this.enterCellHandler);
        this.cells.push(cell);
        rowElem.appendChild(cell.element);
      }
      this.elem.appendChild(rowElem);
    }
  }

  private valid_place(row: number, col: number) {
    let data = dataStore.getData();
    const DIR = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];

    for (let i = 0; i < 4; i++) {
      let n = data.cell_plan[i];
      while (n > 0) {
        let cell = this.getCell(row + n * DIR[i][0], col + n * DIR[i][1]);
        if (cell === null || cell.type !== Tiles.Empty) {
          return false;
        }
        n--;
      }
    }

    return true;
  }

  @autobind
  private enterCellHandler(cell: Cell) {
    let [row, col] = cell.location;
    let valid = this.valid_place(row, col);
    console.log(`dragEnter: ${cell.id}, valid_place: ${valid}`);
  }

  getCell(row: number, col: number) {
    if (0 <= row && row < 4 && 0 <= col && col < 4) {
      let idx = row * 4 + col;
      return this.cells[idx];
    }
    return null;
  }
}
