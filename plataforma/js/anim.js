
const elementosBox = document.querySelectorAll('.box');

elementosBox.forEach((elemento, index) => {
    elemento.style.opacity = '0';
    setTimeout(() => {
        elemento.style.opacity = '1';
    }, index * 1500); // Atraso progressivamente maior para cada elemento

});

const elementosBoxt = document.querySelectorAll('td');

elementosBoxt.forEach((elemento, index) => {
    elemento.style.opacity = '0';
    setTimeout(() => {
        elemento.style.opacity = '1';
    }, index * 1500); // Atraso progressivamente maior para cada elemento

});

const progressElement = document.getElementById('myProgress');
const duration = 2000; // 5 segundos
const increment = 100 / (duration / 1000); // Incremento a cada segundo

let currentValue = 0;

const interval = setInterval(() => {
    currentValue += increment;
    progressElement.value = currentValue;

    if (currentValue >= 100) {
        setTimeout(() => {
            document.querySelector("#mostrartarefas").style.opacity = '1'
        }, 250);
        clearInterval(interval);
        setTimeout(() => {
            document.getElementById('myProgress').style.display = 'none'
        }, 300);
    }
}, 1000);