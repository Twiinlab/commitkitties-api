
import * as contracts from '../../utils/contracts';
import * as db from '../../utils/db';
import * as config from '../../../config';
import * as userService from '../users/service';

async function getCollection(collection = 'blocks') {
  return await db.getDb(config.default.mongo.db).then((client) => client.collection(collection));
}

export const getBlocks = async () => {
  const coll = await getCollection();

  return  coll.find({}).toArray();
};

export const getBlockByTransactionHash = async(transactionHash) => {

  const coll = await getCollection();

  return coll.find({ 'transactionHash': transactionHash }).toArray();
}

async function getCallAggregate(){
  const coll = await getCollection();
  return  coll.aggregate(
    [ { $match: { $or: [ { type: "callSmartContract" }, { type: "invokeSmartContract" } ] } },
      queryCalls("$event")
    ]).toArray();
}

export const getBlockByUserId = async(userId) => {

  let user = (await userService.getUserById(userId)).data;

  const coll = await getCollection();
  return  coll.aggregate(
    [ 
      { $match: { 
          $and: [
              {
                  $or: [ 
                      { type: "Transfer" }, 
                      { type: "AuctionCreated" }, 
                      { type: "AuctionSuccessful" }, 
                      { type: "AuctionCancelled" } 
                    ] 
                  },
              {
                  $or: [ { "params.from": user.wallet.address } ]
                  
                  }
          ]
         }
        },
        { 
          $group: {
              _id: "$type",
              gasPrice: { $last : "$tx.gasPrice" },
              count: { $sum : 1 }
            }
          }
      ]).toArray();
}

export const addBlock = async (data) => {
  const coll = await getCollection();
  
  return coll.insertOne(data);
}

module.exports.updateBlockByTransactionHash = async function(transactionHash, event){
  const coll = await getCollection();
  
  return coll.update( { 'transactionHash' : transactionHash }, event );
}

function queryDeploy( index ){
  return { 
    $group: {
        _id: index,
        avgMinedTime: { $last : 0 },
        avgGasUsed: { $avg : "$metric.gasUsed" },
        totalMinedTime: { $last : 0 },
        totalGasUsed: { $sum : "$metric.gasUsed" },
        gasPrice: { $last : "$metric.gasPrice" },
        totalGasCost: { $sum : { $multiply : ["$metric.gasUsed" , "$metric.gasPrice"] }},
        count: { $sum : 1 }
      }
    };
  }

function queryCalls(index){
  return { 
    $group: {
        _id: index,
        avgMinedTime: { $avg : { $subtract : [ "$activity.mined.timestamp" , "$activity.pending.timestamp"] }},
        avgGasUsed: { $avg : "$activity.mined.response.gasUsed" },
        totalMinedTime: { $sum : { $subtract : [ "$activity.mined.timestamp" , "$activity.pending.timestamp"] }},
        totalGasUsed: { $sum : "$activity.mined.response.gasUsed" },
        gasPrice: { $last : "$metric.gasPrice" },
        totalGasCost: { $sum : { $multiply : ["$activity.mined.response.gasUsed" , "$metric.gasPrice"] }},
        count: { $sum : 1 }
      }
    };
}

async function getDeployAggregate(){
  const coll = await getCollection();
  return coll.aggregate(
    [ { $match: { event: "deployContract" } },
      queryDeploy("$event")
    ]).toArray();
}

async function getCallAggregate(){
  const coll = await getCollection();
  return  coll.aggregate(
    [ { $match: { $or: [ { event: "callSmartContract" }, { event: "invokeSmartContract" } ] } },
      queryCalls("$event")
    ]).toArray();
}

module.exports.getLeaderboard = async () => {

  return Promise.all([getDeployAggregate(), getCallAggregate()])
    .then(([eventDeploy, eventCall]) => {
        return eventDeploy.concat(eventCall);
      });
}