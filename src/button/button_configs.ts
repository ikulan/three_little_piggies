export enum ButtonType {
  Previous,
  Restart,
  Next,
}

export const BUTTON_CONFIGS = [
  { type: ButtonType.Previous, name: "previous", tooltip: "Previous Game" },
  { type: ButtonType.Restart, name: "restart", tooltip: "Restart" },
  { type: ButtonType.Next, name: "next", tooltip: "Next Game" },
];
