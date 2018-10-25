import config  from '../../config';
import { Router } from 'express'
import { MongoClient,ObjectID } from 'mongodb'

const router = Router()

MongoClient.connect(config.mongo.uri, (err, db) => {

    if (err) return console.log(err)
    let dbase = db.db("commitkitties-db");
    console.log("mongo connection success...")

    router.get('/', async (req, res, next) => {
        try {
            dbase.collection('blocks').find().toArray( (err, results) => {
                res.send(results)
            });
        } catch(e) {
            next(e);
        }
    });

    router.get('/:id', (req, res, next) => {
        if(err) {
          throw err;
        }
    
        let id = ObjectID(req.params.id);
        dbase.collection('blocks').find(id).toArray( (err, result) => {
          if(err) {
            throw err;
          }
          res.send(result);
        });
    });
    
    router.post('/', (req, res, next) => {

        const text = req.body.text;
        if (!text) throw new Error('Text is blank');
        const data = { text };
    
        dbase.collection("blocks").save(data, (err, result) => {
          if(err) {
            console.log(err);
          }
          res.send('block added successfully');
        });
    
      });
    
    router.put('/:id', (req, res, next) => {
        var id = {
          _id: new ObjectID(req.params.id)
        };
    
        dbase.collection("blocks").update(id, {$set:{text: req.body.text}}, (err, result) => {
          if(err) {
            throw err;
          }
          res.send('block updated sucessfully');
        });
      });
    
    router.delete('/:id', (req, res, next) => {
        let id = ObjectID(req.params.id);
    
        dbase.collection('blocks').deleteOne({_id: id}, (err, result) => {
          if(err) {
            throw err;
          }
          res.send('blocks deleted');
        });
      });
});

export default router;