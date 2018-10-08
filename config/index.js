const fireConfig = {
    apiKey: "AIzaSyAQxPhK8Hag2-C0HUWS0HSkfSmmsrDMoW8",
    authDomain: "commitkitties.firebaseapp.com",
    databaseURL: "https://commitkitties.firebaseio.com",
    projectId: "commitkitties",
    storageBucket: "commitkitties.appspot.com",
    messagingSenderId: "1020750963599"
  };

  const mongoConfig = {
    uri: "mongodb://commitkittiesadmin:commitkitties2018@ds119503.mlab.com:19503/commitkitties-db"
  };

export default {
  fireConfig,
  mongoConfig
};