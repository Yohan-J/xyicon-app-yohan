import { useEffect, useRef, useState } from "react";
import { PortItemView } from "./PortItemView";
import './PortTemplate.css';
import { PortTemplateProvider, useEditPortModel, usePortTemplateActions } from "../../../context/PortTemplateContext";
import { PortTemplateService } from "../../../service/PortTemplateService";
import { PortItemModel } from "../../../models/PortItemModel";
import { PortTemplateModel } from "../../../models/PortTemplateModel";

const PortTemplateContent: React.FC = () => {
  const { focusedPortModel } = useEditPortModel();
  const { redrawTree, clearFocusedPortId } = usePortTemplateActions();
  const [rootItem, setRootItem] = useState<PortItemModel | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setRootItem(PortTemplateService.fetchTemplate());
  }, []);

  const handleAdd = () => {
    // Add sibling to focused port.
    if (focusedPortModel) {
      focusedPortModel.addSiblingItem();
      redrawTree();
    } else if (rootItem) {
      // Otherwise, add child to root node.
      rootItem.addChildItem();
      redrawTree();
    }
  };

  const handleSave = () => {
    if (rootItem) {
      PortTemplateModel.saveAsJSON(rootItem)
    }
  }

  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Allow re-selecting the same file to trigger onChange again.
    e.target.value = '';

    if (!file) {
      return;
    }

    try {
      const loadedRoot = await PortTemplateModel.loadFromFile(file);
      clearFocusedPortId();
      setRootItem(loadedRoot);
    } catch (error) {
      console.error('Failed to load port template file :>> ', error);
      window.alert('Failed to load file. Please make sure it is a valid port template JSON file.');
    }
  };

  const items = rootItem?.items;

  return (
    <div className="port-template-view">
      <div className="port-item-controls">
        <button
          className="port-add"
          type="button"
          onClick={handleAdd}
          aria-label="Add"
        >
          <span className="plus"></span>
        </button>
        <button className="port-save" type="button" onClick={handleSave}>
          Save
        </button>
        <button className="port-load" type="button" onClick={handleLoadClick}>
          Load
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>

      <div className="tree-view">
        {
          items?.length ? (
            items.map((item, index) => {
              return (
                <PortItemView key={item.id} index={index} item={item} isRoot />
              );
            })
          ) : null
        }
      </div>
    </div>
  );
};

export const PortTemplate: React.FC = () => {
  return (
    <PortTemplateProvider>
      <PortTemplateContent />
    </PortTemplateProvider>
  );
};
