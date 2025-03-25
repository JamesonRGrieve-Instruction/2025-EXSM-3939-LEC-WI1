'use client';
import { createContext, useContext, useEffect, useState } from 'react';
export type SampleContextItem = { itemID: string; quantity: number };
export type SampleContext = SampleContextItem[];
export type SampleContextHook = { state: SampleContext; mutate: any };
const initialState: SampleContext = [];
// Provider
export function SampleContextProvider({ children }: { children: React.ReactNode }) {
  const [contextState, setContextState] = useState<SampleContext>(initialState);
  useEffect(() => {
    console.log(contextState);
  }, [contextState]);
  return <SampleContext.Provider value={{ state: contextState, mutate: setContextState }}>{children}</SampleContext.Provider>;
}
// Context
export const SampleContext = createContext<SampleContextHook>({
  state: initialState,
  mutate: () => {},
});
// Usage Hook
export default function useSampleContext() {
  return useContext<SampleContextHook>(SampleContext);
}
