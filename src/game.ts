import { autobind } from "./decorators/autobind";
import { Tiles } from "./models/tiles";
import { Board } from "./components/board";
import { BlockFactory } from "./block_factory";
import { ButtonFactory, ButtonType } from "./button_factory";

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

  @autobind
  reset() {
    this.board.clearBlocks();
  }
}
