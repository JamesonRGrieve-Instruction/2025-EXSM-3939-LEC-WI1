'use client';

import { Card, CardContent } from '@/components/ui/card';
import { JSX, useCallback, useEffect, useState } from 'react';
import MatchingCard from '../components/MatchingCard';
function shuffleArray(array) {
  const newArray = [...array];
  for (var i = newArray.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
}
const cardImages = [
  'https://cdn.pixabay.com/photo/2025/03/07/13/12/flower-9453063_1280.jpg',
  'https://cdn.pixabay.com/photo/2025/01/11/21/43/dragonfly-9326948_1280.jpg',
  'https://cdn.pixabay.com/photo/2022/04/15/07/44/purple-roses-7133816_1280.jpg',
  'https://cdn.pixabay.com/photo/2024/12/05/13/55/hydrangea-9246667_1280.jpg',
  'https://cdn.pixabay.com/photo/2023/11/17/01/50/pine-8393456_1280.jpg',
  'https://cdn.pixabay.com/photo/2024/11/08/13/40/tulips-9183358_1280.jpg',
  'https://cdn.pixabay.com/photo/2025/02/09/12/22/snowdrops-9394219_1280.jpg',
  'https://cdn.pixabay.com/photo/2024/10/18/15/30/grass-9130658_1280.jpg',
  'https://cdn.pixabay.com/photo/2022/02/13/11/26/grass-7010936_1280.jpg',
];
export default function Home(): JSX.Element {
  const [cards, setCards] = useState<{ image: string; matched: boolean; visible: boolean; instance: number }[]>([
    ...cardImages.map((image) => ({ image, matched: false, visible: false, instance: 1 })),
    ...cardImages.map((image) => ({ image, matched: false, visible: false, instance: 2 })),
  ]);
  const [previousClick, setPreviousClick] = useState<string | null>(null);
  useEffect(() => {
    setCards((currentCards) => shuffleArray(currentCards));
  }, []);
  const onMatch = useCallback(
    (image: { image: string; matched: boolean; visible: boolean; instance: number }) => {
      console.log('Potential Match: ', image);
      if (previousClick) {
        console.log('Second Click');
        if (previousClick === image.image) {
          setCards((currentCards) => {
            return currentCards.map((card) => ({
              image: card.image,
              matched: card.matched || card.image === image.image,
              visible: false,
              instance: card.instance,
            }));
          });
        } else {
          setCards((currentCards) => {
            return currentCards.map((card) => ({
              image: card.image,
              matched: card.matched,
              visible: card.visible || (card.image === image.image && card.instance === image.instance),
              instance: card.instance,
            }));
          });
          setTimeout(() => {
            setCards((currentCards) => {
              return currentCards.map((card) => ({
                image: card.image,
                matched: card.matched,
                visible: false,
                instance: card.instance,
              }));
            });
          }, 2000);
        }
        setPreviousClick(null);
      } else {
        console.log('First Click');
        setPreviousClick(image.image);
        setCards((currentCards) => {
          return currentCards.map((card) => ({
            image: card.image,
            matched: card.matched,
            visible: card.image === image.image && card.instance === image.instance,
            instance: card.instance,
          }));
        });
      }
    },
    [previousClick],
  );
  return (
    <main className='grid grid-cols-6 grid-rows-3 gap-4 h-screen p-12'>
      {cards.map((image, index) =>
        image.matched ? (
          <Card key={index}>
            <CardContent>
              <p>Match</p>
            </CardContent>
          </Card>
        ) : (
          <MatchingCard key={index} image={image} onSelect={onMatch} />
        ),
      )}
    </main>
  );
}
