import Component from "./component";

type FuncArray = ((obj: Component<HTMLElement>) => void)[];

export default abstract class EventPublisher<
  T extends HTMLElement
> extends Component<T> {
  listeners = new Map<string, FuncArray>();

  constructor(id: string, event_types: string[]) {
    super(id);

    event_types.forEach((type) => {
      this.listeners.set(type, []);
    });
  }

  subscribe(type: string, listenerFn: any): boolean {
    if (!this.listeners.has(type)) {
      return false;
    }
    this.listeners.get(type)?.push(listenerFn);
    return true;
  }

  protected notify(type: string) {
    // send changes to listener functions
    this.listeners.get(type)?.forEach((func) => func(this));
  }
}
