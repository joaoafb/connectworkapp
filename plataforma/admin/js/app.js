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
    document.querySelector("#quantidadeusuarios").innerHTML = usuarioscount

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
    document.querySelector("#quantidadegrupos").innerHTML = folderCount
    if (folderCount == 0) {
        document.querySelector("#mostrargrupos").innerHTML = '<a href="./cadgrupo.html" style=" text-decoration: none;" class="cta-btn">Crie seu Grupo Agora!</a>'
    }

}).catch((error) => {
    console.error('Erro ao obter as pastas:', error);
});
//FIM


//todas as tarefas
db.collection(localStorage.getItem("empresa") + 'tarefas').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const documentCount = querySnapshot.size;
        localStorage.setItem("todastarefas", documentCount)
        document.querySelector("#quantidadetarefas").innerHTML = documentCount

    });
});


//tarefas realizadas
firebase.firestore().collection(localStorage.getItem("empresa") + 'tarefas')
    .where('status', '==', 'realizada')
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
    .get()
    .then((querySnapshot) => {
        const documentCount = querySnapshot.size;
        localStorage.setItem("pendente", documentCount)
        document.querySelector("#pendente").innerHTML = 'Pendentes: ' + documentCount
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



const tableHeader5 = document.createElement('th');
tableHeader5.innerText = 'Ação';

tableRow.appendChild(tableHeader1);
tableRow.appendChild(tableHeader2);
tableRow.appendChild(tableHeader3);

tableRow.appendChild(tableHeader5);

// Adicione a linha à tabela existente
const tablegp = document.querySelector('#mostrargrupos'); // Selecione a tabela adequada
tablegp.appendChild(tableRow);


//mostrar tarefas
var tarefasc = Number(localStorage.getItem("pendente")) + Number(localStorage.getItem("realizada"))
if (tarefasc != 0) {
    console.log('o')
} else {
    document.querySelector("#mostrartarefas").innerHTML = '<a href="./criartarefas.html" style=" text-decoration: none;" class="cta-btn">Crie Uma Tarefa Agora!</a>'


}


db.collection(localStorage.getItem("empresa") + 'tarefas').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        const tr = document.createElement('tr');
        const data = doc.data()

        const td1 = document.createElement('td');
        if (data.email > '') {

            td1.innerText = data.email
        } else {

            td1.innerText = data.grupo
        }
        // Verificar se existe alguém com o nome 'João' na pasta 'empresa'
        db.collection(localStorage.getItem("empresa") + 'usuarios').where('nome', '==', data.email).get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    // Se existir pelo menos um documento com o nome 'João', salvar o ID da pasta no LocalStorage
                    const pasta = querySnapshot.docs[0];
                    const pastaId = pasta.id;


                    // Salvar o ID da pasta no LocalStorage
                    localStorage.setItem('idusuario', pastaId);
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        localStorage.setItem("pontos", doc.data().pontos)

                    });

                } else {
                    console.log('Nenhum documento encontrado com o nome "João" na pasta "empresa".');
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar documentos:', error);
            });

        const td2 = document.createElement('td');
        td2.innerText = data.descricao

        const td3 = document.createElement('td');
        td3.innerText = data.nome

        const td4 = document.createElement('td');
        td4.innerText = data.status

        const button = document.createElement('button');
        button.innerText = 'Realizada';
        button.className = 'btnrealizada'
        if (data.status == 'realizada') {
            button.disabled
            button.style.opacity = '0'
        }
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
                inputAttributes: { placeholder: 'Digite alguma observação' },
                showCancelButton: true,
                confirmButtonText: 'Sim!',
                cancelButtonText: 'Não!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    db.collection(localStorage.getItem("empresa") + 'tarefas').doc(doc.id).update({
                        status: 'realizada',
                        alteracao: localStorage.getItem("nome")
                    })

                    .then(() => {
                            //add pontos



                            var numeroSalvo = localStorage.getItem("pontos"); // Número já salvo
                            var numeroEscolhido = 10; // Número escolhido
                            const resultado = Number(numeroSalvo) + Number(numeroEscolhido)
                            db.collection(localStorage.getItem("empresa") + 'usuarios').doc(localStorage.getItem("idusuario")).update({
                                pontos: resultado
                            }).then(function() {
                                console.log("Pontos Atualizados");
                            }).catch(function(error) {
                                console.error("Erro ao atualizar o documento: ", error);
                            });



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
                inputAttributes: { placeholder: 'Digite alguma observação' },
                showCancelButton: true,
                confirmButtonText: 'Sim!',
                cancelButtonText: 'Não!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    db.collection(localStorage.getItem("empresa") + 'tarefas').doc(doc.id).update({
                            status: 'pendente',
                            alteracao: localStorage.getItem("nome")
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

        const button3 = document.createElement('button');
        button3.innerText = 'Excluir';
        button3.className = 'btnexluir'
        button3.onclick = function() {

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Deseja Excluir a Tarefa?',
                text: "Essa ação e inrreversivel!",
                icon: 'warning',
                input: 'text',
                inputAttributes: { placeholder: 'Digite alguma observação' },
                showCancelButton: true,
                confirmButtonText: 'Sim, quero excluir',
                cancelButtonText: 'Não quero excluir!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    db.collection(localStorage.getItem('empresa') + 'tarefas').doc(doc.id).delete().then(() => {
                        swalWithBootstrapButtons.fire(
                            'Tarefa Excluida',
                            '',
                            'success'
                        )
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
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
        tr.appendChild(button3)
            // Adicione a linha à tabela existente
        const table = document.querySelector('table'); // Selecione a tabela adequada
        table.appendChild(tr);

    });
});






