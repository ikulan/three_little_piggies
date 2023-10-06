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
  private _type = Tiles.Invalid;
  private listeners: Listeners = {
    dragenter: null,
    dragleave: null,
    drop: null,
  };

  constructor(row: number, col: number, type: Tiles) {
    this.id = `${row},${col}`;

    // HTMLElement properties
    this._elem = document.createElement("div");
    this._elem.id = this.id;
    this._elem.classList.add(CellUtils.CLASS_NAME);

    this._loc = [row, col];
    this.type = type;

    //this.setClass();

    this.configure();
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

  set type(type: Tiles) {
    this._type = type;

    if (type === Tiles.Invalid) {
      this._elem.classList.add(CellUtils.CLASS_INVALID);
    } else if (type === Tiles.Empty) {
      this._elem.classList.remove(...this._elem.classList);
      this._elem.classList.add(CellUtils.CLASS_NAME);
    } else if (type === Tiles.Lawn) {
      this._elem.classList.add(CellUtils.CLASS_LAWN);
    } else if (type === Tiles.House) {
      this._elem.classList.add(CellUtils.CLASS_LAWN);
      this._elem.classList.add(CellUtils.CLASS_HOUSE);
    } else if (type === Tiles.Pig) {
      //this._elem.classList.add(CellUtils.CLASS_OCCUPIED);
      this._elem.classList.add(CellUtils.CLASS_PIG);
    }
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
    event.preventDefault();
    // check if the block fits on this position
    this.notifyListeners("dragenter");
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    // so the drop event can be activated
    event.preventDefault();
  }

  @autobind
  dragLeaveHandler(event: DragEvent): void {
    console.log(`dragLeave: ${this.id}`);
  }

  @autobind
  dropHandler(event: DragEvent): void {
    if (this.isDroppable()) {
      // place the block on game board
      this.notifyListeners("drop");
    }
  }

  setDroppable(turn_on: boolean) {
    if (turn_on === true) {
      console.log("turn on drppable");
      this._elem.classList.add("droppable");
    } else {
      this._elem.classList.remove("droppable");
    }
  }

  isDroppable() {
    return this._elem.classList.contains("droppable");
  }

  rotate_house(degree: number) {
    this._elem.style.transform = `rotate(${degree}deg)`;
  }
}
