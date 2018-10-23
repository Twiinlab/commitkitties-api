import express, { Router, Request } from 'express';
import firebase from 'firebase';
import config  from '../../config';
import * as contracts from '../utils/contracts';

if (!firebase.apps.length) {
    firebase.initializeApp(config.fireConfig);
}
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true});

const router = Router()
router.get('/', async (req, res, next) => {
    try {
        const noteSnapshot = await db.collection('kitties').get();
        const kitties = [];
        noteSnapshot.forEach((doc) => {
            kitties.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.json(kitties);
    } catch(e) {
        next(e);
    }
});

router.get('/:id', async(req, res, next) => {
    console.log(`call GET kitties`);

    try {
        const id = req.params.id;
        if (!id) throw new Error('id is blank');
        const kitties = await db.collection('kitties').doc(id).get();
        if (!kitties.exists) {
            throw new Error('kitties does not exists');
        }
        console.log(`firebase kitties: ${kitties}`)

        const result = await contracts.getKittiesById(id);
        console.log(`blockchain kitties: ${JSON.stringify(result)}`)

        res.json({
            id: kitties.id,
            data: kitties.data()
        });
    } catch(e) {
        next(e);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        if (!data) throw new Error('Body is blank');
        
        const ref = await db.collection("kitties").doc(data.id).set(data);

        res.json({
            id: data.id,
            data
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
        const ref = await db.collection('kitties').doc(id).set(data, { merge: true });
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
        await db.collection('kitties').doc(id).delete();
        res.json({
            id
        });
    } catch(e) {
        next(e);
    }
});

export default router;