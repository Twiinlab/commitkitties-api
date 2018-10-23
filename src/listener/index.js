'use strict';

import * as contracts from '../utils/contracts.js';
import config  from '../../config';

module.exports.watchContract = async () => {
    const contract = await contracts.getContract('KittyCore');
    try {
        contract.events.allEvents({},  function(error, event){ 
            if (error) {
              console.log(`allEvents Error: ${error}`) 
            }
          })
          .on('data', (log) => {
  
            let { returnValues, blockNumber } = log;
  
            console.log('----------------------------------------------');
            console.log(`--------- EVENT (${log.event}) START ---------`)
            console.log(`returnValues = ${returnValues}`)
            console.log(`blockNumber (${blockNumber})`)
  
  
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