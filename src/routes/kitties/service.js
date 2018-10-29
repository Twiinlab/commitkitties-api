
import firebase from 'firebase';
import config  from '../../../config';
import * as contracts from '../../utils/contracts';

if (!firebase.apps.length) {
    firebase.initializeApp(config.firebase);
}
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true});

export const getKitties = async () => {
    const noteSnapshot = await db.collection('kitties').get();
    const kitties = [];
    noteSnapshot.forEach((doc) => {
        kitties.push({
            id: doc.id,
            data: doc.data()
        });
    });
    return kitties;
};

export const getKittyById = async(id) => {
    if (!id) throw new Error('id is blank');
    const kitties = await db.collection('kitties').doc(id).get();
    if (!kitties.exists) {
        throw new Error('kitties does not exists');
    }
    await contracts.getKittiesById(id);
    return {
        id: kitties.id,
        data: kitties.data()
    };
}

export const addKitty = async (kitty) => {
    if (!kitty) throw new Error('Body is blank');
    await db.collection("kitties").doc(kitty.id).set(kitty);
    return {
        id: kitty.id,
        data: kitty.data
    };    
};

export const updateKitty = async (id, data) => {
    if (!id) throw new Error('id is blank');
    if (!data) throw new Error('kitty is blank');
    const ref = await db.collection('kitties').doc(id).set(data, { merge: true });
    return {
        id,
        data
    };
};

export const deleteKitty = async (id) => {
    if (!id) throw new Error('id is blank');
    await db.collection('kitties').doc(id).delete();
    return {
        id
    };
}