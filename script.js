import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

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


// ------------ LOGIN ------------
const BtnLogin = document.getElementById("btn-login")
BtnLogin.addEventListener("click",(event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const email_complemento = "@gmail.com"
    const email_completo = email + email_complemento

    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, email_completo, password)
    .then((userCredential) =>{
        
        const user = userCredential.user;
        
        localStorage.setItem("loggedInUserId", user.uid)
        window.location.href = "PAGES/home.html"
    })
    .catch((error)=>{
        const errorCode = error.code;
        if(errorCode == "auth/invalid-credential"){
            Toastify({
                    text: "ERRO AO ENTRAR!",
                    duration: 4000
                }).showToast();
        }
        else{
            Toastify({
                text: "A CONTA NÃO EXISTE!",
                duration: 4000
            }).showToast();
        }
    })
})

// ver a senha
const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('togglePassword');

togglePasswordButton.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Mudar o texto do botão dependendo do tipo de input
    this.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
});

