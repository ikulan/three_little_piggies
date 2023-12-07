import autobind from "../utils/autobind";
import Board from "../board/board";
import Block from "../block/block";
import Button from "../button/button";
import { ButtonType } from "../button/button_configs";
import { ChallengeLoder } from "./challenge_loader";
import { DataModel, dataStore } from "../utils/data_store";

export class Game {
  private static instance: Game; // Singleton
  private board;
  private buttons: Map<ButtonType, Button>;
  private blocks: Map<string, Block>;

  //private mode: "day" | "night";
  private challenge_id = 0;

  constructor() {
    this.board = new Board(ChallengeLoder.getChallenge(this.challenge_id));
    this.board.subscribe("placeblock", this.hideBlock);

    // blocks
    this.blocks = Block.createBlocks();

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
    for (let [id, block] of this.blocks) {
      if (!block.isHide()) return false;
    }
    return true;
  }

  @autobind
  hideBlock() {
    let data: DataModel = dataStore.getData();
    this.blocks.get(data.block_id)?.hide();

    if (this.checkComplete()) {
      window.setTimeout(() => {
        confirm("Great job! 🎉🎉 Are you ready for the next challenge?")
          ? this.nextGame()
          : null;
      });
    }
  }

  @autobind
  reset() {
    this.board.reset();

    this.blocks.forEach((block) => block.reset());
  }

  @autobind
  prevGame() {
    if (ChallengeLoder.hasPrev(this.challenge_id)) {
      this.challenge_id -= 1;
      this.board.blueprint = ChallengeLoder.getChallenge(this.challenge_id);
      this.buttons.get(ButtonType.Next)?.enable();
    }

    this.reset();

    if (!ChallengeLoder.hasPrev(this.challenge_id)) {
      this.buttons.get(ButtonType.Previous)?.disable();
    }
  }

  @autobind
  nextGame() {
    if (ChallengeLoder.hasNext(this.challenge_id)) {
      this.challenge_id += 1;
      this.board.blueprint = ChallengeLoder.getChallenge(this.challenge_id);
      this.buttons.get(ButtonType.Previous)?.enable();
    }

    this.reset();

    if (!ChallengeLoder.hasNext(this.challenge_id)) {
      this.buttons.get(ButtonType.Next)?.disable();
    }
  }
}
