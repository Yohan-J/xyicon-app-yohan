import { PortItem } from "../types/port-template";

// Temp solution to generate ID
let nextId = 0;


export class PortItemModel {
  id: number = ++nextId;
  // id: string;
  level: number = 0;
  label: string = '';
  selected: boolean = false;
  items: PortItemModel[] = [];
  
  constructor(level: number, public parent: PortItemModel | undefined) {
    this.level = level;
    this.parent = parent
    // this.id = this.genNewId();
  }

  // private genNewId(): string {
  //   // let idParts = [this.level];
  //   let idParts = [];
  //   let parent = this.parent;
  //   while (parent !== undefined) {
  //     idParts.push(parent.level);
  //     parent = parent.parent;
  //   }

  //   return idParts.reverse().join('.');
  // }

  addChildItem(): PortItemModel {
    const item = new PortItemModel(this.level + 1, this);

    this.items = [
      ...this.items,
      item,
    ];

    return item;
  }

  addSiblingItem(): PortItemModel | null {
    const currentIndex = this.parent?.items.findIndex((val) => val === this) ?? -1;
    
    console.log('currentIndex :>> ', currentIndex);
    
    if (this.parent && currentIndex !== -1) {
      const item = new PortItemModel(this.level, this.parent);
 

      this.parent.items.splice(currentIndex + 1, 0, item);
      // Copy for new reference.
      this.parent.items = [
        ...this.parent.items,
      ];

      return item;
    }

    return null;
  }

  deleteFromParent(): void {
    if (!this.parent) {
      return;
    }

    this.parent.items = this.parent.items.filter((child) => child !== this);
  }

  toRaw(): PortItem {
    return {
      id: this.id,
      label: this.label,
      items: this.items.map((val) => {
        return val.toRaw();
      })
    }
  }

  static createFromRaw(raw: PortItem, level: number, parent: PortItemModel | undefined): PortItemModel {
    const item = new PortItemModel(level, parent);
    item.label = raw.label;
    
    for (let i = 0; i < raw.items.length; i++) {
      const childRawItem = raw.items[i];
      
      const childItem = PortItemModel.createFromRaw(childRawItem, item.level + 1, item);
      item.items.push(childItem);
    }

    return item;
  }

}