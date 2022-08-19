require('dotenv').config();
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const rp = require('request-promise');
const tx = require('@stacks/transactions');
const BN = require('bn.js');
const utils = require('./utils');
const network = utils.resolveNetwork();


// Added to LP
const addresses = [
  "SP3MBWGMCVC9KZ5DTAYFMG1D0AEJCR7NENTM3FTK5",
  "SP37H4NY7YSVCSYEX01JEBC2CJQ1GS4SFN2GP70A9",
  "SP13N4QQ75DEZW73PXVZZCJ4CE9PRVA7GTXDX5R7V",
  "SPEWXXYKBHQ9BTVZHQAABMK3S6E7THNFR5T4QTA5",
  "SPMQAMQP7SD25HRENNHHRK38PY5M2AE6SWVZVY56",
  "SP6PHFNEB479QWYT9VDSW32VKHDWQ436416AW439",
  "SP2HBZWMCS5WYG2NSV3SDF0T2Y4D0GZFSRJEX9CSV",
  "SP7S0VEJ4FW96NEJPQ7ME36CZVKQQZ2AWVK45GTD",
  "SP1Y5PP22DETZ2ZS1KN8NB158Z7B3NH2FY48JM2RG",
];
let nftId = 82;
let nonce = 2104;

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
