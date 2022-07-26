import React from 'react';
import { CardProps } from './card-group';

export const Card: React.FC<CardProps> = ({
  id,
  href,
  imageSrc,
  imageAlt,
  eyes,
  skin,
  eligible,
}) => {
  return (
    <div
      key={id}
      className={
        eligible
          ? 'group relative bg-gray-card rounded-lg eligible border border-purple/50'
          : 'group relative bg-gray-card rounded-lg hover:shadow-xl hover:shadow-almost-white/10 transition duration-200 ease-in-out'
      }
    >
      <a href={href}>
        <div className="w-full overflow-hidden rounded-t-lg min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:h-80 lg:aspect-none">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="object-cover object-center w-full h-full lg:w-full lg:h-full"
          />
        </div>
      </a>
      <dl className="sm:divide-x sm:divide-white/10 sm:grid sm:grid-cols-2 sm:gap-2">
        <div className="py-4 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-4">
          <dt className="text-sm font-medium text-almost-white">Eyes</dt>
          <dd className="mt-1 text-base text-white font-syne-mono neonText sm:mt-0 sm:col-span-2">{eyes}</dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-4">
          <dt className="text-sm font-medium text-almost-white">Skin</dt>
          <dd className="mt-1 text-base text-white font-syne-mono neonText sm:mt-0 sm:col-span-2">{skin}</dd>
        </div>
      </dl>
    </div>
  );
};
