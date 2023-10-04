export enum BlockContent {
  None,
  Lawn,
  House,
}

interface BlockModel {
  shape: number[][];
  width: number;
  house_loc: [number, number];
}

interface BlockConfig {
  [id: string]: BlockModel;
}

export const BLOCK_CONFIGS: BlockConfig = {
  "block-1": {
    shape: [
      [BlockContent.House, BlockContent.Lawn, BlockContent.Lawn],
      [BlockContent.Lawn, BlockContent.None, BlockContent.None],
    ],
    width: 300,
    house_loc: [0, 1],
  },
  "block-2": {
    shape: [
      [BlockContent.House, BlockContent.Lawn],
      [BlockContent.Lawn, BlockContent.None],
    ],
    width: 200,
    house_loc: [0, 1],
  },
  "block-3": {
    shape: [[BlockContent.Lawn, BlockContent.House, BlockContent.Lawn]],
    width: 300,
    house_loc: [0, 2],
  },
};
