import { autobind } from "./decorators/autobind";
import { Tiles } from "./models/tiles";
import { Board } from "./components/board";
import { BlockFactory } from "./block_factory";
import { ButtonFactory, ButtonType } from "./button_factory";
import { DataModel, dataStore } from "./components/data_store";

export class Game {
  private static instance: Game; // Singleton
  private board;
  private button_factory;
  private block_factory;

  private blue_print = [
    [Tiles.Invalid, Tiles.Empty, Tiles.Empty, Tiles.Invalid],
    [Tiles.Empty, Tiles.Empty, Tiles.Empty, Tiles.Empty],
    [Tiles.Pig, Tiles.Empty, Tiles.Pig, Tiles.Empty],
    [Tiles.Invalid, Tiles.Empty, Tiles.Pig, Tiles.Empty],
  ];

  protected mode: "day" | "night";

  constructor() {
    this.mode = "day";
    this.board = new Board(this.blue_print);
    this.board.subscribe("placeblock", this.hideBlock);

    // blocks
    this.block_factory = new BlockFactory();

    // buttons
    this.button_factory = new ButtonFactory();
    let restartBtn = this.button_factory.getButton(ButtonType.Restart);
    restartBtn?.subscribe("click", this.reset);
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Game();
    return this.instance;
  }

  private checkComplete() {
    for (let block of this.block_factory.getAllBlocks()) {
      if (!block.isHide()) return false;
    }
    return true;
  }

  @autobind
  hideBlock() {
    let data: DataModel = dataStore.getData();
    let block = this.block_factory.getBlock(data.block_id);
    block?.hide();

    if (this.checkComplete()) {
      window.setTimeout(() => {
        confirm("Great job! 🎉🎉 Are you ready for the next challenge?")
          ? this.reset()
          : null;
      });
    }
  }

  @autobind
  reset() {
    this.board.reset();

    for (let block of this.block_factory.getAllBlocks()) {
      block.reset();
    }
  }
}
