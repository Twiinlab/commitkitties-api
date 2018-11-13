'use strict';

import * as contracts from '../utils/contracts';
import * as kittyService from '../routes/kitties/service';
import * as firebase from '../utils/firebase';
import * as db from '../utils/db.js';
import * as config from '../../config';
import { web3connection } from '../utils/contracts';


async function getCollection(collection = 'blocks') {
  return await db.getDb(config.default.mongo.db).then((client) => client.collection(collection));
}

async function persistBlock(data){
  const coll = await getCollection();
  
  return coll.insertOne(data);
}

async function insertKpi(data){
  data.tx = await web3connection.eth.getTransaction(data.transactionHash);
  await persistBlock(data);
}

module.exports.watchContract = async () => {

  firebase.contractsCollection.doc('KittyCore').onSnapshot( async () => { 
    watchAllEvents( await contracts.getContract('KittyCore') );
  });

  firebase.contractsCollection.doc('SaleClockAuction').onSnapshot( async () => { 
    watchAllEvents( await contracts.getContract('SaleClockAuction') );
  })

}

function printEvent( log ){
    console.log('----------------------------------------------');
    console.log(`--------- EVENT (${log.event}) START ---------`)
    console.log(`returnValues = ${log.returnValues}`)
    console.log(`blockNumber (${log.blockNumber})`)
}

async function watchAllEvents( contract ) {
    try {
        contract.events.allEvents({},  function(error, event){ 
            if (error) {
              console.log(`allEvents Error: ${error}`) 
            }
          })
          .on('data', async (log) => {
            printEvent( log )
            try {
              let kitty;
              switch (log.event) {
                case 'Transfer':
                  //log.returnValues="from":"0x4AAa4E3ce8E9d8A6533B75db54da017E2Cf811c8","to":"0x2B7ec3747C6d4EBfd79512Ac2ad32C189aFe911c","tokenId":"12"
                  kitty = await kittyService.getKittyById(log.returnValues.tokenId);
                  kitty.data.owner = { address: log.returnValues.to };
                  await kittyService.updateKitty(kitty.id, kitty.data);
                  break;
                case 'AuctionCreated':
                  //log.returnValues="tokenId":"12","startingPrice":"200","endingPrice":"200","duration":"200"
                  kitty = await kittyService.getKittyById(log.returnValues.tokenId);
                  kitty.data.auction = { price: parseInt(log.returnValues.startingPrice) };
                  await kittyService.updateKitty(kitty.id, kitty.data);
                  break;
                case 'AuctionSuccessful':
                  //log.returnValues="tokenId":"13","totalPrice":"100","winner":"0x6999e1D9ec10d0b0D06C657e289F55A2e17DEa64"
                  kitty = await kittyService.getKittyById(log.returnValues.tokenId);
                  kitty.data.value = parseInt(kitty.data.auction.price);
                  kitty.data.auction = { };
                  kitty.data.owner = { address: log.returnValues.winner };
                  await kittyService.updateKitty(kitty.id, kitty.data);
                  break;
                case 'AuctionCancelled':
                  //log.returnValues="tokenId":"13",
                  kitty = await kittyService.getKittyById(log.returnValues.tokenId);
                  kitty.data.auction = { };
                  await kittyService.updateKitty(kitty.id, kitty.data);
                  break;
                default:
                  break;
              }
              //Persist KPI
              await insertKpi({
                transactionHash: log.transactionHash,
                type: log.event,
                params: log.returnValues,
                data: log,
                timestamp: new Date()
              })
            } catch (error) {
                console.log(`watchAllEvents Event: ${log.event} Error: ${error}`)
            }
            
            //Birth
            

          })
          .on('changed', (log) => {
              console.log(`Changed: ${log}`)
          })
          .on('error', (log) => {
              console.log(`Error:  ${log}`)
          })
  
    } catch (error) {
        console.log(`Event Listener error: ${error}`);
    }
}

