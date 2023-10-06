import { Component } from "./component";
import { Utils } from "../utils/utils";

export class Button extends Component<HTMLButtonElement> {
  private _img_elem: HTMLImageElement;

  constructor(id: string) {
    super(id);

    this._img_elem = new Image();
    this._img_elem.src = Utils.img_path(this.id);
    this._elem.appendChild(this._img_elem);
  }

  protected initElement(): HTMLButtonElement {
    return document.createElement("button");
  }

  protected configure(): void {}
}
