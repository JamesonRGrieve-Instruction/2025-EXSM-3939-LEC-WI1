'use client';

export type GreeterProps = { name: string; profession: string; age: string };

export default function Greeter({ name, profession, age }: GreeterProps) {
  return <p>{`Hello ${name}, you are a ${profession} and this year you are ${age} years old!`}</p>;
}
