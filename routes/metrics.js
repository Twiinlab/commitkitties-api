import config  from '../config';

const MongoClient = require('mongodb').MongoClient

// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
//const PROD_URI = "mongodb://<dbuser>:<dbpassword>@<host1>:<port1>,<host2>:<port2>/<dbname>?replicaSet=<replicaSetName>"
const uri = "mongodb://commitkitties-admin:X9%csky+NBvEU5w8@ds119503.mlab.com:19503/commitkitties-db"

let mongoConnection;

function getConnection(url) {
  return mongoConnection ? mongoConnection : MongoClient.connect(url).then(client => client.db())
}


module.exports.getKPIs = function(){
    let connect = getConnection(PROD_URI);


}

if (!firebase.apps.length) {
    firebase.initializeApp(config.fireConfig);
}
const db = firebase.firestore();

const router = Router()
router.get('/', async (req, res, next) => {
    try {
        const noteSnapshot = await db.collection('notes').get();
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
        const note = await db.collection('notes').doc(id).get();
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
        const text = req.body.text;
        if (!text) throw new Error('Text is blank');
        const data = { text };
        const ref = await db.collection('notes').add(data);
        res.json({
            id: ref.id,
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
        const ref = await db.collection('notes').doc(id).set(data, { merge: true });
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
        await db.collection('notes').doc(id).delete();
        res.json({
            id
        });
    } catch(e) {
        next(e);
    }
});

export default router;