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


//PROCURAR TAREFAS




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
                        classe: 'inputobs',
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
                        classe: 'inputobs',
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