
import { db } from '../../utils/firebase';
import * as contracts from '../../utils/contracts';

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
    const kitty = await db.collection('kitties').doc(id).get();
    if (!kitty.exists) {
        throw new Error('kitty does not exists');
    }
    return {
        id: kitty.id,
        data: kitty.data()
    };
}

export const getKittyByUserAddress = async(userAddrs) => {
    if (!userAddrs) throw new Error('userAddrs is blank');
    let list = [];
    const kitties = await db.collection('kitties').where("owner.address","==",userAddrs).get();
    kitties.forEach(kitty=>{
        list.push(kitty.data());
    });
    return list;
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