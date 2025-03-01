import { JSX } from 'react';
import HelloWorld from '../components/stateless/HelloWorld';

export default function Home(): JSX.Element {
  return (
    <main>
      <HelloWorld firstName='' lastName='Doe' middleName='Test' age='10' height='195cm' />
      <HelloWorld firstName='John' lastName='Doe' />
    </main>
  );
}
