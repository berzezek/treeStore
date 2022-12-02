export type item = {
  id: number | string;
  parent: number | string;
  type?: any;

  find?: (id: number | string) => item | undefined;
  filter?: (fn: (item: item) => boolean) => item[];
}

export class TreeStore {
  get data(): item[] {
    return this._data;
  }

  set data(value: item[]) {
    this._data = value;
  }

  private _data: item[];

  constructor(data: item[]) {
    this._data = data;
  }

  getAll() {
    return this._data;
  }

  getItem(id: number | string) {
    return this._data.find(item => item.id === id);
  }

  getChildren(id: number | string) {
    return this._data.filter(item => item.parent === id);
  }

  getAllChildren(id: number | string) {
    let result = [] as item[];
    let children = this.getChildren(id);
    if (children.length) {
      result = children;
      children.forEach(item => {
        result = result.concat(this.getAllChildren(item.id));
      });
    }
    return result;
  }

  getParents(id: number | string) {
    let result = [] as item[];
    let item = this.getItem(id);
    if (item) {
      result = this.getParents(item.parent);
      result.push(item);
    }
    return result;
  }

  getAllParents(id: number | string) {
      return this.getParents(id).reverse().slice(1);
  }
}
