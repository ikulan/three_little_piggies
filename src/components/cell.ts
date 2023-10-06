import { autobind } from "../decorators/autobind";
import { CellUtils } from "../utils/cell_utils";
import { dataStore } from "./data_store";
import { DragTarget } from "../models/drag_drop";
import { Tiles } from "../models/tiles";

export class Cell implements DragTarget {
  readonly id: string;
  private _elem: HTMLDivElement;
  private _loc: number[]; // [row, col]

  constructor(
    private _row: number,
    private _col: number,
    private _type: Tiles
  ) {
    this._elem = document.createElement("div");
    this.id = `${_row},${_col}`;
    this._loc = [_row, _col];

    // HTMLElement properties
    this._elem.id = this.id;
    this.setClass();

    this.configure();
  }

  private configure() {
    this._elem.addEventListener("dragenter", this.dragEnterHandler);
    this._elem.addEventListener("dragover", this.dragOverHandler);
    this._elem.addEventListener("drop", this.dropHandler);
    this._elem.addEventListener("dragleave", this.dragLeaveHandler);
  }

  private setClass() {
    this._elem.classList.add(CellUtils.CLASS_NAME);
    if (this._type === Tiles.Invalid) {
      this._elem.classList.add(CellUtils.CLASS_INVALID);
    } else if (this._type === Tiles.Pig) {
      this._elem.classList.add(CellUtils.CLASS_PIG);
    }
  }

  @autobind
  dragEnterHandler(event: DragEvent): void {
    // check if the block fits on this position
    let data = dataStore.getData();
    console.log(`dragEnter: ${this.id}, receive data: ${data}`);
    console.log(data);
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    //console.log(`dragOver: ${this.id}`);
  }

  @autobind
  dragLeaveHandler(event: DragEvent): void {
    console.log(`dragLeave: ${this.id}`);
  }

  @autobind
  dropHandler(event: DragEvent): void {
    console.log(`drop: ${this.id}`);
  }

  get element() {
    return this._elem;
  }

  addPig() {
    this._elem.classList.add(CellUtils.CLASS_PIG);
  }

  removePig() {
    this._elem.classList.remove(CellUtils.CLASS_PIG);
  }

  addHouse() {
    this._elem.classList.add(CellUtils.CLASS_HOUSE);
  }

  removeHouse() {
    this._elem.classList.remove(CellUtils.CLASS_HOUSE);
  }
}
