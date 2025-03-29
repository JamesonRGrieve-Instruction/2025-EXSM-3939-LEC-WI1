'use client';

import { MouseEventHandler } from 'react';
import useSampleContext from '../context/SampleContext';

export type CartListProps = { handleButton: MouseEventHandler; buttonText: string };

export default function CartList({ handleButton, buttonText }: CartListProps) {
  const sampleContext = useSampleContext();

  return (
    <ul>
      {sampleContext.state.map((item) => (
        <li key={item.itemID}>
          {item.itemID}: {item.quantity}
        </li>
      ))}
      <button onClick={handleButton}>{buttonText}</button>
    </ul>
  );
}
