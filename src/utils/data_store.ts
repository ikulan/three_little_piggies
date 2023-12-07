import { Component } from "../interface/component";

export interface DataModel {
  block_id: string;
  r_degree: number;
  cell_plan: number[];
}

export class DataStore extends Component<HTMLScriptElement> {
  private static instance: DataStore;

  private constructor() {
    super("data-store");
  }

  protected initElement(): HTMLScriptElement {
    return document.getElementById(this.id)! as HTMLScriptElement;
  }

  protected configure(): void {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new DataStore();
    return this.instance;
  }

  setData(json_data: object) {
    this._elem.textContent = JSON.stringify(json_data);
  }

  getData() {
    if (this._elem.textContent) {
      return JSON.parse(this._elem.textContent);
    } else {
      return null;
    }
  }
}

// Singleton
export const dataStore = DataStore.getInstance();
