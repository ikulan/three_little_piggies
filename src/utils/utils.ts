import _ from "lodash";
import { BLOCK_CONFIGS } from "../models/block_model";
import { BlockContent } from "../models/block_model";

export class Utils {
  static ROTATIONS = [0, 90, 180, 270];

  static rotation_degree(index: number) {
    return Utils.ROTATIONS[index];
  }

  static block_img_path(block_id: string) {
    return `assets/imgs/${block_id}.png`;
  }

  static block_shape(block_id: string) {
    return BLOCK_CONFIGS[block_id].shape;
  }

  // return the house's position on the block
  static house_pos(shape: number[][]): [number, number] {
    let row = _.findIndex(shape, function (row) {
      return row.includes(BlockContent.House);
    });
    let col = _.indexOf(shape[row], BlockContent.House);
    return [col * 100 + 50, row * 100 + 50];
  }

  // rotate the matrix clock-wise
  static transpose(matrix: number[][]) {
    return _.map(_.unzip(matrix), _.reverse);
  }
}
