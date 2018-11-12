// const defaultConfig = require('./default.json');
const env = process.env.NODE_ENV;

const defaultConfig = {
  network: {
    "ganache": {
      "mnemonic": "cargo little forum bring connect ready old matter accident ability never thumb"
    }
  }
}

const custom = {
  dev: {
    mongo: {
      db: "commitkitties-db",
      uri: "mongodb://commitkittiesadmin:commitkitties2018@ds119503.mlab.com:19503/commitkitties-db"
    },
    firebase: {
      apiKey: "AIzaSyAQxPhK8Hag2-C0HUWS0HSkfSmmsrDMoW8",
      authDomain: "commitkitties.firebaseapp.com",
      databaseURL: "https://commitkitties.firebaseio.com",
      projectId: "commitkitties",
      storageBucket: "commitkitties.appspot.com",
      messagingSenderId: "1020750963599"
    },
    api: {
      endpoint: 'http://localhost:8080',
      base: '/api'
    },
    network:{
      http: "http://localhost:8545",
      ws: "ws://localhost:8545",
      account: {
        address: "0x4aaa4e3ce8e9d8a6533b75db54da017e2cf811c8",
        key: "0xbb73e8a2733d614b215c1a651dd3884cabf1149a6dc847f1b6ce20c9d2f682ce"
      },
      mnemonic: "cargo little forum bring connect ready old matter accident ability never thumb"
    } 
  },
  pre: {
    mongo: {
      db: "commitkitties-db",
      uri: "mongodb://commitkittiesadmin-geth:commitkitties2018-geth@ds119503.mlab.com:19503/commitkitties-db"
    },
    firebase: {
      apiKey: "AIzaSyAneLpLkRE7lLi2tFasaQHXs18FuLBz1IY",
      authDomain: "commitkitties-geth.firebaseapp.com",
      databaseURL: "https://commitkitties-geth.firebaseio.com",
      projectId: "commitkitties-geth",
      storageBucket: "commitkitties-geth.appspot.com",
      messagingSenderId: "908015484677"
    },
    api: {
      endpoint: 'http://localhost:8080',
      base: '/api'
    },
    network:{
      http: "http://35.231.178.158:8545",
      ws: "ws://35.231.178.158:8545",
      account: {
        address: "0x4aaa4e3ce8e9d8a6533b75db54da017e2cf811c8",
        key: "0xbb73e8a2733d614b215c1a651dd3884cabf1149a6dc847f1b6ce20c9d2f682ce"
      },
      mnemonic: "cargo little forum bring connect ready old matter accident ability never thumb"
    } 
  },
  pro: {
    mongo: {
      db: "commitkitties-db",
      uri: "mongodb://commitkittiesadmin:commitkitties2018@ds119503.mlab.com:19503/commitkitties-db"
    },
    firebase: {
      apiKey: "AIzaSyAQxPhK8Hag2-C0HUWS0HSkfSmmsrDMoW8",
      authDomain: "commitkitties.firebaseapp.com",
      databaseURL: "https://commitkitties.firebaseio.com",
      projectId: "commitkitties",
      storageBucket: "commitkitties.appspot.com",
      messagingSenderId: "1020750963599"
    },
    api: {
      endpoint: 'https://commitkitties-api.appspot.com',
      base: '/api'
    },
    network: {
      http: "https://rinkeby.infura.io/2nluVzjZVelxFadFKD0f",
      ws: "wss://rinkeby.infura.io/2nluVzjZVelxFadFKD0f",
      account: {
          address: "0x359247c938ea24Aef9e30fDD8eaa0F39DCbB2249",
          key: "92EAE2BCD7BCF17BF9FA0E82DE08393BF5D67AB9203C704A95CC793F25A1E37C"
      }
    }
  }
};

export default Object.assign( {}, defaultConfig, custom[env ? env : 'pro']);