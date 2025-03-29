'use client';
import { createContext, useContext, useState } from 'react';
export type CartContext = {};
export type CartContextHook = { state: CartContext; mutate: any };
const initialState: CartContext = {};
// Provider
export function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [contextState, setContextState] = useState<CartContext>(initialState);
  return <CartContext.Provider value={{ state: contextState, mutate: setContextState }}>{children}</CartContext.Provider>;
}
// Context
export const CartContext = createContext<CartContextHook>({
  state: initialState,
  mutate: () => {},
});
// Usage Hook
export default function useCartContext() {
  return useContext<CartContextHook>(CartContext);
}
