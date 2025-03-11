'use client';
import { JSX, useCallback, useRef, useState } from 'react';
import FormExample from '../components/stateful/FormExample';
import HelloWorld from '../components/stateful/HelloWorld';

export default function Home(): JSX.Element {
  const [showHelloWorld, setShowHelloWorld] = useState<Boolean>(false);
  const handleToggleHelloWorld = useCallback(() => {
    setShowHelloWorld((old) => !old);
  }, [showHelloWorld]);
  const toggleButton = useRef(null);
  return (
    <main>
      <a href='#' ref={toggleButton} onClick={handleToggleHelloWorld}>
        Toggle Hello World
      </a>
      {Array.from({ length: 50 }).map((_, index) => (
        <p key={index}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quidem vero quibusdam saepe, sed quam quisquam autem. Voluptate quisquam non animi neque cum sed. Nostrum
          vitae iusto fugit possimus. Perspiciatis.
        </p>
      ))}
      {showHelloWorld && <HelloWorld firstName='Jane' lastName='Doe' middleName='Test' age='10' height='195cm' />}
      <FormExample scrollTo={toggleButton} />
    </main>
  );
}
