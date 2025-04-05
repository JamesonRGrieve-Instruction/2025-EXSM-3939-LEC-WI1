'use client';

import { ChangeEventHandler } from 'react';

export type InputProps = { value: string; onChange: ChangeEventHandler; validate: (value: string) => boolean };

export default function Input({ value, onChange, validate }: InputProps) {
  return (
    <>
      <input onChange={onChange} value={value} />
      {!validate(value) && <p>Invalid input provided!</p>}
    </>
  );
}
