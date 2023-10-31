import { EventPublisher } from "./event_publisher";
import { Utils } from "../utils/utils";

export abstract class Button extends EventPublisher<HTMLButtonElement> {
  static EVENTS = ["click"];
  private _img_elem: HTMLImageElement;

  constructor(id: string) {
    super(id.toLowerCase(), Button.EVENTS);

    this._img_elem = new Image();
    this._img_elem.src = Utils.img_path(this.id);
    this._elem.appendChild(this._img_elem);

    this.configure();
  }

  protected initElement(): HTMLButtonElement {
    return document.createElement("button");
  }

  protected configure(): void {}
}

export class PreviousButton extends Button {}
export class RestartButton extends Button {
  protected configure(): void {
    this._elem.title = "Restart this game";

    this._elem.addEventListener("click", (e) => {
      this.notify("click");
    });
  }
}
export class NextButton extends Button {}
