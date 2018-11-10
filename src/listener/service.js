'use strict';

import * as kpiService from '../routes/kpis/service';
import * as firebase from '../utils/firebase';

module.exports.syncKPIs = async () => {
    setInterval(async function(){ 
        await updateRanking(); 
        await updateKPIs(); 
    }, 60000);
}

async function updateRanking(){
    console.log(`update ranking`);
    const ranking = await kpiService.getRanking();
    return await Promise.all(ranking.map(async rank => {
        await firebase.rankingCollection.doc(rank.user.userId).set(rank);
    }));
}

async function updateKPIs(){
    console.log(`update KPIs at ${new Date()}`);
    const kpis = await kpiService.getTotalBlockNumbers();
    return await Promise.all(kpis.map(async kpi => {
        await firebase.kpiCollection.doc(kpi._id).set(kpi);
    }));
}