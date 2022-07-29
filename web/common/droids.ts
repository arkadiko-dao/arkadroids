import { UserEligibility } from "./context";
const createdVaultsJSON = require('./lists/createdVaults.json');
const liquidatedVaultsJSON = require('./lists/liquidatedVaults.json');
const lpedJSON  = require('./lists/lped.json');
const lydianJSON = require('./lists/lydian.json');
const swappedJSON = require('./lists/swapped.json');
const votedJSON = require('./lists/voted.json');
const addedToLiquidationPoolJSON = require('./lists/addedToLiquidationPool.json');

export const eligibilityDroids = (eligibility: UserEligibility) => {
  return [
    {
      id: 1,
      href: '#',
      imageSrc: './assets/droids/arkadiko-arkadiko-gold.png',
      imageAlt: "Arkadroids NFT Gold skinned and Arkadiko eyed.",
      eyes: 'Arkadiko',
      skin: 'Gold',
      eligible: eligibility.arkadiko
    },
    {
      id: 2,
      href: '#',
      imageSrc: './assets/droids/arkadiko-arkadiko.png',
      imageAlt: "Arkadroids NFT Silver skinned and Arkadiko eyed.",
      eyes: 'Arkadiko',
      skin: 'Silver',
      eligible: eligibility.arkadiko
    },
    {
      id: 3,
      href: '#',
      imageSrc: './assets/droids/arkadiko-usda-gold.png',
      imageAlt: "Arkadroids NFT Gold skinned and USDA eyed.",
      eyes: 'USDA',
      skin: 'Gold',
      eligible: eligibility.usda
    },
    {
      id: 4,
      name: 'Eyes',
      href: '#',
      imageSrc: './assets/droids/arkadiko-usda.png',
      imageAlt: "Arkadroids NFT Silver skinned and USDA eyed.",
      eyes: 'USDA',
      skin: 'Silver',
      eligible: eligibility.usda
    },
    {
      id: 5,
      href: '#',
      imageSrc: './assets/droids/arkadiko-btc-gold.png',
      imageAlt: "Arkadroids NFT Gold skinned and Bitcoin eyed.",
      eyes: 'Bitcoin',
      skin: 'Gold',
      eligible: eligibility.btc
    },
    {
      id: 6,
      href: '#',
      imageSrc: './assets/droids/arkadiko-btc.png',
      imageAlt: "Arkadroids NFT Silver skinned and Bitcoin eyed.",
      eyes: 'Bitcoin',
      skin: 'Silver',
      eligible: eligibility.btc
    },
    {
      id: 7,
      href: '#',
      imageSrc: './assets/droids/arkadiko-diko-gold.png',
      imageAlt: "Arkadroids NFT Gold skinned and DIKO eyed.",
      eyes: 'Diko',
      skin: 'Gold',
      eligible: eligibility.diko
    },
    {
      id: 8,
      name: 'Eyes',
      href: '#',
      imageSrc: './assets/droids/arkadiko-diko.png',
      imageAlt: "Arkadroids NFT Silver skinned and DIKO eyed.",
      eyes: 'Diko',
      skin: 'Silver',
      eligible: eligibility.diko
    },
    ,
    {
      id: 9,
      href: '#',
      imageSrc: './assets/droids/arkadiko-lydian-gold.png',
      imageAlt: "Arkadroids NFT Gold skinned and Lydian eyed.",
      eyes: 'Lydian',
      skin: 'Gold',
      eligible: eligibility.ldn
    },
    {
      id: 10,
      href: '#',
      imageSrc: './assets/droids/arkadiko-lydian.png',
      imageAlt: "Arkadroids NFT Silver skinned and Lydian eyed.",
      eyes: 'Lydian',
      skin: 'Silver',
      eligible: eligibility.ldn
    },
    {
      id: 11,
      href: '#',
      imageSrc: './assets/droids/arkadiko-stx-gold.png',
      imageAlt: "Arkadroids NFT Gold skinned and STX eyed.",
      eyes: 'STX',
      skin: 'Gold',
      eligible: eligibility.stx
    },
    {
      id: 12,
      name: 'Eyes',
      href: '#',
      imageSrc: './assets/droids/arkadiko-stx.png',
      imageAlt: "Arkadroids NFT Silver skinned and STX eyed.",
      eyes: 'STX',
      skin: 'Silver',
      eligible: eligibility.stx
    },
  ];
};


export const checkEligibility = (address: string) => {
  const createdVaults = createdVaultsJSON.includes(address);
  const wasLiquidated = liquidatedVaultsJSON.includes(address);
  const hasLped = lpedJSON.includes(address);
  const lydian = lydianJSON.includes(address);
  const swapped = swappedJSON.includes(address);
  const hasVoted = votedJSON.includes(address);
  const addedToLiquidationPool = addedToLiquidationPoolJSON.includes(address);

  const usdaEligible = createdVaults || wasLiquidated;
  const btcEligible = hasLped;
  const stxEligible = addedToLiquidationPool || swapped;
  const dikoEligible = hasVoted;
  const lydianEligible = lydian;
  const arkadikoEligible = false;

  return {
    arkadiko: arkadikoEligible,
    btc: btcEligible,
    diko: dikoEligible,
    usda: usdaEligible,
    stx: stxEligible,
    ldn: lydianEligible,
  };
}