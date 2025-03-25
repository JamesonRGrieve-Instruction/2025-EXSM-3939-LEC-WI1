'use client';
import { JSX, useCallback } from 'react';
import useSampleContext, { SampleContext } from '../components/context/SampleContext';
import CartList from '../components/stateful/CartList';

export default function Home(): JSX.Element {
  const sampleContext = useSampleContext();
  const handleAddItem = useCallback(
    (itemCode: string) => {
      sampleContext.mutate((old: SampleContext) => {
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
    [sampleContext],
  );
  return (
    <>
      <main>
        <button onClick={() => handleAddItem('PEN101')}>Add Pen to Cart</button>
        <button onClick={() => handleAddItem('PENCIL101')}>Add Pencil to Cart</button>
      </main>
      <aside>
        <CartList />
      </aside>
    </>
  );
}
