export class CellUtils {
  static CLASS_NAME = "cell";
  static CLASS_INVALID = "invalid";
  static CLASS_PIG = "pig";
  static CLASS_HOUSE = "house";
  static CLASS_LAWN = "lawn";

  static INVALID_CELL_IDS = ["0,0", "0,3", "3,0"];

  static isInvalidCell(cell_id: string) {
    if (CellUtils.INVALID_CELL_IDS.includes(cell_id)) {
      return true;
    } else {
      return false;
    }
  }
}
