require('dotenv').config();
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const rp = require('request-promise');
const tx = require('@stacks/transactions');
const BN = require('bn.js');
const utils = require('./utils');
const network = utils.resolveNetwork();

const mint = async () => {
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: 'arkadroids',
    functionName: 'mint-all',
    functionArgs: [],
    senderKey: process.env.STACKS_PRIVATE_KEY,
    postConditionMode: 1,
    network
  };
  const transaction = await tx.makeContractCall(txOptions);
  const result = tx.broadcastTransaction(transaction, network);
  await utils.processing(result, transaction.txid(), 0);
};

mint();
