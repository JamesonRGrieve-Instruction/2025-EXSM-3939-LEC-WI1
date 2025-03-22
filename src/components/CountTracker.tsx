'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
export default function CountTracker({}) {
  const [count, setCount] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let output = '';
    if (count % 3 == 0) {
      output += 'Fizz';
    }
    if (count % 5 == 0) {
      output += 'Buzz';
    }
    if (output) {
      console.log(output);
    }
  }, [count]);
  useEffect(() => {
    console.log('Component Mounted');
    return () => {
      console.log('Component Unmounted');
    };
  }, []);
  const increment = useCallback(() => {
    setCount((old) => old + 1);
  }, [count]);
  const decrement = useCallback(() => {
    setCount((old) => old - 1);
  }, [count]);
  return (
    <>
      <button onClick={increment}>+</button>
      <input
        ref={input}
        type='number'
        value={count}
        onChange={(event) => {
          setCount(Number(event.target.value));
        }}
      />
      <button onClick={decrement}>-</button>
    </>
  );
}
