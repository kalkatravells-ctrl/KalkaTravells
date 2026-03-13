import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCaw1AL2X1jnik96nRcsq057feyPAU6iy8",
  authDomain: "kalkatravells-e5bb0.firebaseapp.com",
  projectId: "kalkatravells-e5bb0",
  storageBucket: "kalkatravells-e5bb0.firebasestorage.app",
  messagingSenderId: "473304509245",
  appId: "1:473304509245:web:7361efe7a68e452a3d3354",
  measurementId: "G-8DRMSZ95E4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app;