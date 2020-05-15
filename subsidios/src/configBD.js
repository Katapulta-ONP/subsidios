import firebase from 'firebase/app'
import 'firebase/firebase-database'

const firebaseConfig = {
    apiKey: "AIzaSyDVMS3AinOFyQv7Cq_bFIgAD2avd_Dk5pU",
    authDomain: "pruebas-onp-e3487.firebaseapp.com",
    databaseURL: "https://pruebas-onp-subsidio.firebaseio.com/",
    projectId: "pruebas-onp-e3487",
    storageBucket: "pruebas-onp-e3487.appspot.com",
    messagingSenderId: "51552745500",
    appId: "1:51552745500:web:baac84b7d26640f2b247d9",
    measurementId: "G-RESJ9NWK6C"
}

const fire = firebase.initializeApp(firebaseConfig);
const firebaseBase = firebase.database();
const fireDataBase1 = fire.database("https://pruebas-onp-subsidio1.firebaseio.com/");
const fireDataBase2 = fire.database("https://pruebas-onp-subsidio2.firebaseio.com/");
export const fireDataBases = [fireDataBase1, fireDataBase2]