const truser = document.createElement('tr');

const th1user = document.createElement('th');
th1user.innerText = 'Usuario';

const th5user = document.createElement('th');
th5user.innerText = 'Email';
const th2user = document.createElement('th');
th2user.innerText = 'Cargo';

const th3user = document.createElement('th');
th3user.innerText = 'Entrou em:';

const th4user = document.createElement('th');
th4user.innerText = 'Ação';
const th6 = document.createElement('th');
th6.innerText = 'Nome';
truser.appendChild(th6);
truser.appendChild(th1user);
truser.appendChild(th5user);
truser.appendChild(th2user);
truser.appendChild(th3user);
truser.appendChild(th4user);

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
        td2.innerText = data.email

        const td3 = document.createElement('td');
        td3.innerText = data.cargo

        const td4 = document.createElement('td');
        td4.innerText = data.data

        const button = document.createElement('button');
        button.innerText = 'Excluir';
        button.className = 'btnexluir'
        button.onclick = function() {

            Swal.fire({
                title: 'Tem Certeza?',
                text: "Essa ação é irreversivel!",
                icon: 'warning',
                input: 'text',
                inputAttributes: { placeholder: 'Digite alguma observação' },
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, quero excluir!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const timestamp = firebase.firestore.Timestamp.now();

                    function formatarHorario(timestamp) {
                        const date = timestamp.toDate();
                        const horas = date.getHours().toString().padStart(2, '0');
                        const minutos = date.getMinutes().toString().padStart(2, '0');
                        const segundos = date.getSeconds().toString().padStart(2, '0');
                        return `${horas}:${minutos}:${segundos}`;
                    }

                    const horarioFormatado = formatarHorario(timestamp);

                    const colecaoRef = db.collection(localStorage.getItem("empresa") + 'usuarios');
                    // Add a new document with a generated id.
                    db.collection('usuariosexcluidos').add({
                            nome: data.nome,
                            responsavel: localStorage.getItem("nome"),
                            data: horarioFormatado,
                            empresa: localStorage.getItem("empresa"),
                            email: data.email
                        })
                        .then((docRef) => {

                        })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });

                    colecaoRef.where('nome', '==', data.nome).get()
                        .then((querySnapshot) => {
                            const exclusoes = [];
                            querySnapshot.forEach((doc) => {
                                exclusoes.push(doc.ref.delete());
                            });
                            return Promise.all(exclusoes);
                        })
                        .then(() => {

                            location.reload()
                        })
                        .catch((error) => {
                            console.error('Erro ao excluir documentos:', error);
                        });

                    Swal.fire(
                        'Usuario Excluido!',
                        'Todos os seus dados foram removidos de nosso servidor!',
                        'success'
                    )
                }
            })

        }


        tr.appendChild(td1);
        tr.appendChild(td5);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(button)

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




        const button = document.createElement('button');
        button.innerText = 'Excluir';
        button.className = 'btnexluir';
        button.onclick = function() {
            Swal.fire({
                title: 'Tem Certeza?',
                text: "Essa ação é irreversível!",
                icon: 'warning',
                input: 'text',
                inputAttributes: { placeholder: 'Digite alguma observação' },
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, quero excluir!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const timestamp = firebase.firestore.Timestamp.now();

                    function formatTime(timestamp) {
                        const date = timestamp.toDate();
                        const hours = date.getHours().toString().padStart(2, '0');
                        const minutes = date.getMinutes().toString().padStart(2, '0');
                        const seconds = date.getSeconds().toString().padStart(2, '0');
                        return `${hours}:${minutes}:${seconds}`;
                    }

                    const formattedTime = formatTime(timestamp);

                    const collectionRef = db.collection(localStorage.getItem("empresa") + 'grupos');



                    collectionRef.where('nome', '==', userData.nome).get()
                        .then((querySnapshot) => {
                            const deletions = [];
                            querySnapshot.forEach((doc) => {
                                deletions.push(doc.ref.delete());
                            });
                            return Promise.all(deletions);
                        })
                        .then(() => {
                            location.reload();
                        })
                        .catch((error) => {
                            console.error('Erro ao excluir documentos:', error);
                        });

                    Swal.fire(
                        'Usuário Excluído!',
                        'Todos os seus dados foram removidos do nosso servidor!',
                        'success'
                    );
                }
            });
        };

        tableRow.appendChild(td1);
        tableRow.appendChild(td5);
        tableRow.appendChild(td2);
        tableRow.appendChild(td3);

        tableRow.appendChild(button);

        // Adicione a linha à tabela existente
        const table = document.querySelector('#mostrargrupos'); // Selecione a tabela adequada
        table.appendChild(tableRow);
    });
});


