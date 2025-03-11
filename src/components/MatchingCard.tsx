import { Card, CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';
export default function MatchingCard({
  image,
  onSelect,
}: {
  image: { image: string; matched: boolean; visible: boolean; instance: number };
  onSelect: (image: { image: string; matched: boolean; visible: boolean; instance: number }) => void;
}): ReactNode {
  const handleClick = () => {
    onSelect(image);
  };
  return (
    <Card className='relative' onClick={handleClick}>
      <CardContent>
        <div className='bg-cover absolute top-4 left-4 right-4 bottom-4 inline-block' style={image.visible ? { backgroundImage: `url('${image.image}')` } : {}}></div>
      </CardContent>
    </Card>
  );
}
