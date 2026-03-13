import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCaw1AL2X1jnIk96nRcsqO57feyPAU6iY8",
  authDomain: "kalkatravells-e5bb0.firebaseapp.com",
  projectId: "kalkatravells-e5bb0",
  storageBucket: "kalkatravells-e5bb0.firebasestorage.app",
  messagingSenderId: "473304509245",
  appId: "1:473304509245:web:7361efe7a68e452a3d3354",
  measurementId: "G-8DRMSZ95E4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };