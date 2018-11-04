// db:
// protocol: mongodb
// host: mongo:27017
// params: ''
// database: admin
// user: ''
// pass: ''
// campus:
//   database: edutoken
//   collections:
//     auth: auth
//     historic: historic
//     whitelist: whitelist
//     events: events
//     processing: processing

export default {
  firebase: {
    apiKey: "AIzaSyAQxPhK8Hag2-C0HUWS0HSkfSmmsrDMoW8",
    authDomain: "commitkitties.firebaseapp.com",
    databaseURL: "https://commitkitties.firebaseio.com",
    projectId: "commitkitties",
    storageBucket: "commitkitties.appspot.com",
    messagingSenderId: "1020750963599"
  },
  mongo: {
    db: "commitkitties-db",
    uri: "mongodb://commitkittiesadmin:commitkitties2018@ds119503.mlab.com:19503/commitkitties-db"
  },
  network: {
    "ganache": {
      "mnemonic": "cargo little forum bring connect ready old matter accident ability never thumb"
    }
  }
};