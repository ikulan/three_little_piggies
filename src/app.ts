import { Block } from "./components/block";
import { Board } from "./components/board";
import { BLOCK_CONFIGS } from "./models/block_model";

const placement = document.getElementById("placement")!;
const block_ids = Object.keys(BLOCK_CONFIGS);

block_ids.forEach((bid) => {
  let b = new Block(bid);
  placement.appendChild(b.element);
});

new Board();
