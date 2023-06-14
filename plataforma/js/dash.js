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
document.querySelector(".profile-name").innerHTML = localStorage.getItem("nome")
document.querySelector(".profile-message").innerHTML = localStorage.getItem("empresa")

db.collection(localStorage.getItem("empresa") + 'alertas').where("para", "==", localStorage.getItem("nome"))
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            Swal.fire({

                icon: 'info',
                title: '<strong>' + doc.data().titulo + ': </strong> ' + doc.data().mensagem,
                showConfirmButton: false,
                timer: 10000
            })
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

//Contar quantidade de usuarios



const usuarios = firebase.firestore().collection(localStorage.getItem("empresa") + 'usuarios');

// Obtenha a quantidade de pastas
usuarios.get().then((querySnapshot) => {
    const usuarioscount = querySnapshot.size;

    if (usuarioscount == 2) { document.querySelector("#quantidadeusuarios").innerHTML = usuarioscount - Number(1) + ' AmigGrupo' } else { document.querySelector("#quantidadeusuarios").innerHTML = usuarioscount - Number(1) + ' Amigos <i class="fas fa-user-friends"></i>' }


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
    if (folderCount == 1) { document.querySelector("#quantidadegrupos").innerHTML = folderCount + ' Grupo' } else { document.querySelector("#quantidadegrupos").innerHTML = folderCount + ' Grupos <i class="fas fa-users"></i>' }

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
        document.querySelector("#realizada").innerHTML = '<i class="fas fa-check"></i> ' + documentCount
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
        document.querySelector("#pendente").innerHTML = '<i class="fas fa-clock"></i> ' + documentCount
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
        document.querySelector("#analise").innerHTML = '<i class="fas fa-eye"></i>' + documentCount
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
            if (data.status == 'realizada') {
                tr.style.display = 'none'
            }


            const td4 = document.createElement('td');
            td4.innerText = data.status

            const button = document.createElement('button');
            button.innerHTML = '<i class="fas fa-check icon"></i>';
            button.className = 'btnrealizada waves-effect waves-light'

            if (data.status == 'Análise') {
                button.style.display = 'none'

            }

            //BTN REALIARF
            button.onclick = function() {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger text-gray-800'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: 'Deseja Alterar o Status Para Pendente?',
                    text: "",
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


                                //fim pontos
                                Swal.fire(
                                    'Bom Trabalho',
                                    'Situação de Atividade Alterada',
                                    'success'
                                )
                                setTimeout(() => {
                                    location.reload()
                                }, 500);
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
            button2.innerHTML = '<i class="far fa-clock"></i>'
            button2.className = 'btnpendente waves-effect waves-light'

            button2.onclick = function() {

                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger text-gray-800'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: 'Deseja Alterar o Status Para Pendente?',
                    text: "",
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
                                setTimeout(() => {
                                    location.reload()
                                }, 1000);
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






//mostrar usuarios



db.collection(localStorage.getItem("empresa") + 'usuarios').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

      
        const data = doc.data()


      

// Criação do elemento div com a classe "profile-card"
const profileCard = document.createElement('div');
profileCard.className = 'profile-card';

// Criação do elemento div com a classe "profile-image"
const profileImage = document.createElement('div');
profileImage.className = 'profile-image';

// Criação do elemento img com o atributo src e alt definidos
const image = document.createElement('img');
image.src = data.img
image.alt = 'Foto de Perfil';

// Adiciona a imagem ao elemento "profile-image"
profileImage.appendChild(image);

// Criação do elemento div com a classe "profile-info"
const profileInfo = document.createElement('div');
profileInfo.className = 'profile-info';

// Criação do elemento h3 com a classe "profile-name"
const name = document.createElement('h3');
name.className = 'profile-name';
name.textContent = data.nome

// Criação do elemento p com a classe "profile-message"
const message = document.createElement('p');
message.className = 'profile-message';
message.textContent = data.descricao

// Adiciona o nome e a mensagem ao elemento "profile-info"
profileInfo.appendChild(name);
profileInfo.appendChild(message);

// Adiciona "profile-image" e "profile-info" ao "profile-card"
profileCard.appendChild(profileImage);
profileCard.appendChild(profileInfo);

// Adiciona o "profile-card" ao elemento pai desejado (por exemplo, o body)
document.querySelector("#mostrarusuarios").appendChild(profileCard);

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