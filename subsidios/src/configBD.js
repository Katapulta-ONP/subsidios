import firebase from 'firebase/app'
import 'firebase/firebase-database'

const firebaseConfig = {
    apiKey: "AIzaSyDVMS3AinOFyQv7Cq_bFIgAD2avd_Dk5pU",
    authDomain: "pruebas-onp-e3487.firebaseapp.com",
    databaseURL: "https://pruebas-onp-e3487.firebaseio.com",
    projectId: "pruebas-onp-e3487",
    storageBucket: "pruebas-onp-e3487.appspot.com",
    messagingSenderId: "51552745500",
    appId: "1:51552745500:web:baac84b7d26640f2b247d9",
    measurementId: "G-RESJ9NWK6C"
}



export const fire = firebase.initializeApp(firebaseConfig);
export const fireDataBase = firebase.database();