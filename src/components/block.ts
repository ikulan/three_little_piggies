import { autobind } from "../decorators/autobind";
import { Draggable } from "../models/drag_drop";
import { Utils } from "../utils/utils";

// house block
export class Block implements Draggable {
  readonly id;
  private _elem: HTMLDivElement;

  private img_src: string;
  private img_elem: HTMLImageElement;
  private rotation_idx = 0;

  constructor(id: string, width: number) {
    this.id = id;
    this.img_src = Utils.block_img_path(id);
    this.img_elem = new Image(width);
    this.img_elem.src = this.img_src;

    // Wrap the image element. Register draggable events on this wrapper element,
    // so we can successfully set rotated degree on image shadow while dragging
    this._elem = document.createElement("div");
    this._elem.appendChild(this.img_elem);

    this.configure();
  }

  private configure() {
    // Image Rotation on double clicks
    this.img_elem.addEventListener("dblclick", (e) => {
      this.rotation_idx = (this.rotation_idx + 1) % 4;
      console.log(`rotation_idx: ${this.rotation_idx}`);

      let degree = Utils.rotation_degree(this.rotation_idx);
      this.img_elem.style.transform = `rotate(${degree}deg)`;
    });

    // Draggable
    this._elem.draggable = true;
    this._elem.addEventListener("dragstart", this.dragStartHandler);
    this._elem.addEventListener("dragend", this.dragEndHandler);
  }

  get element() {
    return this._elem;
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
    let degree = Utils.rotation_degree(this.rotation_idx);
    inner.style.transform = `rotate(${degree}deg)`;

    return crt;
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    // get cell info
    let row = Math.floor(event.offsetY / 100);
    let col = Math.floor(event.offsetX / 100);
    console.log(`cell of the block: (${row}, ${col})`);
    // TODO: modify to json format, include: id, row, col
    event.dataTransfer!.setData("text/plain", this.id);

    // set drag image rotated
    let shadow = this.getRotatedImageShadow();
    document.body.appendChild(shadow);
    event.dataTransfer!.setDragImage(shadow, 50, 50);

    // set transparency of original image
    this.img_elem.style.opacity = "0.4";
  }

  @autobind
  dragEndHandler(event: DragEvent): void {
    this.img_elem.style.removeProperty("opacity");

    // clean drag image
    let elem = document.getElementById("image-shadow");
    elem?.remove();
  }
}
