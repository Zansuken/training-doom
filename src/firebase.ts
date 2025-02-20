import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyD0-nx7C25UZui6lGyuSDSGLvaYhfDgqM4",
  authDomain: "training-doom.firebaseapp.com",
  projectId: "training-doom",
  storageBucket: "training-doom.firebasestorage.app",
  messagingSenderId: "467301943833",
  appId: "1:467301943833:web:069c5dc8a594d65d59f888",
  measurementId: "G-M78ML985SC",
  databaseURL: "https://training-doom-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

async function getCities() {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

getCities().then(cities => {
  console.log(cities);
});

export { app, analytics, db, auth };