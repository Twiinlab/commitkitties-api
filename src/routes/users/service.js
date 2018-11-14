
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
    const kitty = await db.collection('users').doc(id).get();
    if (!kitty || !kitty.data()) {
        return null;
    }
    return {
        id: kitty.id,
        data: kitty.data()
    };
}
 
export const addUser = async (newUser) => {
    let currentUser = await db.collection('users').doc(newUser.id).get();
    let userData = {}
    if (!currentUser.data() || !currentUser.data().wallet) {
        userData = currentUser.data() || {};
        const { address, privateKey } = contracts.createAccount();
        userData.wallet = { address, privateKey };
        await db.collection('users').doc(newUser.id).set(userData);

        await contracts.fillAccount(address);
        console.log(`transfer gas to ${address}`);
    }
    return userData;
};

export const updateUser = async (id, data) => {
    if (!id) throw new Error('id is blank');
    if (!data) throw new Error('kitty is blank');
    const ref = await db.collection('users').doc(id).set(data, { merge: true });
    return { id, data };
};

export const deleteUser = async (id) => {
    if (!id) throw new Error('id is blank');
    await db.collection('users').doc(id).delete();
    return {
      id
    };
}