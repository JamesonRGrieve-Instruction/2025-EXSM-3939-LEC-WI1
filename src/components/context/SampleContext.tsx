'use client';
import { createContext, useContext, useState } from 'react';
export type SampleContextType = { firstName: string; lastName: string };
export type SampleContextHook = { state: SampleContextType; mutate: any };

// Provider
export function SampleContextProvider({ children }: { children: React.ReactNode }) {
  const [contextState, setContextState] = useState<SampleContextType>({
    firstName: 'John',
    lastName: 'Doe',
  });
  return <SampleContext.Provider value={{ state: contextState, mutate: setContextState }}>{children}</SampleContext.Provider>;
}
// Context
export const SampleContext = createContext<SampleContextHook>({
  state: {
    firstName: '',
    lastName: '',
  },
  mutate: () => {},
});
// Usage Hook
export default function useSampleContext() {
  return useContext<SampleContextHook>(SampleContext);
}
