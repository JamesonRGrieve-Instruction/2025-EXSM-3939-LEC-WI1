'use client';
import { createContext, useContext, useState } from 'react';
export type SampleContext = { firstName: string; lastName: string };
export type SampleContextHook = { state: SampleContext; mutate: any };
const initialState: SampleContext = { firstName: 'John', lastName: 'Doe' };
// Provider
export function SampleContextProvider({ children }: { children: React.ReactNode }) {
  const [contextState, setContextState] = useState<SampleContext>(initialState);
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
