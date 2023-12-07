import Component from "../interface/component";
import Utils from "../utils/utils";
import { BLOCK_CONFIGS } from "./block_configs";
import { Tiles } from "../board/tiles";

export default class BlockImage extends Component<HTMLImageElement> {
  private _shape: number[][];
  private _rotation_idx = 0;
  private _rotation_degree = 0;
  private _house_loc: number[]; // [row, col]
  private _x_offset: number;

  constructor(id: string) {
    super(id);

    this._shape = BLOCK_CONFIGS[id].shape;
    this._house_loc = Utils.findPosition(this._shape, Tiles.House);
    this._x_offset = BLOCK_CONFIGS[id].rotation_x_offset;

    this.configure();
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

  protected initElement(): HTMLImageElement {
    let elem = new Image();
    elem.src = Utils.imgPath(this.id);
    return elem;
  }

  protected configure() {
    this._elem.width = this._shape[0].length * 100;

    // Image Rotation on double clicks
    this._elem.addEventListener("dblclick", (e) => {
      this.rotate();
    });
  }

  // Rotate the image 90 degrees clock-wise
  private rotate() {
    this._rotation_idx = (this._rotation_idx + 1) % 4;
    this._rotation_degree = Utils.rotationDegree(this._rotation_idx);

    this._elem.style.transform = `rotate(${this._rotation_degree}deg)`;
    this._shape = Utils.transpose(this._shape);
    this._house_loc = Utils.findPosition(this._shape, Tiles.House);
  }

  transparentize(action: boolean) {
    if (action === true) {
      this._elem.style.opacity = "0.4";
    } else {
      this._elem.style.removeProperty("opacity");
    }
  }

  reset() {
    while (this._rotation_idx != 0) {
      this.rotate();
    }
    this.transparentize(false);
  }
}
