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

export const CardGroup: React.FC<CardProps[]> = ({ products }) => {
  const cards = products.map((product: CardProps) => (
    <Card
      id={product.id}
      href={product.href}
      imageSrc={product.imageSrc}
      imageAlt={product.imageAlt}
      eyes={product.eyes}
      skin={product.skin}
      eligible={product.eligible}
    />
  ));

  return (
    <div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 drop-shadow-md">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Droids</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-28 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-20">
          {cards}
        </div>
      </div>
    </div>
  );
};