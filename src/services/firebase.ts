import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
}
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()

export { firebase, auth, database }
