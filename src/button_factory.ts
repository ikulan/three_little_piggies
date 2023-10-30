import * as Button from "./components/button";

export enum ButtonType {
  Previous,
  Restart,
  Next,
}

export class ButtonFactory {
  private buttons: Map<ButtonType, Button.Button>;

  constructor() {
    this.buttons = new Map<ButtonType, Button.Button>();

    const button_area = document.getElementById("buttons")!;
    Object.keys(ButtonType)
      .filter((key) => isNaN(Number(key)))
      .forEach((key) => {
        let button: Button.Button;
        switch (key) {
          case ButtonType[ButtonType.Previous]:
            button = new Button.PreviousButton(key);
            button_area.appendChild(button.element);
            this.buttons.set(ButtonType.Previous, button);
            break;
          case ButtonType[ButtonType.Restart]:
            button = new Button.RestartButton(key);
            button_area.appendChild(button.element);
            this.buttons.set(ButtonType.Restart, button);
            break;
          case ButtonType[ButtonType.Next]:
            button = new Button.NextButton(key);
            button_area.appendChild(button.element);
            this.buttons.set(ButtonType.Next, button);
            break;
        }
      });
  }

  getButton(name: ButtonType) {
    if (this.buttons.has(name)) {
      return this.buttons.get(name);
    }
  }
}