function criaralerta() {
    db.collection(localStorage.getItem("empresa") + "usuarios").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const optionElement = document.createElement('option');

            // Define o valor e o texto da option
            optionElement.value = doc.data().nome
            optionElement.text = doc.data().nome

            // Adiciona a option ao select
            document.querySelector("#usuarios").appendChild(optionElement);
        });
    });

    function exibirModal() {
        Swal.fire({
            title: 'Deseja enviar um alerta?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim, agora!',
            cancelButtonText: 'Não',
            reverseButtons: true,
            focusCancel: true,
            preConfirm: () => {
                exibirFormulario();
            }
        });
    }

    function exibirFormulario() {
        Swal.fire({
            title: 'Enviar mensagem',
            html: '<input id="titulo" class="swal2-input" placeholder="Título">' +
                '<input list="usuarios" id="grupo" class="swal2-input" placeholder="Usuario">' +
                '<textarea id="mensagem" class="swal2-textarea" placeholder="Mensagem"></textarea>',
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            focusConfirm: false,
            preConfirm: () => {
                const titulo = Swal.getPopup().querySelector('#titulo').value;
                const grupo = Swal.getPopup().querySelector('#grupo').value;
                const mensagem = Swal.getPopup().querySelector('#mensagem').value;

                if (titulo.trim() === '' || mensagem.trim() === '') {
                    Swal.showValidationMessage('Preencha todos os campos');
                    return false;
                }

                // Aqui você pode enviar os dados para o Firebase
                // Exemplo de envio para o console:
                // Add a new document in collection "cities"
                db.collection(localStorage.getItem('empresa') + 'alertas').add({
                        por: localStorage.getItem("nome"),
                        para: grupo,
                        mensagem: mensagem,
                        titulo: titulo
                    })
                    .then(() => {
                        Swal.fire({

                            icon: 'success',
                            title: 'Alerta Criado',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
                console.log('Título:', titulo);
                console.log('Grupo:', grupo);
                console.log('Mensagem:', mensagem);
            }
        });
    }

    // Exemplo de chamada da função
    exibirModal();

}





function gp() {
    db.collection(localStorage.getItem("empresa") + "grupos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const optionElement = document.createElement('option');

            // Define o valor e o texto da option
            optionElement.value = doc.data().nome
            optionElement.text = doc.data().nome

            // Adiciona a option ao select
            document.querySelector("#grupos").appendChild(optionElement);
        });
    });

    function exibirModal() {
        Swal.fire({
            title: 'Deseja enviar um alerta?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim, agora!',
            cancelButtonText: 'Não',
            reverseButtons: true,
            focusCancel: true,
            preConfirm: () => {
                exibirFormulariogp();
            }
        });
    }

    function exibirFormulariogp() {
        Swal.fire({
            title: 'Enviar mensagem',
            html: '<input id="titulo" class="swal2-input" placeholder="Título">' +
                '<input id="grupo" list="grupos" class="swal2-input" placeholder="Grupo">' +
                '<textarea id="mensagem" class="swal2-textarea" placeholder="Mensagem"></textarea>',
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            focusConfirm: false,
            preConfirm: () => {
                const titulo = Swal.getPopup().querySelector('#titulo').value;
                const grupo = Swal.getPopup().querySelector('#grupo').value;
                const mensagem = Swal.getPopup().querySelector('#mensagem').value;

                if (titulo.trim() === '' || mensagem.trim() === '') {
                    Swal.showValidationMessage('Preencha todos os campos');
                    return false;
                }

                // Aqui você pode enviar os dados para o Firebase
                // Exemplo de envio para o console:
                // Add a new document in collection "cities"
                db.collection(localStorage.getItem('empresa') + 'alertas').add({
                        por: localStorage.getItem("nome"),
                        para: grupo,
                        grupo: grupo,
                        mensagem: mensagem,
                        titulo: titulo
                    })
                    .then(() => {
                        Swal.fire({

                            icon: 'success',
                            title: 'Alerta Criado',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
                console.log('Título:', titulo);
                console.log('Grupo:', grupo);
                console.log('Mensagem:', mensagem);
            }
        });
    }

    // Exemplo de chamada da função
    exibirModal();

}