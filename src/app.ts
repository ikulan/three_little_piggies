import { Block } from "./components/block";
import { Board } from "./components/board";

const placement = document.getElementById("placement")!;
const blocks = [
  new Block("block-1", 300),
  new Block("block-2", 200),
  new Block("block-3", 300),
];
blocks.forEach((b) => {
  placement.appendChild(b.getImage());
});

new Board();
