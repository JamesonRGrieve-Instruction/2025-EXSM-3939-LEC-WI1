'use client';

import Image from 'next/image';

export type CardProps = { title: string; description: string; imageSrc: string };

export default function Card({ title, description, imageSrc }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      <Image src={imageSrc} alt={title} width={300} height={200} />
      <p>{description}</p>
    </div>
  );
}
