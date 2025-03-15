import StateChanger from '../components/StateChanger';

export default function Home() {
  return (
    <main className='container flex justify-between'>
      <StateChanger />
      <StateChanger />
      <StateChanger />
    </main>
  );
}
