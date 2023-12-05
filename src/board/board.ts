import autobind from "../utils/autobind";
import Cell from "./cell";
import EventPublisher from "../interface/event_publisher";
import { Tiles } from "./tiles";
import { DataModel, dataStore } from "../utils/data_store";

export default class Board extends EventPublisher<HTMLDivElement> {
  static EVENTS = ["placeblock"];
  private blueprint: Tiles[][];
  private cells: Cell[];

  constructor(blueprint: Tiles[][]) {
    super("board", Board.EVENTS);

    this.blueprint = blueprint;
    this.cells = [];

    this.renderCells();
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
        let cell = new Cell(row, col, this.blueprint[row][col]);
        cell.subscribe("dragenter", this.enterCellHandler);
        cell.subscribe("drop", this.dropCellHandler);
        this.cells.push(cell);
        rowElem.appendChild(cell.element);
      }
      this._elem.appendChild(rowElem);
    }
  }

  private validPlace(row: number, col: number) {
    let data: DataModel = dataStore.getData();
    const DIR = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];

    for (let i = 0; i < 4; i++) {
      let n = data.cell_plan[i];
      while (n >= 0) {
        let cell = this.getCell(row + n * DIR[i][0], col + n * DIR[i][1]);
        if (cell === null || cell.type !== Tiles.Empty) {
          return false;
        }
        n--;
      }
    }

    return true;
  }

  private placeBlock(row: number, col: number) {
    let data: DataModel = dataStore.getData();
    const DIR = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];

    let cell = this.getCell(row, col)!;
    cell.type = Tiles.House;
    cell.rotateHouse(data.r_degree);

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
      if (this.validPlace(row, col) === true) {
        cell.setDroppable(true);
      }
    }
  }

  @autobind
  private dropCellHandler(cell: Cell) {
    if (cell.isDroppable()) {
      let [row, col] = cell.location;
      this.placeBlock(row, col);
      cell.setDroppable(false);
      this.notify("placeblock");
    }
  }

  getCell(row: number, col: number) {
    if (0 <= row && row < 4 && 0 <= col && col < 4) {
      let idx = row * 4 + col;
      return this.cells[idx];
    }
    return null;
  }

  reset() {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        let cell = this.getCell(row, col)!;
        cell.type = this.blueprint[row][col];
      }
    }
  }
}
