import { cloneDeep } from "lodash";
import challenges from "./challenges.json";
import { Tiles } from "../board/tiles";

export class ChallengeLoder {
  static original_blueprint = [
    [Tiles.Invalid, Tiles.Empty, Tiles.Empty, Tiles.Invalid],
    [Tiles.Empty, Tiles.Empty, Tiles.Empty, Tiles.Empty],
    [Tiles.Empty, Tiles.Empty, Tiles.Empty, Tiles.Empty],
    [Tiles.Invalid, Tiles.Empty, Tiles.Empty, Tiles.Empty],
  ];

  static getChallenge(ch_id: number): Tiles[][] {
    if (ch_id < 0 || ch_id > challenges.length) return [];

    const setting = challenges[ch_id];
    let blueprint = cloneDeep(ChallengeLoder.original_blueprint);
    setting.pig.forEach(([row, col]) => {
      blueprint[row][col] = Tiles.Pig;
    });

    return blueprint;
  }

  static hasPrev(ch_id: number) {
    return ch_id > 0;
  }

  static hasNext(ch_id: number) {
    return ch_id < challenges.length - 1;
  }
}
