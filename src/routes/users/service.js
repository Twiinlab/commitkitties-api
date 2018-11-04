
import { db } from '../../utils/firebase';
import * as contracts from '../../utils/contracts';

export const getUsers = async () => {
    const noteSnapshot = await db.collection('users').get();
    const users = [];
    noteSnapshot.forEach((doc) => {
        users.push({
            id: doc.id,
            data: doc.data()
        });
    });
    return users;
};

export const getUserById = async(id) => {
    if (!id) throw new Error('id is blank');
    const kitties = await db.collection('users').doc(id).get();
    if (!kitties.exists) {
        throw new Error('user does not exists');
    }
    return {
        id: kitties.id,
        data: kitties.data()
    };
}

export const addUser = async (newUser) => {
    let currentUser = await db.collection('users').doc(newUser.id).get();

    if (!currentUser.data().wallet) {
        const { address, privateKey } = contracts.createAccount();
        newUser.data.wallet = { address, privateKey };
        
        await db.collection('users').doc(newUser.id).set(newUser.data);

        await contracts.fillAccount(address);
        console.log(`transfer gas to ${address}`);
    }

    return {
        id: newUser.id,
        data: newUser.data
    };  
};

export const updateUser = async (id, data) => {
    if (!id) throw new Error('id is blank');
    if (!data) throw new Error('kitty is blank');
    const ref = await db.collection('users').doc(id).set(data, { merge: true });
    return {
        id,
        data
    };
};

export const deleteUser = async (id) => {
    if (!id) throw new Error('id is blank');
    await db.collection('users').doc(id).delete();
    return {
      id
    };
}