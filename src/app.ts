import { Block } from "./components/block";
import { board } from "./components/board";
import { Button } from "./components/button";
import { BLOCK_CONFIGS } from "./models/block_model";

const placement = document.getElementById("placement")!;
const block_ids = Object.keys(BLOCK_CONFIGS);

block_ids.forEach((bid) => {
  let b = new Block(bid);
  placement.appendChild(b.element);
});

board;

const button_area = document.getElementById("buttons")!;
const button_names = ["previous", "restart", "next"];
button_names.forEach((name) => {
  let button = new Button(name);
  button_area.appendChild(button.element);
});
