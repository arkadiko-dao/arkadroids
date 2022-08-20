require('dotenv').config();
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const rp = require('request-promise');
const tx = require('@stacks/transactions');
const BN = require('bn.js');
const utils = require('./utils');
const network = utils.resolveNetwork();


// Added to LP
const addresses = [
  "SP1PKK6KJPM826D0X6AMCJ63KEH2M456M4T22WAPQ",
"SPK8X8Y4BP5JFCW1XQN58V6M5GN4W9FV5D461SH0",
"SP1C714XS2J1ENZ7RSWK22YD02T1HZK7AV920GSN1",
"SP1PKK6KJPM826D0X6AMCJ63KEH2M456M4T22WAPQ",
"SP1FV4FZ8D32S7GKYRPFWK6YHRJE5BZEYKABK72Q3",
"SP1PMVM8V5ZE4E8CYY9D5Z9X4JWWMFR5MPGE32ECT",
"SP3G9BMCJ0858Y68MM35R6HA0WAZDNYXWZBN4RYK1",
"SPN2DQA1B5DD54BFZ86WP6Q5FJDDDH4D18PSRJPJ",
"SP2DEZAMQA076WXW4607B0PZ43QKYASRM6K9JX8HC",
"SP3JYTEYFKCY12WTY7TNRCQ392D1WF0YTPV71P0EM",
"SP308MWJFYMJSHBW13JXTEMJ3WPTF4DYXFD540YMM",
"SPGYN0JFKZVEKB6KE4X5YTZATPG0M42A0Y1F8DMG",
"SP2K677A8B8DYDWRR6DHPEVZQCT4QRV9DKRKVWXA5",
"SP32V5EAKRWZ66VVA67XGDK18VYMZM5NT7NP98M9",
"SP216YJTD76S81ZXKVHEBTJT77PSVR33AZ57548V3",
"SP2G4HY3B2NH04EJCK8CA08Q6THVCCNQ1JPZP1HPY",
"SPJVEB5A63E0Q5YDRNNGT5G5JM7YMH89RRZD3048",
"SPQWV24PYDJ6S36GB06E1KMWNHG34NGAEXZD5Y4K",
"SP2FZ154ESZ8NB34RZ3RS147GD6DSEYNE8DQD0XDM",
"SP2A4R43TCNHZ19AKK44WEBP4R16X7DV4093GQ0X4",
];
let nftId = 101;
let nonce = 2173;

const send = async (id, address, nonce) => {
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: 'arkadroids',
    functionName: 'transfer',
    functionArgs: [
      tx.uintCV(id),
      tx.standardPrincipalCV("SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR"),
      tx.standardPrincipalCV(address) // recipient
    ],
    nonce: new BN(nonce, 10),
    senderKey: process.env.STACKS_PRIVATE_KEY,
    postConditionMode: 1,
    fee: new BN(10000, 10),
    network
  };
  const transaction = await tx.makeContractCall(txOptions);
  const result = tx.broadcastTransaction(transaction, network);
  await utils.processing(result, transaction.txid(), 0);
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

asyncForEach(addresses, async (address) => {
  console.log('Sending NFT', nftId , 'to', address, 'with nonce', nonce);
  await send(nftId, address, nonce);

  nonce = nonce + 1;
  nftId += 1;
});
