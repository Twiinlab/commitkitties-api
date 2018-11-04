import mongodb from 'mongodb';
import * as config from '../../config';

let client;

export const connect = async function connect() {

  if (client) {
    return Promise.resolve(client);
  }

  const MongoClient = mongodb.MongoClient;

  // Connection URL
  // tslint:disable-next-line:max-line-length
  const url = config.default.mongo.uri; //`${config.db.protocol}://${credentials}${config.db.host}/${config.db.database}?${config.db.params}`;

  console.log('connection string = ', url);

  return MongoClient
    .connect(url, { useNewUrlParser: true })
    .then((mongoClient) => {

      console.log('Connected successfully to server');

      client = mongoClient;
      return client;

    })
    .catch((err) => {

      throw new Error('Error conecting with mongo ' + err);

    });

}

export const close = async () => {

  return client
    ? client.close()
    : Promise.resolve();

}

export const getClient = async function getClient() {

  return client
    ? client
    : connect();

}

export const getDb = (database) => {

  return getClient().then((cli) => cli.db(database));

}

export const getObjectId = (id) => {

  return new mongodb.ObjectId(id);

}