import { JSX } from 'react';
import HelloWorld from '../components/stateful/HelloWorld';

export default function Home(): JSX.Element {
  return (
    <main>
      <HelloWorld firstName='Jane' lastName='Doe' middleName='Test' age='10' height='195cm' />
    </main>
  );
}
