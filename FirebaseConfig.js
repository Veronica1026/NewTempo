import * as firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyAe-G8vLqMkQ9PRm5GJNxO1G_n1MMACXyM",
  authDomain: "tempo-796c1.firebaseapp.com",
  databaseURL: "https://tempo-796c1.firebaseio.com",
  projectId: "tempo-796c1",
  storageBucket: "tempo-796c1.appspot.com",
  messagingSenderId: "244949783463",
  storageBucket: ""

};
const firebaseApp = firebase.initializeApp(firebaseConfig);

// export default firebaseApp;

export default (!firebase.apps.length ? firebaseApp : firebase.app());
