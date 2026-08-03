import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { PortItemModel } from '../models/PortItemModel';

type PortTemplateContextValue = {
  focusedPortModel: PortItemModel | null;
  setFocusedItem: (item: PortItemModel) => void
  clearFocusedPortId: () => void
  redrawTree: () => void
};

const PortTemplateContext = createContext<PortTemplateContextValue | undefined>(undefined);

export const PortTemplateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [focusedPortModel, setFocusedPortModel] = useState<PortItemModel | null>(null);
  const [, forceRender] = useState(0);

  const setFocusedItem = useCallback((item: PortItemModel) => {
    setFocusedPortModel(item);
  }, []);

  const clearFocusedPortId = useCallback(() => {
    setFocusedPortModel(null);
  }, []);

  const redrawTree = useCallback(() => {
    forceRender((tick) => tick + 1);
  }, []);

  return (
    <PortTemplateContext.Provider value={{ focusedPortModel, setFocusedItem, clearFocusedPortId, redrawTree }}>
      {children}
    </PortTemplateContext.Provider>
  );
};

export function useEditPortModel(): { focusedPortModel: PortItemModel | null } {
  const context = useContext(PortTemplateContext);
  if (!context) {
    throw new Error('useEditPortId must be used within a PortTemplateProvider');
  }
  return {
    focusedPortModel: context.focusedPortModel
  };
}

export function usePortTemplateActions(): Omit<PortTemplateContextValue, 'focusedPortModel'> {
  const context = useContext(PortTemplateContext);
  if (!context) {
    throw new Error('usePortTemplateActions must be used within a PortTemplateProvider');
  }
  return context;
}
