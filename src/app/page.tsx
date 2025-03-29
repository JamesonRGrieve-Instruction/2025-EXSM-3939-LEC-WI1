'use client';
import { JSX } from 'react';
import Greeter from '../components/Greeter';
import useSampleContext from '../components/context/SampleContext';

export default function Home(): JSX.Element {
  const sampleContext = useSampleContext();
  return (
    <>
      <main>
        <button onClick={() => sampleContext.addItem('PEN101')}>Add Pen to Cart</button>
        <button onClick={() => sampleContext.addItem('PENCIL101')}>Add Pencil to Cart</button>
      </main>
      <aside>
        <Greeter />
      </aside>
    </>
  );
}
