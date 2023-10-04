import { autobind } from "../decorators/autobind";
import { BlockImage } from "./block_image";
import { Draggable } from "../models/drag_drop";

// house block
export class Block implements Draggable {
  readonly id;
  private _elem: HTMLDivElement;
  private _image: BlockImage;

  constructor(id: string, width: number) {
    this.id = id;
    this._image = new BlockImage(id, width);

    // Wrap the image element. Register draggable events on this wrapper element,
    // so we can successfully set rotated degree on image shadow while dragging
    this._elem = document.createElement("div");
    this._elem.appendChild(this._image.element);

    this.configure();
  }

  get element() {
    return this._elem;
  }

  get r_degree() {
    return this._image.rotation_degree;
  }

  private configure() {
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
    this._image.transparentize(true);
  }

  @autobind
  dragEndHandler(event: DragEvent): void {
    this._image.transparentize(false);

    // clean drag image
    let elem = document.getElementById("image-shadow");
    elem?.remove();
  }
}
