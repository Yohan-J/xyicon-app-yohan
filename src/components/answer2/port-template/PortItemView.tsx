import './PortItemView.css';
import { PortItemModel } from "../../../models/PortItemModel";
import React from 'react';
import { useEditPortModel, usePortTemplateActions } from '../../../context/PortTemplateContext';

type PortItemViewProps = {
  index: number;
  item: PortItemModel;
  isRoot?: boolean;
}

export const PortItemView: React.FC<PortItemViewProps> = (props) => {
  const { setFocusedItem: setItemForEdit, clearFocusedPortId, redrawTree } = usePortTemplateActions();
  const {
    index,
    item,
    isRoot,
  } = props;

  const parentItem = item.parent;
  const isRootNode = !!isRoot;
  const isFirstItem = index === 0;
  const isLastItem = index === (parentItem?.items.length ?? 0) - 1;
  const hasNextSibling = !!parentItem?.items[index + 1];

  const items = item.items;

  const { focusedPortModel } = useEditPortModel();
  const isEditMode = focusedPortModel?.id === item.id;

  const handleAdd = () => {
    item.addChildItem();
    redrawTree();
  };

  const handleDelete = () => {
    item.deleteFromParent();
    clearFocusedPortId();
    redrawTree();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    item.label = e.target.value;
    redrawTree();
  };

  const handleFocusIn = () => {
    setItemForEdit(item);
  };

  return (
    <div className="port-item-view">
      <span className={"vertical-line" + (isLastItem ? ' vl-last-item' : '') + (isFirstItem ? ' vl-first-item' : '') + (isRootNode ? ' vl-is-root' : '')} ></span>
      <span className="horizontal-line" ></span>

      <div className='port-item-controls'>
        <input type="text" value={item.label} onFocus={handleFocusIn} onChange={handleChange} />
        {
          isEditMode && (
            <div className="port-item-buttons">
              <button
                className="port-delete"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>

              <button
                className="port-add"
                type="button"
                onClick={handleAdd}
                aria-label="Add"
              >
                <span className="plus"></span>
              </button>
            </div>
          )
        }
      </div>

      {items.length ? (
        <>
          {
            hasNextSibling ? (
              <span className="vertical-line-filler" ></span>
            ) : null
          }

          <div className="port-item-children">
            {
              items.map((childItem, childIndex) => {
                return (
                  <PortItemView key={childItem.id} index={childIndex} item={childItem} />
                )
              })
            }
          </div>
        </>
      ) : null}

    </div>
  );
}

