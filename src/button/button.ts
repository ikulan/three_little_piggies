import EventPublisher from "../interface/event_publisher";
import Utils from "../utils/utils";

export abstract class Button extends EventPublisher<HTMLButtonElement> {
  static EVENTS = ["click"];
  private _img_elem: HTMLImageElement;
  protected _span_elem: HTMLSpanElement;

  constructor(id: string) {
    super(id.toLowerCase(), Button.EVENTS);

    // image
    this._img_elem = new Image();
    this._img_elem.src = Utils.imgPath(this.id);
    this._elem.appendChild(this._img_elem);

    // tooltip
    this._elem.className = "tooltip";
    this._span_elem = document.createElement("span");
    this._span_elem.className = "tooltiptext";
    this._elem.appendChild(this._span_elem);

    this.configure();
  }

  protected initElement(): HTMLButtonElement {
    return document.createElement("button");
  }

  protected configure(): void {}
}

export class PreviousButton extends Button {
  protected configure(): void {
    this._span_elem.innerHTML = "Previous Game";
  }
}
export class RestartButton extends Button {
  protected configure(): void {
    this._span_elem.innerHTML = "Restart";

    this._elem.addEventListener("click", (e) => {
      this.notify("click");
    });
  }
}
export class NextButton extends Button {
  protected configure(): void {
    this._span_elem.innerHTML = "Next Game";
  }
}
