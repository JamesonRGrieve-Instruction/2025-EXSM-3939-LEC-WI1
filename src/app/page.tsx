'use client';
import { JSX, useState } from 'react';
import HelloWorld from '../components/stateful/HelloWorld';

export default function Home(): JSX.Element {
  const [showHelloWorld, setShowHelloWorld] = useState<Boolean>(false);
  return (
    <main>
      <a href='#' onClick={() => setShowHelloWorld(!showHelloWorld)}>
        Toggle Hello World
      </a>
      {showHelloWorld && <HelloWorld firstName='Jane' lastName='Doe' middleName='Test' age='10' height='195cm' />}
    </main>
  );
}
