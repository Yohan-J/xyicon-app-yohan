import { PortItemModel } from "./PortItemModel";
import { PortItem } from "../types/port-template";

export namespace PortTemplateModel {

  const DEFAULT_FILE_NAME = 'port-template.json';

  export function saveAsJSON(model: PortItemModel, fileName: string = DEFAULT_FILE_NAME) {
    const json = JSON.stringify(model.toRaw(), null, 2);

    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  export function loadFromFile(file: File): Promise<PortItemModel> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const raw = JSON.parse(reader.result as string) as PortItem;
          resolve(PortItemModel.createFromRaw(raw, 0, undefined));
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(reader.error ?? new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  }

}