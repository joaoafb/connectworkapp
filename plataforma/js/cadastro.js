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
const skillsInput = document.getElementById('skills');
const skills = skillsInput.value.split(',');


function cadastro() {
    //PUXAR EMPRESAS
    puxarempresas()
    verificarusuario()
    verificarsenha()
}

function obterParteDoLinkAposHash() {
    try {
        const url = window.location.href;
        const indexHash = url.indexOf("#");
        if (indexHash !== -1) {
            return url.substring(indexHash + 1);
        }
        return "";
    } catch (error) {
        Swal.fire(
            'Algo deu errado!',
            'Solicite outro link para cadastro.',
            'error'
        )
        return "";
    }
}

try {
    const parteDoLink = obterParteDoLinkAposHash();
    document.querySelector('#empresa').value = parteDoLink;
    if (parteDoLink == '') {
        Swal.fire(
            'Algo deu errado!',
            'Solicite outro link para cadastro.',
            'error'
        )
        setTimeout(() => {
            document.body.style.display = 'none'
            document.write("Solicite um novo link ao responsavel pela plataforma em sua empresa. Att ConnectWork")
        }, 5000);
    }
} catch (error) {
    console.error("Erro ao atribuir valor ao elemento 'empresa':", error);
}


// Adiciona o evento de submit ao formulário
document.getElementById("form-cadastro").addEventListener("submit", function(event) {
    event.preventDefault(); // previne o comportamento padrão do form

    // Obtém os valores dos campos
    var nome = document.getElementById("nome")
    var email = document.getElementById("email")
    var senha = document.getElementById("senha")
    var resenha = document.getElementById("resenha")
    var usuario = document.getElementById("usuario")
    var contato = document.getElementById("contato")
    var empresa = document.getElementById("empresa")
    var cargo = document.getElementById("cargo")
    var setor = document.getElementById("setor")

    var descricao = document.getElementById("descricao")
    var habilidadesprimarias = document.getElementById("skills")
    var habilidadessecundarias = document.getElementById("skillstwo")




    //VERIFICAR EMPRESAS


    // Cria o usuário no Firebase
    firebase.auth().createUserWithEmailAndPassword(email.value, senha.value)
        .then(function(user) {
            // Define o nome do usuário
            user.user.updateProfile({
                displayName: nome.value
            }).then(function() {
                const timestamp = firebase.firestore.Timestamp.now();

                function formatarHorario(timestamp) {
                    const date = timestamp.toDate();
                    const horas = date.getHours().toString().padStart(2, '0');
                    const minutos = date.getMinutes().toString().padStart(2, '0');
                    const segundos = date.getSeconds().toString().padStart(2, '0');
                    return `${horas}:${minutos}:${segundos}`;
                }

                const horarioFormatado = formatarHorario(timestamp);
                console.log(horarioFormatado);

                const db = firebase.firestore();

                db.collection(empresa.value + "usuarios").add({
                    nome: nome.value,
                    email: email.value,
                    usuario: usuario.value,
                    contato: contato.value,
                    empresa: empresa.value,
                    cargo: cargo.value,
                    setor: setor.value,

                    descricao: descricao.value,
                    habilidadesp: habilidadesprimarias.value,
                    habilidadess: habilidadessecundarias.value,
                    data: horarioFormatado,
                    status: 'offline',
                    pontos: 0

                }).then(function(docRef) {
                    console.log("Documento adicionado com ID:", docRef.id);
                    location.href = 'login.html'
                }).catch(function(error) {
                    console.error("Erro ao adicionar documento:", error);
                });

                db.collection("usuarios").add({
                    nome: nome.value,
                    email: email.value,
                    usuario: usuario.value,
                    contato: contato.value,
                    empresa: empresa.value,
                    cargo: cargo.value,
                    setor: setor.value,

                    descricao: descricao.value,
                    habilidadesp: habilidadesprimarias.value,
                    habilidadess: habilidadessecundarias.value,
                    data: horarioFormatado,
                    status: 'offline',
                    pontos: 0

                }).then(function(docRef) {
                    console.log("Documento adicionado com ID:", docRef.id);
                    location.href = 'login.html'
                }).catch(function(error) {
                    console.error("Erro ao adicionar documento:", error);
                });


                console.log("Usuário cadastrado com sucesso!");
            }).catch(function(error) {
                console.error(error);
            });
        })
        .catch(function(error) {
            console.error(error);
        });
});

function puxarempresas() {
    db.collection("empresas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {




            var optionempresa = document.createElement('option');
            optionempresa.textContent = doc.data().nome



            document.querySelector("#listempresas").appendChild(optionempresa);
        });
    });

}

function verificarusuario() {

    //VERIFICAR SE JA EXISTE O USUARIO
    document.getElementById("usuario").addEventListener("input", (event) => {
        const selectedOption = event.target.value;

        db.collection(empresa.value + "usuarios").where("usuario", "==", usuario.value)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    console.log('Esse Usuario Ja Existe');
                    document.querySelector("#alertuser").style.display = 'block'
                });
            })
            .catch((error) => {
                console.log("Usuario OK");
            });
    });
}


function verificarsenha() {
    //VERIFICAR SE JA EXISTE O USUARIO
    resenha.addEventListener("input", (event) => {
        const selectedOption = event.target.value;
        if (resenha.value != senha.value) {
            document.querySelector("#resenhalabel").style.display = 'block'
        } else {
            document.querySelector("#resenhalabel").style.display = 'none'
        }


    });

}