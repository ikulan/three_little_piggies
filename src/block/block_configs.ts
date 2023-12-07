import { Tiles } from "../board/tiles";

interface BlockModel {
  // a matrix description for the block contents
  shape: number[][];

  // when rotated vertically, the image may stretched on width, so we
  // need to adjust the x-axis offset to correctly point to the house
  rotation_x_offset: number;
}

interface BlockConfig {
  [id: string]: BlockModel;
}

export const BLOCK_CONFIGS: BlockConfig = {
  "block-1": {
    shape: [
      [Tiles.House, Tiles.Lawn, Tiles.Lawn],
      [Tiles.Lawn, Tiles.Invalid, Tiles.Invalid],
    ],
    rotation_x_offset: 50,
  },
  "block-2": {
    shape: [
      [Tiles.House, Tiles.Lawn],
      [Tiles.Lawn, Tiles.Invalid],
    ],
    rotation_x_offset: 0,
  },
  "block-3": {
    shape: [[Tiles.Lawn, Tiles.House, Tiles.Lawn]],
    rotation_x_offset: 100,
  },
};
