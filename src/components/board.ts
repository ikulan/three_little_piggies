import { autobind } from "../decorators/autobind";
import { Cell } from "./cell";
import { Component } from "./component";
import { Tiles } from "../models/tiles";
import { DataModel, dataStore } from "./data_store";

export class Board extends Component<HTMLDivElement> {
  private static instance: Board; // Singleton
  private cells: Cell[];
  private _blueprint = [
    [Tiles.Invalid, Tiles.Empty, Tiles.Empty, Tiles.Invalid],
    [Tiles.Empty, Tiles.Empty, Tiles.Empty, Tiles.Empty],
    [Tiles.Pig, Tiles.Empty, Tiles.Pig, Tiles.Empty],
    [Tiles.Invalid, Tiles.Empty, Tiles.Pig, Tiles.Empty],
  ];

  private constructor() {
    super("board");

    this.cells = [];

    this.renderCells();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Board();
    return this.instance;
  }

  protected initElement(): HTMLDivElement {
    return document.getElementById("board")! as HTMLDivElement;
  }

  protected configure(): void {}

  private renderCells() {
    for (let row = 0; row < 4; row++) {
      let rowElem = document.createElement("div");
      rowElem.className = "row";

      for (let col = 0; col < 4; col++) {
        let cell = new Cell(row, col, this._blueprint[row][col]);
        cell.subscribe("dragenter", this.enterCellHandler);
        cell.subscribe("drop", this.dropCellHandler);
        this.cells.push(cell);
        rowElem.appendChild(cell.element);
      }
      this._elem.appendChild(rowElem);
    }
  }

  private valid_place(row: number, col: number) {
    let data: DataModel = dataStore.getData();
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

  private place_block(row: number, col: number) {
    let data: DataModel = dataStore.getData();
    const DIR = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];

    let cell = this.getCell(row, col)!;
    cell.type = Tiles.House;
    cell.rotate_house(data.r_degree);

    for (let i = 0; i < 4; i++) {
      let n = data.cell_plan[i];
      while (n > 0) {
        let cell = this.getCell(row + n * DIR[i][0], col + n * DIR[i][1]);
        if (cell !== null && cell.type === Tiles.Empty) {
          cell.type = Tiles.Lawn;
        }
        n--;
      }
    }
  }

  @autobind
  private enterCellHandler(cell: Cell) {
    // set droppable if the block can place on the cell
    if (!cell.isDroppable()) {
      let [row, col] = cell.location;
      if (this.valid_place(row, col) === true) {
        cell.setDroppable(true);
      }
    }
  }

  @autobind
  private leaveCellHandler(cell: Cell) {}

  @autobind
  private dropCellHandler(cell: Cell) {
    if (cell.isDroppable()) {
      console.log(`perform placing block`);
      let [row, col] = cell.location;
      this.place_block(row, col);
      cell.setDroppable(false);
    }
  }

  getCell(row: number, col: number) {
    if (0 <= row && row < 4 && 0 <= col && col < 4) {
      let idx = row * 4 + col;
      return this.cells[idx];
    }
    return null;
  }

  clearBlocks() {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        let cell = this.getCell(row, col)!;
        cell.type = this._blueprint[row][col];
      }
    }
  }
}

// Singleton
export const board = Board.getInstance();
