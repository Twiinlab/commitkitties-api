'use strict';

import * as kpiService from '../routes/kpis/service';
import * as firebase from '../utils/firebase';

module.exports.syncRanking = async () => {
    setInterval(function(){ updateRanking(); }, 60000);
}

async function updateRanking(){
    console.log(`update ranking at ${new Date()}`);
    const ranking = await kpiService.getRanking();
    return await Promise.all(ranking.map(async rank => {
        await firebase.rankingCollection.doc(rank.user.userId).set(rank);
    }));
}