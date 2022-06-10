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
          ? 'group relative bg-gray-card rounded-lg pb-5 neonBox'
          : 'group relative bg-gray-card rounded-lg pb-5'
      }
    >
      <a href={href}>
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        </div>
      </a>
      <div className="mt-4 flex justify-around px-10">
        <div>
          {/* <h3 className="syne-mono text-base text-almost-white">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      Eyes
                    </a>
                  </h3> */}
          <p className="syne-mono mt-1 text-base text-almost-white">Eyes</p>
          <p className="syne-mono mt-1 text-base text-almost-white">Skin</p>
        </div>
        <div>
          <p className="syne-mono mt-1 text-base text-almost-white">{eyes}</p>
          <p className="syne-mono mt-1 text-base text-almost-white">{skin}</p>
        </div>
      </div>
    </div>
  );
};
