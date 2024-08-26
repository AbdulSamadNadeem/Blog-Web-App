import {auth , signInWithEmailAndPassword ,sendPasswordResetEmail ,onAuthStateChanged ,GoogleAuthProvider ,signInWithPopup , provider } from '../firebase.js'

let email = document.getElementById('email')
let password = document.getElementById('password')
let loginBtn = document.getElementById('login')
let Googlebtn = document.getElementById('googlebtn')
let loader = document.querySelector('.loader')
let form = document.querySelector('.contianer')
loader.style.display='none'


const Login=()=>{
  form.style.display='none'
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
    loader.style.display='block'

    const user = userCredential.user;
    Toastify({

        text: 'Login In Successfully',
        
        duration: 3000
        
        }).showToast();
    
    
  })
  .catch((error) => {
    const errorMessage = error.message;

    Toastify({

        text: errorMessage,
        
        duration: 3000
        
        }).showToast();
    
  });
   form.style.display='block'
   loader.style.display='none'
  email.value=''
  password.value=''

}

loginBtn.addEventListener('click', Login)

const GoogleSignup=()=>{
    signInWithPopup(auth, provider)
   .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    Toastify({
 
     text: 'SignIn',
     
     duration: 3000
     
     }).showToast();
     
   }).catch((error) => {
 
     const errorMessage = error.message;
     Toastify({
 
         text: errorMessage,
         
         duration: 3000
         
         }).showToast();
 
    
   });
 
 }
 
 Googlebtn.addEventListener('click',GoogleSignup)
 
 
 onAuthStateChanged(auth, (user) => {
     if (user) {
     
         window.location.href='../Dashboard/dashboard.html'
      
     } 
   });


let fpass = document.getElementById('fpass')
const ResetPass=()=>{
  sendPasswordResetEmail(auth, email.value)
  .then(() => {
    Toastify({
 
      text: "Password Reset Email Sent!",
      
      duration: 3000
      
      }).showToast();
  })
  .catch((error) => {
    const errorMessage = error.message;
    Toastify({
 
      text: errorMessage,
      
      duration: 3000
      
      }).showToast();
    
  });
}  
fpass.addEventListener('click',ResetPass)