import _ from "lodash";

export default class Utils {
  static ROTATIONS = [0, 90, 180, 270];

  static rotationDegree(index: number) {
    return Utils.ROTATIONS[index];
  }

  static imgPath(id: string) {
    return `assets/imgs/${id}.png`;
  }

  // find row and column indices of given value in the 2D array
  static findPosition(matrix: number[][], value: number): [number, number] {
    let row = _.findIndex(matrix, function (row) {
      return row.includes(value);
    });
    let col = _.indexOf(matrix[row], value);

    return [row, col];
  }

  // rotate the matrix clock-wise
  static transpose(matrix: number[][]) {
    return _.map(_.unzip(matrix), _.reverse);
  }
}
