import { Utils } from "../utils/utils";
import { BLOCK_CONFIGS } from "../models/block_model";
import { BlockContent } from "../models/block_model";

export class BlockImage {
  readonly id: string;
  private _elem: HTMLImageElement;
  private _width: number;

  // matrix
  private _shape: number[][];

  // rotation related
  private _rotation_idx = 0;
  private _rotation_degree = 0;
  private _x_offset: number;

  constructor(id: string) {
    this.id = id;
    this._shape = BLOCK_CONFIGS[id].shape;
    this._x_offset = BLOCK_CONFIGS[id].rotation_x_offset;

    this._width = this._shape[0].length * 100;
    this._elem = new Image(this._width);
    this._elem.src = Utils.block_img_path(id);

    this.configure();
  }

  get element() {
    return this._elem;
  }

  get rotation_degree() {
    return this._rotation_degree;
  }

  get house_pos() {
    let [row, col] = Utils.find_indices_2D(this._shape, BlockContent.House);
    let [x, y] = [col * 100 + 50, row * 100 + 50];
    // need to apply offset when the image rotated vertically
    if (this._rotation_idx % 2 > 0) {
      x += this._x_offset;
    }
    return [x, y];
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
    this._shape = Utils.transpose(this._shape);
  }

  public transparentize(action: boolean) {
    if (action === true) {
      this._elem.style.opacity = "0.4";
    } else {
      this._elem.style.removeProperty("opacity");
    }
  }
}
