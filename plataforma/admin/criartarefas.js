// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBKa-Bs_f_Jg80zzeRlMLzrTH_0oWP3Jdo",
    authDomain: "connectwork-c13b2.firebaseapp.com",
    projectId: "connectwork-c13b2",
    storageBucket: "connectwork-c13b2.appspot.com",
    messagingSenderId: "407759011685",
    appId: "1:407759011685:web:625201a9a6e0b35aba6b8c",
    measurementId: "G-TC7VG0QJVX"
};

firebase.initializeApp(firebaseConfig);;

// Referência ao banco de dados Firestore

const db = firebase.firestore();

//USUARIOS

db.collection(localStorage.getItem("empresa") + 'usuarios').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var select = document.getElementById("usuarios");

        var option = document.createElement("option");
        option.value = doc.data().nome
        option.text = doc.data().nome

        select.append(option);
    });
});

//grupos

db.collection(localStorage.getItem("empresa") + 'grupos').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var select = document.getElementById("grupos");

        var option = document.createElement("option");
        option.value = doc.data().nome
        option.text = doc.data().nome

        select.append(option);
    });
});


const formTarefa = document.getElementById('formTarefa');
formTarefa.addEventListener('submit', (event) => {
    event.preventDefault(); // previne o envio padrão do formulário


    //PUXAR USUARIOS
    function obterHorarioAtual() {
        var horarioAtual = new Date();
        var options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        var horarioFormatado = horarioAtual.toLocaleString("pt-BR", options);
        return horarioFormatado;
    }

    // Exemplo de uso da função
    var horarioAtual = obterHorarioAtual();



    //GRAVAR TAREFA
    db.collection(localStorage.getItem("empresa") + 'tarefas').add({
            nome: document.querySelector('#nome').value,
            descricao: document.querySelector('#descricao').value,
            dataEntrega: document.querySelector('#dataEntrega').value,
            email: document.querySelector("#inputusuarios").value,
            por: localStorage.getItem("nome"),
            status: "pendente",
            criadoem: horarioAtual,
            grupo: document.querySelector("#inputgrupos").value,
            alteracao: ''

        })
        .then((docRef) => {
            Swal.fire(
                'Bom Trabalho!',
                'Tarefa Gravada',
                'success'
            )

        })
        .catch((error) => {
            console.error("ERRO GRAVAR TAREFA NO USUARIO ", error);
        });


});