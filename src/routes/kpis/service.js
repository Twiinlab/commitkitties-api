
import * as contracts from '../../utils/contracts';
import * as db from '../../utils/db';
import * as config from '../../../config';
import * as userService from '../users/service';
import * as kittyService from '../kitties/service';


async function getCollection(collection = 'blocks') {
  return await db.getDb(config.default.mongo.db).then((client) => client.collection(collection));
}

export const getTotalBlockNumbers = async () => {
  const coll = await getCollection();

    return coll.aggregate(
      [{ $group: {
        _id: "$type",
        totalGasUsed: { $sum : "$tx.gas" },
        avgGasPrice: { $last : "$tx.gasPrice" },
        count: { $sum : 1 }
        }
      }]).toArray();
};

export const getBlockByTransactionHash = async(transactionHash) => {

  const coll = await getCollection();

  return coll.find({ 'transactionHash': transactionHash }).toArray();
}

export const getBlockByUserId = async(userId) => {

  let user = (await userService.getUserById(userId)).data;

  if (!user.wallet || !user.wallet.address) {
    throw new Error('User does not have wallet yet');
  }
  const coll = await getCollection();
  return  coll.aggregate(
    [ 
    { $match: { 
        $and: [{ $or: [ 
                    { type: "Transfer" }, 
                    { type: "AuctionCreated" }, 
                    { type: "AuctionSuccessful" }, 
                    { type: "AuctionCancelled" } 
                  ] 
                },
                { $or: [ { "tx.from": user.wallet.address } ] }
               ]
       }
      }
    ]).toArray();
}

export const getTotalBlockNumbersByUserId = async (userId) => {

  let user = (await userService.getUserById(userId)).data;

  const coll = await getCollection();

    return coll.aggregate(
      [ { $match: { "tx.from": user.wallet.address } },
      { $group: {
        _id: "$type",
        totalGasUsed: { $sum : "$tx.gas" },
        avgGasPrice: { $last : "$tx.gasPrice" },
        count: { $sum : 1 }
      }
    }]).toArray();
};

export const addBlock = async (data) => {
  const coll = await getCollection();
  
  return coll.insertOne(data);
}

module.exports.updateBlockByTransactionHash = async function(transactionHash, event){
  const coll = await getCollection();
  
  return coll.update( { 'transactionHash' : transactionHash }, event );
}

export const getRanking = async() => {

  const users = await userService.getUsers();
  return await Promise.all( users.map(async user => {
    let gas = 0;
    let kitties = [];
    if (user.data.wallet && user.data.wallet.address) {
      kitties = await kittyService.getKittyByUserAddress(user.data.wallet.address);
      gas = parseFloat(await contracts.getBalance(user.data.wallet.address));
    }
    let kittyValues = kitties.reduce((acc, kitty) => { return acc + parseFloat(kitty.value); }, 0);
    return {
      user: user.data,
      kitties,
      gas: contracts.WeiToEther(gas.toString()),
      balance: contracts.WeiToEther( (gas + kittyValues).toString() )
    };
  }));
}