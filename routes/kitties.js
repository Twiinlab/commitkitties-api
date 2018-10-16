import express, { Router, Request } from 'express';
import firebase from 'firebase';
import config  from '../config';

if (!firebase.apps.length) {
    firebase.initializeApp(config.fireConfig);
}
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true});

const router = Router()
router.get('/', async (req, res, next) => {
    try {
        const noteSnapshot = await db.collection('kitties').get();
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
        const note = await db.collection('kitties').doc(id).get();
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