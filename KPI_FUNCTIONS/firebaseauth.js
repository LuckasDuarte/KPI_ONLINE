// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmulUfdQ9FGYrJSWGN_SiZt4OIkhtnxLI",
  authDomain: "kpi-online-ee656.firebaseapp.com",
  projectId: "kpi-online-ee656",
  storageBucket: "kpi-online-ee656.appspot.com",
  messagingSenderId: "1012441950778",
  appId: "1:1012441950778:web:c9ac6c7c3be0dc8e95a303"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }

const signUp = document.getElementById("submitSignUp");
signUp.addEventListener("click", (event)=> {
    event.preventDefault();

    const email = document.getElementById("rEmail").value;
    const password = document.getElementById("rPassword").value;

    const fName = document.getElementById("fName").value;
    const lName = document.getElementById("lName").value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user = userCredential.user;
        const userData = {
            email: email,
            firstName: fName,
            lastName: lName
        };
        showMessage("Conta criada com sucesso!","signUpMessage");

        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(()=>{
            window.location.href = "index.html"
        })
        .catch((error)=>{
            console.error("Erro ao salvar no bando", error)
        })
    })
    .catch((error)=>{
        const errorCode = error.code;
        if(errorCode == "auth/email-already-in-use"){
            showMessage("Email ja em uso!","signUpMessage")
        }
        else{
            showMessage("Erro ao criar usuário!","signUpMessage")
        }
    })
})

// ------------ LOGIN ------------
const SignIn = document.getElementById("submitSignIn")
SignIn.addEventListener("click",(event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) =>{
        showMessage("login realizado com Sucesso!","signUpMessage");
        const user = userCredential.user;

        localStorage.setItem("loggedInUserId", user.uid)
        window.location.href = "homepage.html"
    })
    .catch((error)=>{
        const errorCode = error.code;
        if(errorCode == "auth/invalid-credential"){
            showMessage("Erro ao entrar!","signUpMessage")
        }
        else{
            showMessage("Conta não existe!","signUpMessage")
        }
    })
})
