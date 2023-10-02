import { autobind } from "../decorators/autobind";
import { Draggable } from "../models/drag-drop";
import { Util } from "../utils/util";

// house block
export class Block implements Draggable {
  private img_src: string;
  private img_elem: HTMLImageElement;
  private rotation = 0;

  constructor(public id: string, width: number) {
    this.img_src = Util.block_img_path(id);
    this.img_elem = new Image(width);
    this.img_elem.src = this.img_src;

    this.configure();
  }

  configure() {
    // Image Rotation on double clicks
    this.img_elem.addEventListener("dblclick", (e) => {
      this.rotation = (this.rotation + Util.rotation_degree) % 360;
      this.img_elem.style.transform = `rotate(${this.rotation}deg)`;
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
    console.log(event);
  }

  @autobind
  dragEndHandler(event: DragEvent): void {
    console.log(event);
  }
}
