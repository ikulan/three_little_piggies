import { Utils } from "../utils/utils";

export class Button {
  private _elem: HTMLButtonElement;
  private _img_elem: HTMLImageElement;

  constructor(public id: string) {
    this._elem = document.createElement("button");
    this._img_elem = new Image();
    this._img_elem.src = Utils.img_path(this.id);
    this._elem.appendChild(this._img_elem);
  }

  get element() {
    return this._elem;
  }
}
