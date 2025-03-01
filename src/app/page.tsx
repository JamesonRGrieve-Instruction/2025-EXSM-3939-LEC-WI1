import { JSX } from 'react';
import HelloWorld from '../components/stateless/HelloWorld';

export default function Home(): JSX.Element {
  return (
    <main>
      <HelloWorld firstName='Jane' lastName='Doe' />
      <HelloWorld firstName='John' lastName='Doe' />
    </main>
  );
}
