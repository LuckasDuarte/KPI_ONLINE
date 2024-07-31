import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

const auth = getAuth();
const db = getFirestore();

const image = document.getElementById('img-user');
const image_patente = document.getElementById('img-patente');

var xp_inicial = 0;
var xp_final = 0;

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('nome').innerText = userData.nome;
                    document.getElementById('local-escala').innerText = userData.setor;
                    document.getElementById('l-pontuacao').innerText = userData.pontos;

                    // Obter pontuações mensais
                    const chartData = [
                        userData.JANEIRO,
                        userData.FEVEREIRO,
                        userData.MARCO,
                        userData.ABRIL,
                        userData.MAIO,
                        userData.JUNHO,
                        userData.JULHO,
                        userData.AGOSTO,
                        userData.SETEMBRO,
                        userData.OUTUBRO,
                        userData.NOVEMBRO,
                        userData.DEZEMBRO
                    ];

                    // Atualizar o gráfico com os dados carregados
                    updateChart(chartData);

                    // Obtendo XP
                    const xp = userData.xp;

                    let nome_patente = "";

                    // controle de patentes
                    if (xp >= 45 && xp <= 74) {
                        nome_patente = "RECRUTA ATARI";
                        xp_inicial = 45
                        xp_final = 74

                    } else if (xp >= 75 && xp <= 104) {
                        nome_patente = "SOLDADO ODYSSEY";
                        xp_inicial = 75
                        xp_final = 104

                    } else if (xp >= 105 && xp <= 144) {
                        nome_patente = "CABO ARCADIA";
                        xp_inicial = 105
                        xp_final = 144

                    } else if (xp >= 145 && xp <= 184) {
                        nome_patente = "3º SARGENTO NES";
                        xp_inicial = 145
                        xp_final = 184

                    } else if (xp >= 185 && xp <= 234) {
                        nome_patente = "2º SARGENTO";
                        xp_inicial = 185
                        xp_final = 234

                    } else if (xp >= 235 && xp <= 294) {
                        nome_patente = "1º SARGENTO DYNAVISION";
                        xp_inicial = 235
                        xp_final = 294

                    } else if (xp >= 295 && xp <= 399) {
                        nome_patente = "SUBOFICIAL BOY";
                        xp_inicial = 295
                        xp_final = 399

                    } else if (xp >= 400 && xp <= 519) {
                        nome_patente = "ASPIRANTE MEGA";
                        xp_inicial = 400
                        xp_final = 519

                    } else if (xp >= 520 && xp <= 654) {
                        nome_patente = "2º TENENTE TURBO";
                        xp_inicial = 520
                        xp_final = 654

                    } else if (xp >= 655 && xp <= 804) {
                        nome_patente = "1º TENENTE NEO";
                        xp_inicial = 655
                        xp_final = 804

                    } else if (xp >= 805 && xp <= 969) {
                        nome_patente = "CAPITÃO SUPER";
                        xp_inicial = 805
                        xp_final = 969

                    } else if (xp >= 970 && xp <= 1149) {
                        nome_patente = "MAJOR COMMODORE";
                        xp_inicial = 970
                        xp_final = 1149

                    } else if (xp >= 1150 && xp <= 1344) {
                        nome_patente = "TENENTE CORONEL SATURN";
                        xp_inicial = 1150
                        xp_final = 1344

                    } else if (xp >= 1345 && xp <= 1554) {
                        nome_patente = "CORONEL PLAY";
                        xp_inicial = 1345
                        xp_final = 1554

                    } else if (xp >= 1555 && xp <= 1779) {
                        nome_patente = "BRIGADEIRO 64";
                        xp_inicial = 1555
                        xp_final = 1779

                    } else if (xp >= 1780 && xp <= 2019) {
                        nome_patente = "MAJOR BRIGADEIRO ADVANCE";
                        xp_inicial = 1780
                        xp_final = 2019

                    } else if (xp >= 2020 && xp <= 2274) {
                        nome_patente = "TENENTE BRIGADEIRO BOX";
                        xp_inicial = 2020
                        xp_final = 2274

                    } else if (xp >= 2275 && xp <= 2544) {
                        nome_patente = "MARECHAL 360";
                        xp_inicial = 2275
                        xp_final = 2544

                    } else if (xp >= 2545 && xp <= 2829) {
                        nome_patente = "ALMIRANTE ONE";
                        xp_inicial = 2545
                        xp_final = 2829

                    } else if (xp >= 2830 && xp <= 3129) {
                        nome_patente = "MESTRE SWITCH";
                        xp_inicial = 2830
                        xp_final = 3129

                    } else if (xp >= 3130) {
                        nome_patente = "RAMBO PS5";
                        xp_inicial = 3130
                    }
                    document.getElementById('patente').innerText = nome_patente;

                    // Atribuir XP à barra de progresso
                    let progressBar = document.getElementById('progress_bar');
                    let progressText = document.getElementById('progress_text');
                    let progressPercent = ((xp - xp_inicial) / (xp_final - xp_inicial)) * 100;
                    progressBar.style.width = progressPercent + '%';
                    progressText.innerText = Math.round(progressPercent) + '%';

                    // FOTO USER
                    image.src = `https://github.com/LuckasDuarte/KPI_ONLINE/blob/main/FOTOS_COLABORADORES/${userData.nome}.jpg?raw=true`;

                    // FOTO PATENTE
                    image_patente.src = `https://raw.githubusercontent.com/LuckasDuarte/KPI_ONLINE/main/PATENTES/${nome_patente}.bmp`;

                } else {
                    console.log("ID DE USUÁRIO NÃO CONSTA");
                }
            })
            .catch((error) => {
                console.log("ERRO AO OBTER DOCUMENTO", error);
            });
    } else {
        console.log("ID NÃO ENCONTRADO NO LOCAL STORAGE");
    }
});

const updateChart = (data) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Pontuação',
                data: data,
                backgroundColor: 'rgba(0, 48, 96, 1)',
                borderColor: 'rgba(0, 48, 96, 1)',
                borderWidth: 1,
                tension: 0.1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};
