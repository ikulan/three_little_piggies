import autobind from "./utils/autobind";
import { Tiles } from "./board/tiles";
import Board from "./board/board";
import Button from "./button/button";
import { ButtonType } from "./button/button_configs";
import { BlockFactory } from "./block/block_factory";
import { ChallengeLoder } from "./game/challenge_loader";
import { DataModel, dataStore } from "./utils/data_store";

export class Game {
  private static instance: Game; // Singleton
  private board;
  private buttons: Map<ButtonType, Button>;
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
    this.buttons = Button.createButtons();
    let previousBtn = this.buttons.get(ButtonType.Previous);
    previousBtn?.onClick(this.prevGame);
    previousBtn?.disable();
    this.buttons.get(ButtonType.Restart)?.onClick(this.reset);
    this.buttons.get(ButtonType.Next)?.onClick(this.nextGame);
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

  @autobind
  prevGame() {
    console.log("click prev");
    this.blue_print = ChallengeLoder.getChallenge(this.challenge_id + 1);
  }

  @autobind
  nextGame() {
    console.log("click next");
  }
}
