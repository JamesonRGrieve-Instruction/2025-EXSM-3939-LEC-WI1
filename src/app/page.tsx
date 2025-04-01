'use client';
import { Progress } from '@radix-ui/react-progress';
import { JSX } from 'react';

export default function Home(): JSX.Element {
  return (
    <>
      <main className='h-2'>
        <div className='w-12 h-12 bg-blue-500'></div>
        <Progress value={45} />
        <div className='max-w-300px'>
          <Progress />
        </div>
      </main>
    </>
  );
}
