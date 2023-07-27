import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0UQD-LPqIqhsUz12oeTgOHlLoVyaMA0E",
  authDomain: "netflix-clone-rudra-19307.firebaseapp.com",
  projectId: "netflix-clone-rudra-19307",
  storageBucket: "netflix-clone-rudra-19307.appspot.com",
  messagingSenderId: "1078736451138",
  appId: "1:1078736451138:web:8f06cd553130ec697b5fdb",
};

const firebaseApp = initializeApp(firebaseConfig);
// const db = firebaseApp.fireStore();
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
// export default db;
