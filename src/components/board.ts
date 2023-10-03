import { Cell } from "./cell";

export class Board {
  private elem: HTMLDivElement;
  private cells: Cell[];

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
        let cell = new Cell(row, col);
        this.cells.push(cell);
        rowElem.appendChild(cell.element);
      }
      this.elem.appendChild(rowElem);
    }
  }
}