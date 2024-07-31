// chart.js
import { chartData } from './home.js';

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Pontuação',
                data: chartData,
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
});
