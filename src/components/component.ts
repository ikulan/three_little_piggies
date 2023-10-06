export abstract class Component<T extends HTMLElement> {
  protected _elem: T;

  constructor(readonly id: string) {
    this._elem = this.initElement();
  }

  get element() {
    return this._elem;
  }

  protected abstract initElement(): T;

  protected abstract configure(): void;
}
