import { autobind } from "../decorators/autobind";
import { CellUtils } from "../utils/cell_utils";
import { dataStore } from "./data_store";
import { DragTarget } from "../models/drag_drop";
import { Tiles } from "../models/tiles";

interface Listeners {
  [id: string]: any;
}

export class Cell implements DragTarget {
  readonly id: string;
  private _elem: HTMLDivElement;
  private _loc: number[]; // [row, col]
  private listeners: Listeners = {
    dragenter: null,
    dragleave: null,
    drop: null,
  };

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

  private notifyListeners(type: string) {
    // send changes to listener functions
    this.listeners[type](this);
  }

  addListener(type: string, listenerFn: any) {
    this.listeners[type] = listenerFn;
  }

  @autobind
  dragEnterHandler(event: DragEvent): void {
    // check if the block fits on this position
    this.notifyListeners("dragenter");
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

  get location() {
    return this._loc;
  }

  get type() {
    return this._type;
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
