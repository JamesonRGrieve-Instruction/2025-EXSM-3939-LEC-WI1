'use client';
import { useState } from 'react';

export default function () {
  const [original, setOriginal] = useState(true);
  return (
    <div>
      <h1>State: {original ? 'Original' : 'Changed'}</h1>
      <button onClick={() => setOriginal((previous) => !previous)}>Change State</button>
    </div>
  );
}
