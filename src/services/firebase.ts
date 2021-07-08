import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxdr16deQjM3MGRuU0xAEbB0zPPJm5qsw",
  authDomain: "fearsocial-9b3d2.firebaseapp.com",
  projectId: "fearsocial-9b3d2",
  storageBucket: "fearsocial-9b3d2.appspot.com",
  messagingSenderId: "177036929820",
  appId: "1:177036929820:web:94b455595163e2c2da28d9",
  measurementId: "G-2YP3FJMVRK"
}
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()

export { firebase, auth, database }