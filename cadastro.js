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

document.getElementById("btn-cad").addEventListener("click", (event) => {

    // CASO AS SENHAS ESTIVEREM A MOSTRA ELE OCULTA E CRIA O USER
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    const type_confirm = passwordInputConfirm.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInputConfirm.setAttribute('type', type_confirm);

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("password").value;
    const senha_confirm = document.getElementById("password_confirm").value;

    const nome_completo = nome + "@gmail.com"

    const auth = getAuth();
    const db = getFirestore();

    if (senha !== senha_confirm) {
        alert("As senhas não conferem!");
        return;
    }

    createUserWithEmailAndPassword(auth, nome_completo, senha)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                nome: nome,
                nome_patente: "Recruta Atari",
                pontos: 0,
                setor: "ADM PROGRAMAÇÃO",
                JANEIRO: 0,
                FEVEREIRO: 0,
                MARCO: 0,
                ABRIL: 0,
                MAIO: 0,
                JUNHO: 0,
                JULHO: 0,
                AGOSTO: 0,
                SETEMBRO: 0,
                OUTUBRO: 0,
                NOVEMBRO: 0,
                DEZEMBRO: 0,
                permissao: "OP",
                xp: 0,
            };
            alert("Conta criada")

            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    console.error("Erro ao salvar no banco", error);
                });
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
});

// VER SENHA
const passwordInput = document.getElementById('password');
const passwordInputConfirm = document.getElementById('password_confirm');
const togglePasswordButton = document.getElementById('togglePassword');

togglePasswordButton.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    const type_confirm = passwordInputConfirm.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInputConfirm.setAttribute('type', type_confirm);

    // Mudar o texto do botão dependendo do tipo de input
    this.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
});
