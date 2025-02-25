import HelloWorld from '../components/stateless/HelloWorld';

export default function Home() {
  return (
    <main>
      <HelloWorld firstName='Jane' lastName='Doe' />
      <HelloWorld firstName='John' lastName='Doe' />
    </main>
  );
}
