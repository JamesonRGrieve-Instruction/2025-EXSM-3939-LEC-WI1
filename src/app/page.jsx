import ClickMe from '../components/stateless/ClickMe';
import HelloWorld from '../components/stateless/HelloWorld';

export default function Home() {
  return (
    <main>
      <p>Hello, my name is James, and this is my first react page!</p>
      <HelloWorld />
      <ClickMe />
    </main>
  );
}
