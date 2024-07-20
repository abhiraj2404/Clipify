
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHXT13-tWMnwXzYv_JVYqDF8WQSCdz1cE",
  authDomain: "clipify-back.firebaseapp.com",
  projectId: "clipify-back",
  storageBucket: "clipify-back.appspot.com",
  messagingSenderId: "853272924960",
  appId: "1:853272924960:web:8e872aab9570e50fe9bd45",
  measurementId: "G-R10BZDBG2G"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider }