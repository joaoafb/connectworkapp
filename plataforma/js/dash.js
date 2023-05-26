// AUTH FIREBASE

const firebaseConfig = {
    apiKey: "AIzaSyBKa-Bs_f_Jg80zzeRlMLzrTH_0oWP3Jdo",
    authDomain: "connectwork-c13b2.firebaseapp.com",
    projectId: "connectwork-c13b2",
    storageBucket: "connectwork-c13b2.appspot.com",
    messagingSenderId: "407759011685",
    appId: "1:407759011685:web:625201a9a6e0b35aba6b8c",
    measurementId: "G-TC7VG0QJVX"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// FIM AUTH FIREBASE
document.querySelector(".user-name").innerHTML = 'ConnectWork | ' + localStorage.getItem("nome") + ' | ' + localStorage.getItem(("empresa"))




//Contar quantidade de usuarios



const usuarios = firebase.firestore().collection(localStorage.getItem("empresa") + 'usuarios');

// Obtenha a quantidade de pastas
usuarios.get().then((querySnapshot) => {
    const usuarioscount = querySnapshot.size;

    if (usuarioscount == 2) { document.querySelector("#quantidadeusuarios").innerHTML = usuarioscount - Number(1) + ' AmigGrupo' } else { document.querySelector("#quantidadeusuarios").innerHTML = usuarioscount - Number(1) + ' Amigos' }


}).catch((error) => {
    console.error('Erro ao obter as pastas:', error);
});
//FIM

//Contar quantidade de tarefas



//Contar quantidade de grupos



const foldersRef = firebase.firestore().collection(localStorage.getItem("empresa") + 'grupos');

// Obtenha a quantidade de pastas
foldersRef.get().then((querySnapshot) => {
    const folderCount = querySnapshot.size;
    if (folderCount == 1) { document.querySelector("#quantidadegrupos").innerHTML = folderCount + ' Grupo' } else { document.querySelector("#quantidadegrupos").innerHTML = folderCount + ' Grupos' }

}).catch((error) => {
    console.error('Erro ao obter as pastas:', error);
});
//FIM


//todas as tarefas
firebase.firestore().collection(localStorage.getItem("empresa") + 'tarefas')
    .where('status', '==', 'realizada')
    .where('email', '==', localStorage.getItem("nome"))
    .get()
    .then((querySnapshot) => {
        const documentCount = querySnapshot.size;
        localStorage.setItem("todastarefas", documentCount)

    });



//tarefas realizadas
firebase.firestore().collection(localStorage.getItem("empresa") + 'tarefas')
    .where('status', '==', 'realizada')
    .where('email', '==', localStorage.getItem("nome"))
    .get()
    .then((querySnapshot) => {
        const documentCount = querySnapshot.size;
        localStorage.setItem("realizada", documentCount)
        document.querySelector("#realizada").innerHTML = 'Realizadas: ' + documentCount
    })
    .catch((error) => {
        console.error('Erro ao obter os documentos:', error);
    });

//tarefas pendens
firebase.firestore().collection(localStorage.getItem("empresa") + 'tarefas')
    .where('status', '==', 'pendente')
    .where('email', '==', localStorage.getItem("nome"))
    .get()
    .then((querySnapshot) => {

        const documentCount = querySnapshot.size;
        localStorage.setItem("pendente", documentCount)
        document.querySelector("#pendente").innerHTML = 'Pendentes: ' + documentCount
    })
    .catch((error) => {
        console.error('Erro ao obter os documentos:', error);
    });

//tarefas analise
firebase.firestore().collection(localStorage.getItem("empresa") + 'tarefas')
    .where('status', '==', 'Análise')
    .where('email', '==', localStorage.getItem("nome"))
    .get()
    .then((querySnapshot) => {

        const documentCount = querySnapshot.size;
        localStorage.setItem("analise", documentCount)
        document.querySelector("#analise").innerHTML = 'Análise: ' + documentCount
    })
    .catch((error) => {
        console.error('Erro ao obter os documentos:', error);
    });






const tr = document.createElement('tr');

const th1 = document.createElement('th');
th1.innerText = 'Grupo/Usuário';

const th2 = document.createElement('th');
th2.innerText = 'Tarefa';

const th3 = document.createElement('th');
th3.innerText = 'Descrição';

const th4 = document.createElement('th');
th4.innerText = 'Situação';

const th5 = document.createElement('th');
th5.innerText = 'Ação';


tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);
tr.appendChild(th5);


// Adicione a linha à tabela existente
const table = document.querySelector('#mostrartarefas'); // Selecione a tabela adequada
table.appendChild(tr);
const tableRow = document.createElement('tr');

const tableHeader1 = document.createElement('th');
tableHeader1.innerText = 'Grupo';

const tableHeader2 = document.createElement('th');
tableHeader2.innerText = 'Criado Por:';

const tableHeader3 = document.createElement('th');
tableHeader3.innerText = 'Empresa';






tableRow.appendChild(tableHeader1);
tableRow.appendChild(tableHeader2);
tableRow.appendChild(tableHeader3);



// Adicione a linha à tabela existente
const tablegp = document.querySelector('#mostrargrupos'); // Selecione a tabela adequada
tablegp.appendChild(tableRow);


//mostrar tarefas


db.collection(localStorage.getItem("empresa") + 'tarefas').where("email", "==", localStorage.getItem("nome"))
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            const tr = document.createElement('tr');
            const data = doc.data()

            const td1 = document.createElement('td');
            td1.innerText = data.email


            const td2 = document.createElement('td');
            td2.innerText = data.descricao

            const td3 = document.createElement('td');
            td3.innerText = data.nome

            const td4 = document.createElement('td');
            td4.innerText = data.status

            const button = document.createElement('button');
            button.innerText = 'Já Realizei';
            button.className = 'btnrealizada'

            //BTN REALIARF
            button.onclick = function() {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: 'Deseja Alterar o Status Para Pendente?',
                    text: "Essa ação e inrreversivel!",
                    icon: 'warning',
                    input: 'text',
                    inputAttributes: {
                        class: 'inputobs',
                        placeholder: 'Digite alguma observação'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Sim!',
                    cancelButtonText: 'Não!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        db.collection(localStorage.getItem("empresa") + 'tarefas').doc(doc.id).update({
                                status: 'Análise',
                                alteracao: localStorage.getItem("nome"),
                                obs: document.querySelector(".inputobs").value

                            })
                            .then(() => {
                                //add pontos
                                if (data.nome > '') {
                                    var documentoRef = db.collection(localStorage.getItem("empresa") + 'usuarios').doc(data.nome);
                                } else {
                                    var documentoRef = db.collection(localStorage.getItem("empresa") + 'usuarios').doc(data.grupo);
                                }

                                // Realiza a leitura do documento
                                documentoRef.get().then(function(doc) {
                                    if (doc.exists) {
                                        var numeroSalvo = doc.data().pontos; // Número já salvo
                                        var numeroEscolhido = 10; // Número escolhido

                                        var novoNumero = numeroSalvo + numeroEscolhido;

                                        // Atualiza o documento com o novo número
                                        documentoRef.update({
                                            pontos: novoNumero
                                        }).then(function() {
                                            console.log("Pontos Atualizados");
                                        }).catch(function(error) {
                                            console.error("Erro ao atualizar o documento: ", error);
                                        });
                                    } else {
                                        console.log("Documento não encontrado!");
                                    }
                                }).catch(function(error) {
                                    console.error("Erro ao ler o documento: ", error);
                                });

                                //fim pontos
                                Swal.fire(
                                    'Bom Trabalho',
                                    'Situação de Atividade Alterada',
                                    'success'
                                )
                            })
                            .catch((error) => {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });

                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Cancelado',
                            '',
                            'error'
                        )
                    }
                })
            }

            const button2 = document.createElement('button');
            button2.innerText = 'Pendente';
            button2.className = 'btnpendente'

            button2.onclick = function() {

                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: 'Deseja Alterar o Status Para Pendente?',
                    text: "Essa ação e inrreversivel!",
                    icon: 'warning',
                    input: 'text',
                    inputAttributes: {
                        class: 'inputobs',
                        placeholder: 'Digite alguma observação'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Sim!',
                    cancelButtonText: 'Não!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        db.collection(localStorage.getItem("empresa") + 'tarefas').doc(doc.id).update({
                                status: 'pendente',
                                alteracao: localStorage.getItem("nome"),
                                obs: document.querySelector(".inputobs").value


                            })
                            .then(() => {
                                Swal.fire(
                                    'Bom Trabalho',
                                    'Situação de Atividade Alterada',
                                    'success'
                                )
                            })
                            .catch((error) => {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });

                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Cancelado',
                            '',
                            'error'
                        )
                    }
                })

            }






            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tr.appendChild(button)
            tr.appendChild(button2)

            // Adicione a linha à tabela existente
            const table = document.querySelector('table'); // Selecione a tabela adequada
            table.appendChild(tr);

        });
    });






const truser = document.createElement('tr');

const th1user = document.createElement('th');
th1user.innerText = 'Usuario';

const th5user = document.createElement('th');
th5user.innerText = 'Recado';
const th2user = document.createElement('th');
th2user.innerText = 'Cargo';


const th6 = document.createElement('th');
th6.innerText = 'Nome';
truser.appendChild(th6);
truser.appendChild(th1user);
truser.appendChild(th5user);
truser.appendChild(th2user);


// Adicione a linha à tabela existente
const tableuser = document.querySelector('#mostrarusuarios'); // Selecione a tabela adequada
tableuser.appendChild(truser);

//mostrar usuarios



db.collection(localStorage.getItem("empresa") + 'usuarios').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        const tr = document.createElement('tr');
        const data = doc.data()


        const td1 = document.createElement('td');
        td1.innerText = data.nome
        const td5 = document.createElement('td');
        td5.innerText = data.usuario

        const td2 = document.createElement('td');
        td2.innerText = data.descricao
        const td3 = document.createElement('td');
        td3.innerText = data.cargo





        tr.appendChild(td1);
        tr.appendChild(td5);
        tr.appendChild(td2);
        tr.appendChild(td3);



        // Adicione a linha à tabela existente
        const table = document.querySelector('#mostrarusuarios'); // Selecione a tabela adequada
        table.appendChild(tr);

    });
});



//mostrar grupos
db.collection(localStorage.getItem("empresa") + 'grupos').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        const tableRow = document.createElement('tr');
        const userData = doc.data();

        const td1 = document.createElement('td');
        td1.innerText = userData.nome;

        const td5 = document.createElement('td');
        td5.innerText = userData.criadopor

        const td2 = document.createElement('td');
        td2.innerText = userData.empresa

        const td3 = document.createElement('td');






        tableRow.appendChild(td1);
        tableRow.appendChild(td5);
        tableRow.appendChild(td2);
        tableRow.appendChild(td3);



        // Adicione a linha à tabela existente
        const table = document.querySelector('#mostrargrupos'); // Selecione a tabela adequada
        table.appendChild(tableRow);
    });
});



function criarEixos(canvas, margem) {
    var c = document.getElementById(canvas);
    var ctx = c.getContext("2d");
    var rightX = c.width - margem;
    // y
    ctx.moveTo(margem, margem);
    ctx.lineTo(margem, rightX);
    // setas do y
    ctx.moveTo(margem, margem);
    ctx.lineTo(margem + 5, margem + 5);
    ctx.moveTo(margem, margem);
    ctx.lineTo(margem - 5, margem + 5);
    // x
    ctx.moveTo(margem, rightX);
    ctx.lineTo(rightX, rightX);
    // setas x
    ctx.moveTo(rightX, rightX);
    ctx.lineTo(rightX - 5, rightX + 5);
    ctx.moveTo(rightX, rightX);
    ctx.lineTo(rightX - 5, rightX - 5);
    // Define style and stroke lines.
    ctx.strokeStyle = "#000";

    ctx.stroke();
}

function criarBarra(canvas, xPos, yPos, largura, altura, cor) {
    var c = document.getElementById(canvas);
    var ctx = c.getContext("2d");
    ctx.fillStyle = cor;
    ctx.fillRect(xPos, yPos, largura, altura);
}

function criarGrafico(canvas, margem, barras, cor) {
    var largura = document.getElementById(canvas).width;
    var altura = document.getElementById(canvas).height - (margem * 2) - 5;
    var qtd = barras.length;
    var barra = (largura / (qtd * 1.5)) - 5;
    var entre = (largura - (barra * qtd)) / (qtd + 3);
    var total = 0;

    for (i = 0; i < qtd; i++) {
        if (total < barras[i]) {
            total = barras[i];
        }
    }

    for (i = 0; i < qtd; i++) {
        criarBarra(canvas, ((barra + entre) * i) + (margem + entre), largura - margem - altura * (barras[i] / total), barra, altura * (barras[i] / total), cor);
    }

    criarEixos(canvas, margem);
}

var dados = new Array(localStorage.getItem("realizada"), localStorage.getItem("pendente"), localStorage.getItem("analise"));
criarGrafico("grafico", 10, dados, "#7C5CFC");