'use client';

import { ReactNode } from 'react';
import Button from './Button';

export type ModalProps = { onConfirm: () => {}; onCancel: () => {}; children: ReactNode };

export default function Modal({ onConfirm, onCancel, children }: ModalProps) {
  return (
    <div className='relative'>
      <div className='absolute top-0 right-0'>
        <Button onClick={onCancel} label='X' disabled={false} />
      </div>
      {children}
      <Button onClick={onConfirm} label='Confirm' disabled={false} />
    </div>
  );
}
