import { Utils } from "../utils/utils";

export class BlockImage {
  readonly id: string;
  private _elem: HTMLImageElement;
  private _img_src: string;
  private _width: number;
  private _rotation_idx = 0;
  private _rotation_degree = 0;

  constructor(id: string, width: number) {
    this.id = id;
    this._img_src = Utils.block_img_path(id);
    this._width = width;
    this._elem = new Image(width);
    this._elem.src = this._img_src;

    this.configure();
  }

  get element() {
    return this._elem;
  }

  get rotation_degree() {
    return this._rotation_degree;
  }

  private configure() {
    // Image Rotation on double clicks
    this._elem.addEventListener("dblclick", (e) => {
      this.rotate();
    });
  }

  // Rotate the image 90 degrees clock-wise
  private rotate() {
    this._rotation_idx = (this._rotation_idx + 1) % 4;
    this._rotation_degree = Utils.rotation_degree(this._rotation_idx);
    this._elem.style.transform = `rotate(${this._rotation_degree}deg)`;
  }

  public transparentize(action: boolean) {
    if (action === true) {
      this._elem.style.opacity = "0.4";
    } else {
      this._elem.style.removeProperty("opacity");
    }
  }
}
