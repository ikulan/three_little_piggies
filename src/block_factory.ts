import { Block } from "./components/block";
import { BLOCK_CONFIGS } from "./models/block_model";

export class BlockFactory {
  static block_ids = Object.keys(BLOCK_CONFIGS);
  private blocks: Map<string, Block>;

  constructor() {
    this.blocks = new Map<string, Block>();

    const placement = document.getElementById("placement")!;
    BlockFactory.block_ids.forEach((bid) => {
      let b = new Block(bid);
      placement.appendChild(b.element);
      this.blocks.set(bid, b);
    });
  }

  getAllBlocks() {
    return this.blocks.values();
  }
}
