
import firebase from 'firebase';
import Web3 from 'web3';
import Tx from 'ethereumjs-tx';
import bip39 from 'bip39';
import hdkey from 'ethereumjs-wallet/hdkey';
import wallet from 'ethereumjs-wallet';
import config from '../../config';

import { db } from './firebase';

let mainAccount;

// console.log('config ',JSON.stringify(config));
// web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://localhost:8545`));
let web3 = new Web3(new Web3.providers.WebsocketProvider(config.network.ws));

let web3Http = new Web3(new Web3.providers.HttpProvider(config.network.http));


// @ts-ignore
export const web3connection = web3;

// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
// } else {
//     // set the provider you want from Web3.providers
//     //https://rinkeby.infura.io/2nluVzjZVelxFadFKD0f
//     // "http://localhost:8545"
//     // web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/2nluVzjZVelxFadFKD0f"));
//     // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//     web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://localhost:8545`));
// }

export const getContract = async (contractName) => {
    const metaContract = await db.collection('contracts').doc(contractName).get();
    if (!metaContract.exists) {
        throw new Error(`${contractName} does not exists`);
    }
    return new web3.eth.Contract(metaContract.data().abi, metaContract.data().address);
}

export const createAccount = function() {
    return web3.eth.accounts.create();
}

export const getBalance = async (address) => {
    return web3.eth.getBalance(address)
}

export const WeiToEther = (wei) => {
    return web3.utils.fromWei(wei, 'ether')
}

export const EtherToWei = (ether) => {
    return web3.utils.toWei(ether, 'ether')
}

export const getKittiesById = async (id) => {
  const contract = await getContract('KittyCore');
  try {
      return contract.methods.getKitty(id).call();
  } catch (error) {
      debugger;
      console.log(error);
  }
}

export const getMainDynamicAccount = () => {

    if (!mainAccount){
      const seed = bip39.mnemonicToSeed(config.network.ganache.mnemonic);
      const hdk = hdkey.fromMasterSeed(seed);
      const addr_node = hdk.derivePath("m/44'/60'/0'/0/0");
      const address = addr_node.getWallet().getAddressString();
      const key = addr_node.getWallet().getPrivateKey();
      mainAccount = { address, key };
    }

    return mainAccount;
}

export const getMainAccount = () => {
    if (!mainAccount) {
      // @ts-ignore
      mainAccount = config.network.account;
      web3.eth.personal.unlockAccount(mainAccount.address, mainAccount.key, 0);
    }
    return mainAccount;
  }

export const fillAccount = async (toAddress) => {
    
    const { address, key } = getMainAccount();
    var gasPrice = await web3.eth.getGasPrice(); //1; //2;//or get with web3.eth.gasPrice
    var gasLimit = 3000000;

    var amountToSend = "0.10"; //ethers //"0.00192823123348952";
    var nonce = await web3.eth.getTransactionCount(address); //211;

    var rawTransaction = {
        "from": address,
        "nonce": web3.utils.toHex(nonce),
        "gasPrice": web3.utils.toHex(gasPrice), //web3.utils.toHex(gasPrice * 1e9),
        "gasLimit": web3.utils.toHex(gasLimit),
        "value": web3.utils.toHex( web3.utils.toWei(amountToSend, 'ether') ),
        "to": toAddress,
        "chainId": 4 //rinkeby //remember to change this
      };

    var tx = new Tx(rawTransaction);
    
    var privKey = new Buffer( key.substring(2), 'hex');
    tx.sign(privKey);
    var serializedTx = tx.serialize();

    return await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));;

}