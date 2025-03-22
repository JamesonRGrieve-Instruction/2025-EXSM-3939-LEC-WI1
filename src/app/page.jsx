'use client';
import { useCallback, useState } from 'react';
import CountTracker from '../components/CountTracker';
export default function Home() {
  const [shown, setShown] = useState(false);
  const toggle = useCallback(() => {
    setShown((old) => !old);
  }, [shown]);
  return (
    <main className='container flex justify-between'>
      <button onClick={toggle}>Toggle</button>
      {shown && <CountTracker />}
    </main>
  );
}
