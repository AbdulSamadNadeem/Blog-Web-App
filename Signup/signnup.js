import {auth , createUserWithEmailAndPassword , onAuthStateChanged ,GoogleAuthProvider ,signInWithPopup , provider}  from '../firebase.js'

let Signupbtn = document.getElementById('Signup')
let googlebtn = document.getElementById('ggoglebtn')
let Useremail = document.getElementById('Useremail')
let Userpass = document.getElementById('Userpass')

const Signup =()=>{
  createUserWithEmailAndPassword(auth, Useremail.value, Userpass.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)

    Toastify({

        text: 'Sign Up ',
        
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
  Useremail.value=''
  Userpass.value=''
}



Signupbtn.addEventListener('click',Signup)



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

googlebtn.addEventListener('click',GoogleSignup)


onAuthStateChanged(auth, (user) => {
    if (user) {
    
        window.location.href='../Dashboard/dashboard.html'
     
    } 
  });