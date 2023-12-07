import BlockImage from "./block_image";
import { autobind } from "../utils/autobind";
import { BLOCK_CONFIGS } from "./block_configs";
import { Component } from "../interface/component";
import { DataModel, dataStore } from "../utils/data_store";
import { Draggable } from "../interface/drag_drop";

// house block
export default class Block
  extends Component<HTMLDivElement>
  implements Draggable
{
  private _image: BlockImage;

  constructor(id: string) {
    super(id);

    this._image = new BlockImage(id);

    this.configure();
  }

  get r_degree() {
    return this._image.rotation_degree;
  }

  protected initElement(): HTMLDivElement {
    return document.createElement("div");
  }

  protected configure() {
    // Wrap the image element. Register draggable events on this wrapper element,
    // so we can successfully set rotated degree on image shadow for dragging
    this._elem.appendChild(this._image.element);

    // Draggable
    this._elem.draggable = true;
    this._elem.addEventListener("dragstart", this.dragStartHandler);
    this._elem.addEventListener("dragend", this.dragEndHandler);
  }

  private getRotatedImageShadow(): HTMLElement {
    let crt = this._elem.cloneNode(true) as HTMLElement;
    crt.id = "image-shadow";

    // this element should not been seen on screen
    crt.style.position = "absolute";
    crt.style.top = "-300px";
    crt.style.left = "-300px";
    crt.style.zIndex = "2";

    // set rotation degree
    let inner = crt.getElementsByTagName("img")[0];
    inner.style.transform = `rotate(${this.r_degree}deg)`;

    return crt;
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    // set data that would be transfered to target cell
    // not using event.dataTransfer because it's not accessible in dragEnter event
    let data: DataModel = {
      block_id: this.id,
      r_degree: this.r_degree,
      cell_plan: this._image.cell_plan,
    };
    dataStore.setData(data);

    // set rotated drag image
    let [offset_x, offset_y] = this._image.house_offsets;
    let shadow = this.getRotatedImageShadow();
    document.body.appendChild(shadow);
    event.dataTransfer!.setDragImage(shadow, offset_x, offset_y);

    // set transparency of original image
    this._image.transparentize(true);
  }

  @autobind
  dragEndHandler(event: DragEvent): void {
    this._image.transparentize(false);

    // clean drag image
    let elem = document.getElementById("image-shadow");
    elem?.remove();
  }

  hide() {
    this._elem.classList.add("hide");
  }

  isHide() {
    return this._elem.classList.contains("hide");
  }

  reset() {
    this._image.reset();
    this._elem.classList.remove("hide");
  }

  static createBlocks(): Map<string, Block> {
    let blocks = new Map<string, Block>();

    const placement = document.getElementById("placement")!;
    Object.keys(BLOCK_CONFIGS).forEach((bid) => {
      let b = new Block(bid);
      placement.appendChild(b.element);
      blocks.set(bid, b);
    });

    return blocks;
  }
}
