'use client';

import useSampleContext from '../context/SampleContext';

export type CartListProps = undefined;

export default function CartList() {
  const sampleContext = useSampleContext();

  return (
    <ul>
      {sampleContext.state.map((item) => (
        <li key={item.itemID}>
          {item.itemID}: {item.quantity}
        </li>
      ))}
    </ul>
  );
}
