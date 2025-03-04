'use client';
import { JSX, useCallback, useState } from 'react';
import HelloWorld from '../components/stateful/HelloWorld';

export default function Home(): JSX.Element {
  const [showHelloWorld, setShowHelloWorld] = useState<Boolean>(false);
  const handleToggleHelloWorld = useCallback(() => {
    setShowHelloWorld((old) => !old);
  }, [showHelloWorld]);
  return (
    <main>
      <a href='#' onClick={handleToggleHelloWorld}>
        Toggle Hello World
      </a>
      {showHelloWorld && <HelloWorld firstName='Jane' lastName='Doe' middleName='Test' age='10' height='195cm' />}
    </main>
  );
}
