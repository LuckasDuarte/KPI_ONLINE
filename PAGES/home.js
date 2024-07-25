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
  

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('nome').innerText=userData.nome;
                document.getElementById('local-escala').innerText=userData.setor;
                document.getElementById('patente').innerText=userData.nome_patente;
                document.getElementById('l-pontuacao').innerText=userData.pontos;
                
                // foto 
                image.src = `https://github.com/LuckasDuarte/KPI_ONLINE/blob/main/FOTOS_COLABORADORES/${nome}.jpg?raw=true`

            }
            else{
                console.log("no document found matching id")
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