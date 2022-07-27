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
      <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 drop-shadow-md">
        <h2 className="pb-10 text-center font-syne-mono text-medium md:text-lg text-almost-white neonText">Arkadroids</h2>
        <div className="grid grid-cols-1 mt-6 gap-y-20 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-20">
          {cards}
        </div>
      </div>
    </div>
  );
};
