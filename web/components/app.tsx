import React from 'react';
import { About } from '@components/about';
import { CardGroup } from '@components/card-group';
import { Footer } from '@components/footer';


const products = [
  {
    id: 1,
    href: '#',
    imageSrc: './assets/droids/arkadiko-arkadiko-gold.png',
    imageAlt: "Front of men's Basic Tee in black.",
    eyes: 'Arkadiko',
    skin: 'Gold',
    eligible: true
  },
  {
    id: 2,
    href: '#',
    imageSrc: './assets/droids/arkadiko-arkadiko.png',
    imageAlt: "Front of men's Basic Tee in black.",
    eyes: 'Arkadiko',
    skin: 'Silver',
  },
  {
    id: 3,
    href: '#',
    imageSrc: './assets/droids/arkadiko-usda-gold.png',
    imageAlt: "Front of men's Basic Tee in black.",
    eyes: 'USDA',
    skin: 'Gold',
  },
  {
    id: 4,
    name: 'Eyes',
    href: '#',
    imageSrc: './assets/droids/arkadiko-usda.png',
    imageAlt: "Front of men's Basic Tee in black.",
    eyes: 'USDA',
    skin: 'Silver',
  },
  {
    id: 5,
    href: '#',
    imageSrc: './assets/droids/arkadiko-btc-gold.png',
    imageAlt: "Front of men's Basic Tee in black.",
    eyes: 'Bitcoin',
    skin: 'Gold',
    eligible: true
  },
  {
    id: 6,
    href: '#',
    imageSrc: './assets/droids/arkadiko-btc.png',
    imageAlt: "Front of men's Basic Tee in black.",
    eyes: 'Bitcoin',
    skin: 'Silver',
  },
  {
    id: 7,
    href: '#',
    imageSrc: './assets/droids/arkadiko-diko-gold.png',
    imageAlt: "Front of men's Basic Tee in black.",
    eyes: 'Diko',
    skin: 'Gold',
  },
  {
    id: 8,
    name: 'Eyes',
    href: '#',
    imageSrc: './assets/droids/arkadiko-diko.png',
    imageAlt: "Front of men's Basic Tee in black.",
    eyes: 'Diko',
    skin: 'Silver',
  },
  ,
  {
    id: 9,
    href: '#',
    imageSrc: './assets/droids/arkadiko-lydian-gold.png',
    imageAlt: "Front of men's Basic Tee in black.",
    eyes: 'Lydian',
    skin: 'Gold'
  },
  {
    id: 10,
    href: '#',
    imageSrc: './assets/droids/arkadiko-lydian.png',
    imageAlt: "Front of men's Basic Tee in black.",
    eyes: 'Lydian',
    skin: 'Silver',
  },
  {
    id: 11,
    href: '#',
    imageSrc: './assets/droids/arkadiko-stx-gold.png',
    imageAlt: "Front of men's Basic Tee in black.",
    eyes: 'STX',
    skin: 'Gold',
  },
  {
    id: 12,
    name: 'Eyes',
    href: '#',
    imageSrc: './assets/droids/arkadiko-stx.png',
    imageAlt: "Front of men's Basic Tee in black.",
    eyes: 'STX',
    skin: 'Silver',
  },
]


export const App: React.FC = () => {
  return (
    <div className='dark'>
      <h1 className="hacked text-white text-lg md:text-xl px-10 bg-black">Arkadroids</h1>
      <About />
      <CardGroup products={products} />
      <Footer />
    </div>
  );
};