import { PortItemModel } from "../models/PortItemModel";
import { PortItem } from "../types/port-template";

export class PortTemplateService {

  private constructor() {

  }

  static fetchTemplate(): PortItemModel {
    const sampleRaw: PortItem = {
      id: 1,
      label: 'RootItem',
      items: []
    }

    const model = PortItemModel.createFromRaw(sampleRaw, 0, undefined);
    return model;
  }

}