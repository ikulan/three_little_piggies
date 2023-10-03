export class Utils {
  static ROTATIONS = [0, 90, 180, 270];

  static rotation_degree(index: number) {
    return Utils.ROTATIONS[index];
  }

  static block_img_path(block_id: string) {
    return `assets/imgs/${block_id}.png`;
  }
}
