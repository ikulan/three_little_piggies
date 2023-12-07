import { ButtonType, BUTTON_CONFIGS } from "./button_configs";
import Component from "../interface/component";
import Utils from "../utils/utils";

export default class Button extends Component<HTMLButtonElement> {
  private _img_elem: HTMLImageElement;
  protected _span_elem: HTMLSpanElement;

  constructor(id: string, tooltip: string) {
    super(id.toLowerCase());

    // image
    this._img_elem = new Image();
    this._img_elem.src = Utils.imgPath(this.id);
    this._elem.appendChild(this._img_elem);

    // tooltip
    this._elem.className = "tooltip";
    this._span_elem = document.createElement("span");
    this._span_elem.className = "tooltiptext";
    this._span_elem.innerHTML = tooltip;
    this._elem.appendChild(this._span_elem);

    this.configure();
  }

  protected initElement(): HTMLButtonElement {
    return document.createElement("button");
  }

  protected configure(): void {}

  disable() {
    if (!this._elem.disabled) {
      this._elem.disabled = true;
      this._elem.classList.add("disabled");
    }
  }

  enable() {
    if (this._elem.disabled) {
      this._elem.disabled = false;
      this._elem.classList.remove("disabled");
    }
  }

  onClick(callback: Function) {
    this._elem.addEventListener("click", () => callback());
  }

  static createButtons(): Map<ButtonType, Button> {
    const button_area = document.getElementById("buttons")!;
    let buttons = new Map<ButtonType, Button>();

    BUTTON_CONFIGS.forEach((config) => {
      let button = new Button(config.name, config.tooltip);
      buttons.set(config.type, button);
      button_area.appendChild(button.element);
    });

    return buttons;
  }
}
