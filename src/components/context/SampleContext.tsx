'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
export type SampleContextItem = { itemID: string; quantity: number };
export type SampleContext = SampleContextItem[];
export type SampleContextHook = { state: SampleContext; mutate: any; addItem: any };
const initialState: SampleContext = [];
// Provider
export function SampleContextProvider({ children }: { children: React.ReactNode }) {
  const [contextState, setContextState] = useState<SampleContext>(initialState);
  const handleAddItem = useCallback(
    (itemCode: string) => {
      setContextState((old: SampleContext) => {
        const newValue = [
          ...old.filter((item) => item.itemID !== itemCode),
          {
            itemID: itemCode,
            quantity: (old.find((item) => item.itemID === itemCode) ?? { quantity: 0 }).quantity + 1,
          },
        ];
        console.log('Updating Context', newValue);
        return newValue;
      });
    },
    [contextState],
  );
  useEffect(() => {
    console.log(contextState);
  }, [contextState]);
  return <SampleContext.Provider value={{ state: contextState, mutate: setContextState, addItem: handleAddItem }}>{children}</SampleContext.Provider>;
}
// Context
export const SampleContext = createContext<SampleContextHook>({
  state: initialState,
  mutate: () => {},
  addItem: () => {},
});
// Usage Hook
export default function useSampleContext() {
  return useContext<SampleContextHook>(SampleContext);
}
