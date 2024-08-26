import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getStorage ,  ref ,uploadBytes  ,getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
import { getFirestore ,collection ,addDoc ,getDocs ,deleteDoc,doc ,getDoc ,updateDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth  ,createUserWithEmailAndPassword ,onAuthStateChanged ,sendPasswordResetEmail ,signInWithPopup ,GoogleAuthProvider ,signInWithEmailAndPassword ,signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

 const firebaseConfig = {
   apiKey: "AIzaSyCIE_JWlN1lG9AbODBzCuL3a2ZK8txM5Yo",
   authDomain: "quiz-app-8e7e4.firebaseapp.com",
   projectId: "quiz-app-8e7e4",
   storageBucket: "quiz-app-8e7e4.appspot.com",
   messagingSenderId: "492025116076",
   appId: "1:492025116076:web:69693adf738e9e3b3bf609",
   measurementId: "G-PRRXF8NGBM"
 };

 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app)
 const auth = getAuth(app)
 const storage = getStorage(app);
 const provider = new GoogleAuthProvider();

 export{db ,auth ,createUserWithEmailAndPassword ,onAuthStateChanged ,sendPasswordResetEmail ,signInWithPopup ,GoogleAuthProvider,getDoc ,getDownloadURL , provider ,signInWithEmailAndPassword ,collection , addDoc,updateDoc  ,getDocs ,signOut ,deleteDoc, doc,storage , ref ,uploadBytes }
