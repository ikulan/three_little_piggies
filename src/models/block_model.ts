export enum BlockContent {
  None,
  Lawn,
  House,
}

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
      [BlockContent.House, BlockContent.Lawn, BlockContent.Lawn],
      [BlockContent.Lawn, BlockContent.None, BlockContent.None],
    ],
    rotation_x_offset: 50,
  },
  "block-2": {
    shape: [
      [BlockContent.House, BlockContent.Lawn],
      [BlockContent.Lawn, BlockContent.None],
    ],
    rotation_x_offset: 0,
  },
  "block-3": {
    shape: [[BlockContent.Lawn, BlockContent.House, BlockContent.Lawn]],
    rotation_x_offset: 100,
  },
};
