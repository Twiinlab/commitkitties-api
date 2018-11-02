import express, { Router, Request } from 'express';

import { db }  from '../utils/firebase';
import * as contracts from '../utils/contracts';


const router = Router()
router.get('/', async (req, res, next) => {
    try {
        const noteSnapshot = await db.collection('users').get();
        const notes = [];
        noteSnapshot.forEach((doc) => {
            notes.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.json(notes);
    } catch(e) {
        next(e);
    }
});

router.get('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('id is blank');
        const note = await db.collection('users').doc(id).get();
        if (!note.exists) {
            throw new Error('note does not exists');
        }
        res.json({
            id: note.id,
            data: note.data()
        });
    } catch(e) {
        next(e);
    }
})

router.post('/', async (req, res, next) => {
    try {
        debugger;
        const newUser = req.body;
        if (!newUser) throw new Error('newUser is blank');

        let currentUser = await db.collection('users').doc(newUser.id).get();

        if (!currentUser.data().wallet) {
            const { address, privateKey } = contracts.createAccount();
            newUser.data.wallet = { address, privateKey };
            
            await db.collection('users').doc(newUser.id).set(newUser.data);
    
            await contracts.fillAccount(address);
            console.log(`transfer gas to ${address}`);
        }

        res.json({
            id: newUser.id,
            data: newUser.data
        });
    } catch(e) {
        next(e);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const text = req.body.text;
        if (!id) throw new Error('id is blank');
        if (!text) throw new Error('Text is blank');
        const data = { text };
        const ref = await db.collection('users').doc(id).set(data, { merge: true });
        res.json({
            id,
            data
        });
    } catch(e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('id is blank');
        await db.collection('users').doc(id).delete();
        res.json({
            id
        });
    } catch(e) {
        next(e);
    }
});

export default router;