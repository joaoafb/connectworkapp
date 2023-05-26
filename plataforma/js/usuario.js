var firebaseConfig = {
    // configurações do seu projeto Firebase
    apiKey: "AIzaSyBKa-Bs_f_Jg80zzeRlMLzrTH_0oWP3Jdo",
    authDomain: "connectwork-c13b2.firebaseapp.com",
    projectId: "connectwork-c13b2",
    storageBucket: "connectwork-c13b2.appspot.com",
    messagingSenderId: "407759011685",
    appId: "1:407759011685:web:625201a9a6e0b35aba6b8c",
    measurementId: "G-TC7VG0QJVX"
};
firebase.initializeApp(firebaseConfig);
db = firebase.firestore();

function loaduser() {
    setTimeout(() => {

        informacoes()
    }, 500);
}


function informacoes() {
    //PEGAR EMPRESAS
    db.collection(localStorage.getItem("empresa") + 'usuarios').where("email", "==", localStorage.getItem("email"))
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                document.getElementById("empresainput").value = doc.data().empresa;
                document.getElementById("cargo").value = doc.data().cargo;
                document.getElementById("usuario").value = doc.data().usuario;
                document.getElementById("habilidades").value = doc.data().habilidadesp + ', ' + doc.data().habilidadess;
                document.getElementById("setor").value = doc.data().setor;
                document.getElementById("nome").value = doc.data().nome
                document.getElementById("email").value = doc.data().email
                localStorage.setItem("idusuario", doc.id)


            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });


}


function update() {

    db.collection(localStorage.getItem("empresa") + 'usuarios').doc(localStorage.getItem("idusuario")).update({
            nome: document.getElementById("nome").value,
            cargo: document.getElementById("cargo").value,
            email: document.getElementById("email").value,
            setor: document.getElementById("setor").value,
            usuario: document.getElementById("usuario").value,
        })
        .then(() => {
            Swal.fire({
                showConfirmButton: false,
                icon: 'success',
                title: 'Parabens',
                text: 'Seus dados foram atualizados',
                footer: ''
            })
            db.collection("usuarios").doc(localStorage.getItem("idusuario")).update({
                    nome: document.querySelector("#nome").value,
                })
                .then(() => {
                    console.log("Document successfully updated!");
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            // Novo nome que você deseja definir
            var novoNome = document.querySelector("#nome").value

            // Obtendo a instância do objeto de autenticação do Firebase
            var auth = firebase.auth();

            // Adicionando um observador de estado de autenticação
            auth.onAuthStateChanged(function(user) {
                if (user) {
                    // Atualizando o perfil do usuário com o novo nome
                    user.updateProfile({
                        displayName: novoNome
                    }).then(function() {
                        // Nome atualizado com sucesso
                        console.log("Nome atualizado com sucesso!");
                    }).catch(function(error) {
                        // Ocorreu um erro ao atualizar o nome
                        console.error("Erro ao atualizar o nome:", error);
                    });
                } else {
                    // O usuário não está autenticado
                    console.log("Usuário não autenticado.");
                }
            });

            setTimeout(() => {
                location.href = './login.html'
            }, 1000);
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}