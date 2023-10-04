import _ from "lodash";

export enum BlockContent {
  None,
  Lawn,
  House,
}

export class BlockUtils {
  static BLOCK_MATRICES = {
    "block-1": [
      [BlockContent.House, BlockContent.Lawn, BlockContent.Lawn],
      [BlockContent.Lawn, BlockContent.None, BlockContent.None],
    ],
    "block-2": [
      [BlockContent.House, BlockContent.Lawn],
      [BlockContent.Lawn, BlockContent.None],
    ],
    "block-3": [[BlockContent.Lawn, BlockContent.House, BlockContent.Lawn]],
  };

  static transpose(matrix: number[][]) {
    return _.map(_.unzip(matrix), _.reverse);
  }
}
