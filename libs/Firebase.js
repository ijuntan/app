import * as firebase from 'firebase'
import '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBHsmmALZ-kt88699SPojLKHgUTC3na8jw",
    authDomain: "study-app-8058e.firebaseapp.com",
    databaseURL: "https://study-app-8058e.firebaseio.com",
    projectId: "study-app-8058e",
    storageBucket: "study-app-8058e.appspot.com",
    messagingSenderId: "189069193189",
    appId: "1:189069193189:web:f1a020178d5564a749090c",
    measurementId: "G-0MWTR79VET"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export function getUser() {
    return new Promise((resolve,reject)=> {
        const db = firebase.firestore();
        db.collection('user').get()
        .then((snapshot) => {
            if (snapshot.empty)
            {
                resolve(null)
            }
            else
            {
                dataArray = [];
                snapshot.forEach((doc) => {
                    dataArray.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });                
                resolve(dataArray)
            }
        })
        .catch((err)=>
            reject(err)
        )
    })
}

export function getClass() {
    return new Promise((resolve,reject)=> {
        const db = firebase.firestore();
        db.collection('classes').get()
        .then((snapshot) => {
            if (snapshot.empty)
            {
                resolve(null)
            }
            else
            {
                dataArray = [];
                snapshot.forEach((doc) => {
                    dataArray.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });                
                resolve(dataArray)
            }
        })
        .catch((err)=>
            reject(err)
        )
    })
}

export function getTasks() {
    return new Promise((resolve,reject)=> {
        const db = firebase.firestore();
        db.collection('tasks').get()
        .then((snapshot) => {
            if (snapshot.empty)
            {
                resolve(null)
            }
            else
            {
                dataArray = [];
                snapshot.forEach((doc) => {
                    dataArray.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });                
                resolve(dataArray)
            }
        })
        .catch((err)=>
            reject(err)
        )
    })
}


export function Login (username,password)
{
    return new Promise((resolve,reject)=>
        firebase.auth().signInWithEmailAndPassword(username,password).then(()=>
            getUser(username).then((data)=>{
                resolve(data);
            })
            .catch((err)=> {
                reject(err)
            })
        .catch((function(error){
            reject(error)
        })
            
        )))
}