var express = require('express');
var router = express.Router();
const Web3 = require("web3");
const ABI = require('./test.abi.json');
var Tx = require('ethereumjs-tx').Transaction;
const contractAddress = '0xFD13f17333c6642258c573D33bf617DDC2B82B77';

/* GET home page. */
router.get('/', async function(req, res, next) {
  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  var accounts = await web3.eth.getAccounts();
  console.log("Accounts:", accounts);
 
  //Need the contract address and ABI
  const account = '0x36f72c7FdD0cAF81304035731aA2F69c8BEB9953';
  const privateKey = Buffer.from('e2a20394e2fc1f8c2609e283c909714a95fe84900bf2b1e3b3942daa8da05587', 'hex');
  const newAddress = '0x7997A2aA168E20b8f288211527AF7CF81CC53cc6';

  //variable knows ABI and where contract sits
  var TestContract = new web3.eth.Contract(ABI, contractAddress);
  //get contract, create call and encode ABI 
  const _data = TestContract.methods.setOwner(newAddress).encodeABI();

  _nonce = await web3.eth.getTransactionCount(account);

  var rawTx = {
    nonce: _nonce,
    gasPrice: '0x20000000000',
    gasLimit: '0x24799',
    to: contractAddress,
    value: 0,
    data: _data
  }
  //create the new object to have rawTx and sign with private key; 
  //it encrypt the rawTx data
  var tx = new Tx(rawTx);
  tx.sign(privateKey);
  
//serialize the object
  var serializedTx = tx.serialize();

  //send the signed data, and send back the receipt
  var _receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
  console.log("Receipt: ", _receipt);
    
  res.render('index', { title: 'Express', receipt: JSON.stringify(_receipt) });
});

module.exports = router;