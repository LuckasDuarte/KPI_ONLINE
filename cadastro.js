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
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("password").value;
    const senha_confirm = document.getElementById("password_confirm").value;

    const nome_completo = nome + "@gmail.com"

    console.log(nome, senha, senha_confirm, nome_completo)

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
                setor: "ADM PROGRAMAÇÃO"
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
        .catch((error) => {
            console.error("Erro ao criar usuário", error);
        });
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
