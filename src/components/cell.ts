import { autobind } from "../decorators/autobind";
import { CellUtils } from "../utils/cell_utils";
import { dataStore } from "./data_store";
import { DragTarget } from "../models/drag_drop";

export class Cell implements DragTarget {
  readonly id: string;
  private _elem: HTMLDivElement;

  constructor(
    private row: number,
    private col: number,
    public invalid = false
  ) {
    this._elem = document.createElement("div");
    this.id = `${row},${col}`;

    // HTMLElement properties
    this._elem.id = this.id;
    this._elem.classList.add(CellUtils.CLASS_NAME);
    if (this.invalid || CellUtils.isInvalidCell(this.id)) {
      this._elem.classList.add(CellUtils.CLASS_INVALID);
    }

    this.configure();
  }

  private configure() {
    this._elem.addEventListener("dragenter", this.dragEnterHandler);
    this._elem.addEventListener("dragover", this.dragOverHandler);
    this._elem.addEventListener("drop", this.dropHandler);
    this._elem.addEventListener("dragleave", this.dragLeaveHandler);
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
