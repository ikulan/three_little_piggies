import { Utils } from "../utils/utils";
import { BLOCK_CONFIGS } from "../models/block_model";
import { Tiles } from "../models/tiles";

export class BlockImage {
  readonly id: string;
  private _elem: HTMLImageElement;
  private _width: number;

  // matrix
  private _shape: number[][];

  // rotation related
  private _rotation_idx = 0;
  private _rotation_degree = 0;
  private _house_loc: number[]; // [row, col]
  private _x_offset: number;

  constructor(id: string) {
    this.id = id;

    this._shape = BLOCK_CONFIGS[id].shape;
    this._house_loc = Utils.find_indices_2D(this._shape, Tiles.House);
    this._x_offset = BLOCK_CONFIGS[id].rotation_x_offset;

    this._width = this._shape[0].length * 100;
    this._elem = new Image(this._width);
    this._elem.src = Utils.img_path(id);

    this.configure();
  }

  get element() {
    return this._elem;
  }

  get rotation_degree() {
    return this._rotation_degree;
  }

  get house_offsets() {
    let x = this._house_loc[1] * 100 + 50;
    let y = this._house_loc[0] * 100 + 50;
    // need to apply offset when the image rotated vertically
    if (this._rotation_idx % 2 > 0) {
      x += this._x_offset;
    }
    return [x, y];
  }

  get cell_plan() {
    let [row, col] = this._house_loc;
    let [total_row, total_col] = [this._shape.length, this._shape[0].length];

    return [
      row, // # of upside cells
      total_col - col - 1, // # of right side cells
      total_row - row - 1, // # of down side cells
      col, // # of left side cells
    ];
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
    this._house_loc = Utils.find_indices_2D(this._shape, Tiles.House);
  }

  public transparentize(action: boolean) {
    if (action === true) {
      this._elem.style.opacity = "0.4";
    } else {
      this._elem.style.removeProperty("opacity");
    }
  }
}
