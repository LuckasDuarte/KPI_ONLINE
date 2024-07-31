import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

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

  const auth=getAuth();
  const db=getFirestore();

  const image = document.getElementById('img-user');
  const image_patente = document.getElementById('image_patente');

  
  

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('nome').innerText=userData.nome;
                document.getElementById('local-escala').innerText=userData.setor;
                document.getElementById('l-pontuacao').innerText=userData.pontos;

                // Obtendo XP
                const xp = userData.xp;

                let nome_patente = "";

                // controle de patentes
                if(xp >= 45 && xp <= 74){
                    nome_patente = "RECRUTA ATARI"

                }else if(xp >= 75 && xp <= 104){
                    nome_patente = "SOLDADO ODYSSEY"

                }else if(xp >= 105 && xp <= 144){
                    nome_patente = "CABO ARCADIA"

                }else if(xp >= 145 && xp <= 184){
                    nome_patente = "3º SARGENTO"

                }else if(xp >= 185 && xp <= 234){
                    nome_patente = "2º SARGENTO"

                }else if(xp >= 235 && xp <= 294){
                    nome_patente = "1º SARGENTO DYNAVISION"

                }else if(xp >= 295 && xp <= 399){
                    nome_patente = "SUBOFICIAL BOY"

                }else if(xp >= 400 & xp <= 519){
                    nome_patente = "ASPIRANTE MEGA"

                }else if(xp >= 520 && xp <= 654){
                    nome_patente = "2º TENENTE TURBO"

                }else if(xp >= 655 && xp <= 804){
                    nome_patente = "1º TENENTE NEO"

                }else if(xp >= 805 && xp <= 969){
                    nome_patente = "CAPITÃO SUPER"

                }else if(xp >= 970 && xp <= 1149){
                    nome_patente = "MAJOR COMMODORE"

                }else if(xp >= 1150 && xp <= 1344){
                    nome_patente = "TENENTE CORONEL SATURN"

                }else if(xp >= 1345 && xp <= 1554){
                    nome_patente = "CORONEL PLAY"

                }else if(xp >= 1555 && xp <= 1779){
                    nome_patente = "BRIGADEIRO 64"

                }else if(xp >= 1780 && xp <= 2019){
                    nome_patente = "MAJOR BRIGADEIRO ADVANCE"

                }else if(xp >= 2020 && xp <= 2274){
                    nome_patente = "TENENTE BRIGADEIRO BOX"

                }else if(xp >= 2275 && xp <= 2544){
                    nome_patente = "MARECHAL 360"

                }else if(xp >= 2545 && xp <= 2829){
                    nome_patente = "ALMIRANTE ONE"

                }else if(xp >= 2830 && xp <= 3129){
                    nome_patente = "MESTRE SWITCH"

                }else if(xp >= 3130){
                    nome_patente = "RAMBO PS5"

                }
                document.getElementById('patente').innerText= nome_patente

                // FOTO USER
                image.src = `https://github.com/LuckasDuarte/KPI_ONLINE/blob/main/FOTOS_COLABORADORES/${userData.nome}.jpg?raw=true`

                // FOTO PATENTE
                image_patente.src = `https://github.com/LuckasDuarte/KPI_ONLINE/blob/main/PATENTES/${nome_patente}.bmp?raw=true`

            }
            else{
                console.log("ID DE USUÁRIO NAO CONSTA")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

  const logoutButton=document.getElementById('logout');

  // inserir função de logout 
  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })
