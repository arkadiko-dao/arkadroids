import React from 'react';
import { Card } from './card';

export interface CardProps {
  id: number;
  href: string;
  imageSrc: string;
  imageAlt: string;
  eyes: string;
  skin: string;
  eligible: boolean;
}

export const CardGroup: React.FC<CardProps[]> = ({ droids }) => {
  const cards = droids.map((droid: CardProps) => (
    <Card
      id={droid.id}
      href={droid.href}
      imageSrc={droid.imageSrc}
      imageAlt={droid.imageAlt}
      eyes={droid.eyes}
      skin={droid.skin}
      eligible={droid.eligible}
    />
  ));

  return (
    <div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-40 sm:px-6 lg:max-w-7xl lg:px-8 drop-shadow-md">
        <div className="mt-6 grid grid-cols-1 gap-y-28 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-20">
          {cards}
        </div>
      </div>
    </div>
  );
};