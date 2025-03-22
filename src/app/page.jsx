'use client';
import { useCallback, useState } from 'react';
import Greeter from '../components/Greeter';
export default function Home() {
  const [shown, setShown] = useState(false);
  const toggle = useCallback(() => {
    setShown((old) => !old);
  }, [shown]);
  return (
    <main className='container flex justify-between'>
      <Greeter name='Bob' profession='Doctor' age='127' />
    </main>
  );
}
