import { autobind } from "../decorators/autobind";
import { Draggable } from "../models/drag-drop";
import { Utils } from "../utils/utils";

// house block
export class Block implements Draggable {
  private img_src: string;
  private img_elem: HTMLImageElement;
  private rotation_idx = 0;

  constructor(public id: string, width: number) {
    this.img_src = Utils.block_img_path(id);
    this.img_elem = new Image(width);
    this.img_elem.src = this.img_src;

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
    this.img_elem.draggable = true;
    this.img_elem.addEventListener("dragstart", this.dragStartHandler);
    this.img_elem.addEventListener("dragend", this.dragEndHandler);
  }

  getImage() {
    return this.img_elem;
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    console.log(`clientX: ${event.clientX}, clientY: ${event.clientY}`);
  }

  @autobind
  dragEndHandler(event: DragEvent): void {
    console.log(event);
  }
}
