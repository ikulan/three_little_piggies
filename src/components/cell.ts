import { autobind } from "../decorators/autobind";
import { CellUtils } from "../utils/cell_utils";
import { DragTarget } from "../models/drag_drop";
import { Tiles } from "../models/tiles";
import { EventPublisher } from "./event_publisher";

export class Cell extends EventPublisher<HTMLDivElement> implements DragTarget {
  static EVENTS = ["dragenter", "dragleave", "drop"];

  private _loc: number[]; // [row, col]
  private _type = Tiles.Invalid;

  constructor(row: number, col: number, type: Tiles) {
    super(`${row},${col}`, Cell.EVENTS);

    this._loc = [row, col];
    this.type = type;

    this.configure();
  }

  get location() {
    return this._loc;
  }

  get type() {
    return this._type;
  }

  set type(type: Tiles) {
    this._type = type;

    this._elem.classList.remove(...this._elem.classList);
    this._elem.classList.add(CellUtils.CLASS_NAME);

    if (type === Tiles.Invalid) {
      this._elem.classList.add(CellUtils.CLASS_INVALID);
    } else if (type === Tiles.Lawn) {
      this._elem.classList.add(CellUtils.CLASS_LAWN);
    } else if (type === Tiles.House) {
      this._elem.classList.add(CellUtils.CLASS_LAWN);
      this._elem.classList.add(CellUtils.CLASS_HOUSE);
    } else if (type === Tiles.Pig) {
      this._elem.classList.add(CellUtils.CLASS_PIG);
    }
  }

  protected initElement(): HTMLDivElement {
    let elem = document.createElement("div");
    elem.classList.add(CellUtils.CLASS_NAME);
    return elem;
  }

  protected configure() {
    this._elem.addEventListener("dragenter", this.dragEnterHandler);
    this._elem.addEventListener("dragover", this.dragOverHandler);
    this._elem.addEventListener("drop", this.dropHandler);
    this._elem.addEventListener("dragleave", this.dragLeaveHandler);
  }

  @autobind
  dragEnterHandler(event: DragEvent): void {
    event.preventDefault();
    // check if the block fits on this position
    this.notify("dragenter");
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    // so the drop event can be activated
    event.preventDefault();
  }

  @autobind
  dragLeaveHandler(event: DragEvent): void {
    this.setDroppable(false);
  }

  @autobind
  dropHandler(event: DragEvent): void {
    if (this.isDroppable()) {
      // place the block on game board
      this.notify("drop");
    }
  }

  setDroppable(turn_on: boolean) {
    if (turn_on === true) {
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
