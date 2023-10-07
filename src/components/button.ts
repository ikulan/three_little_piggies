import { board } from "./board";
import { Component } from "./component";
import { Utils } from "../utils/utils";

export class Button extends Component<HTMLButtonElement> {
  private _img_elem: HTMLImageElement;

  constructor(id: string) {
    super(id);

    this._img_elem = new Image();
    this._img_elem.src = Utils.img_path(this.id);
    this._elem.appendChild(this._img_elem);

    this.configure();
  }

  protected initElement(): HTMLButtonElement {
    return document.createElement("button");
  }

  protected configure(): void {
    if (this.id === "restart") {
      this._elem.title = "Restart this game";

      this._elem.addEventListener("click", (e) => {
        board.clearBlocks();
      });
    }
  }
}
