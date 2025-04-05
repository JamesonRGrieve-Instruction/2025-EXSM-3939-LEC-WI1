'use client';

import { MouseEventHandler } from 'react';

export type ButtonProps = { label: string; onClick: MouseEventHandler; disabled: boolean };

export default function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
