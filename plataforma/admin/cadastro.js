var firebaseConfig = {
    apiKey: "AIzaSyBKa-Bs_f_Jg80zzeRlMLzrTH_0oWP3Jdo",
    authDomain: "connectwork-c13b2.firebaseapp.com",
    projectId: "connectwork-c13b2",
    storageBucket: "connectwork-c13b2.appspot.com",
    messagingSenderId: "407759011685",
    appId: "1:407759011685:web:625201a9a6e0b35aba6b8c",
    measurementId: "G-TC7VG0QJVX"
};
firebase.initializeApp(firebaseConfig);

// Adiciona o evento de submit ao formulário
document.getElementById("form-cadastro").addEventListener("submit", function(event) {
    event.preventDefault(); // previne o comportamento padrão do form

    // Obtém os valores dos campos
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    // Cria o usuário no Firebase
    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(function(user) {
            // Define o nome do usuário
            user.user.updateProfile({
                displayName: nome
            }).then(function() {
                 
                const db = firebase.firestore();

                db.collection("usuarios").add({
                    nome:nome,
                 email: email,
                 funcao: document.querySelector("#funcao").value,
                 status: 'offline'
                 
                }).then(function(docRef) {
                  console.log("Documento adicionado com ID:", docRef.id);
                  M.toast({html: 'Conta Cadastrada Com Sucesso'})
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
