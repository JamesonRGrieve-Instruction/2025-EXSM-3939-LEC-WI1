'use client';
import { JSX, useCallback, useState } from 'react';
import useCartContext from '../components/context/SampleContext';
const products = {
  Soda: {
    Fanta: 1.99,
    Sprite: 2.99,
    'Coca-Cola': 1.59,
    Gatorade: 2.49,
    'Nestle Ice Tea': 0.99,
    'Dr. Pepper': 1.75,
  },
  Snacks: {
    Lays: 2.25,
    Doritos: 2.15,
    Cheetos: 2.05,
    'Kit Kat': 1.97,
    'Coffee Crisp': 1.89,
    'M&Ms': 0.75,
  },
  'Miscellaneous Products': {
    'Paper Towel Roll': 5.75,
    'Pre-packaged Sandwich': 4.75,
    Lighter: 0.49,
    Magazine: 6.75,
    Newspaper: 2.75,
  },
};

export default function Home(): JSX.Element {
  const [activePage, setActivePage] = useState<string>('Soda');
  const [checkingOut, setCheckingOut] = useState<boolean>(false);
  const cart = useCartContext();
  const handleAdd = useCallback(
    (productName) => {
      cart.mutate((old) => ({ ...old, [productName]: (old[productName] || 0) + 1 }));
    },
    [cart],
  );
  const handleSub = useCallback(
    (productName) => {
      cart.mutate((old) => {
        const newCount = old[productName] - 1;
        if (newCount <= 0) {
          const { [productName]: _, ...rest } = old;
          return rest;
        }
        return { ...old, [productName]: newCount };
      });
    },
    [cart],
  );
  return checkingOut ? (
    <aside>
      {Object.keys(cart.state).map((cartItem) => (
        <p key={cartItem}>
          {cartItem}: {cart.state[cartItem]} | ${(cart.state[cartItem] * Object.assign({}, ...Object.values(products))[cartItem]).toFixed(2)}
        </p>
      ))}
      <p>
        <strong>
          Total: ${' '}
          {Object.keys(cart.state)
            .reduce((runningTotal, currentValue) => cart.state[currentValue] * Object.assign({}, ...Object.values(products))[currentValue] + runningTotal, 0)
            .toFixed(2)}
        </strong>
      </p>
      <button
        onClick={() => {
          cart.mutate({});
          setCheckingOut(false);
        }}
      >
        Complete Checkout
      </button>
    </aside>
  ) : (
    <main>
      <select onChange={(e) => setActivePage(e.target.value)} value={activePage}>
        {Object.keys(products).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <ul>
        {Object.keys(products[activePage]).map((product) => (
          <li key={product}>
            {product} <button onClick={() => handleAdd(product)}>+</button>
            <button onClick={() => handleSub(product)}>-</button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          setCheckingOut(true);
        }}
      >
        Checkout
      </button>
    </main>
  );
}
