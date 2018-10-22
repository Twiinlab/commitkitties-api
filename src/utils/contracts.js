
import firebase from 'firebase';
import Web3 from 'web3';
import config  from '../../config';

let web3 = undefined;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    //https://rinkeby.infura.io/2nluVzjZVelxFadFKD0f
    // "http://localhost:8545"
    // web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/2nluVzjZVelxFadFKD0f"));
    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://localhost:8545`));
}

if (!firebase.apps.length) {
    firebase.initializeApp(config.fireConfig);
}
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true});


async function getContract(contractName) {
    const metaContract = await db.collection('contracts').doc(contractName).get();
    if (!metaContract.exists) {
        throw new Error(`${contractName} does not exists`);
    }
    return new web3.eth.Contract(metaContract.data().abi, metaContract.data().address);
}
module.exports.getContract = getContract;

module.exports.getKittiesById = async (id) => {
  const contract = await getContract('KittyCore');
  try {
      return contract.methods.getKitty(id).call();
  } catch (error) {
      debugger;
      console.log(error);
  }
}