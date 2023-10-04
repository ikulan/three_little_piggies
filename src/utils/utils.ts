import _ from "lodash";
import { BLOCK_CONFIGS } from "../models/block_model";

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

  // rotate the matrix clock-wise
  static transpose(matrix: number[][]) {
    return _.map(_.unzip(matrix), _.reverse);
  }
}
