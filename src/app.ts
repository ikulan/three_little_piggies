import { Block } from "./block/block";

const placement = document.querySelector(".placement") as HTMLElement;
const blocks = [
  new Block("block-1", 300),
  new Block("block-2", 200),
  new Block("block-3", 300),
];
blocks.forEach((b) => {
  placement.appendChild(b.getImage());
});
