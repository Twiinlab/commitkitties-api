import firebase from 'firebase'
import 'firebase/firestore'
import params from '../../config'


if (!firebase.apps.length) {
    firebase.initializeApp(params.firebase);
}

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const kittiesCollection = db.collection('kitties')
const contractsCollection = db.collection('contracts')
const rankingCollection = db.collection('ranking')


export {
    firebase,
    db,
    auth,
    currentUser,
    usersCollection,
    kittiesCollection,
    contractsCollection,
    rankingCollection
}
