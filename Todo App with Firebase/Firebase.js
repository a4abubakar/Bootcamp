import * as firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyDOuaEyYK_WC_-7kcnin7KLR_Czvy8TFBE",
    authDomain: "todoapp-516ba.firebaseapp.com",
    databaseURL: "https://todoapp-516ba.firebaseio.com",
    projectId: "todoapp-516ba",
    storageBucket: "todoapp-516ba.appspot.com",
    messagingSenderId: "574758150108",
    appId: "1:574758150108:web:ac36beef3fdf494d20f919"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase