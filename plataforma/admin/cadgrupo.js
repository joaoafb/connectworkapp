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

var db = firebase.firestore();
var storage = firebase.storage();

function criarGrupo() {
    // Obtém o nome do grupo, a data de criação e a imagem
    var nomeGrupo = document.getElementById("nomeGrupo").value;

    var imagemGrupo = document.getElementById("imagemgrupo").files[0];

    // Cria uma referência ao local onde a imagem será armazenada
    var storageRef = firebase.storage().ref().child("imagens/" + imagemGrupo.name);

    // Faz o upload da imagem para o Firebase Storage
    var uploadTask = storageRef.put(imagemGrupo);

    // Monitora o progresso do upload
    uploadTask.on(
        "state_changed",
        function(snapshot) {
            // Mostra o progresso do upload
            var progresso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Progresso: " + progresso + "%");
        },
        function(error) {
            // Mostra um erro caso ocorra algum problema
            console.error("Erro ao enviar imagem: ", error);
        },
        function() {
            // Salva as informações do grupo no Firebase Firestore
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                var db = firebase.firestore();
                var userId = firebase.auth().currentUser.uid;
                db.collection(document.querySelector("#empresa").value + "grupos").add({
                        nome: nomeGrupo,
                        data: firebase.firestore.FieldValue.serverTimestamp(),
                        criadopor: localStorage.getItem("nome"),
                        empresa: document.querySelector("#empresa").value,
                        imagem: downloadURL,
                        userId: userId,
                        usuarios: '0',
                        pontos: 0
                    })
                    .then(function(docRef) {
                        console.log("Grupo criado com sucesso! ID do documento: ", docRef.id);
                        Swal.fire({
                            icon: 'success',
                            title: 'Operação realizada com sucesso!',
                            text: 'Seu grupo foi criado com sucesso.',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#3085d6'
                        });

                    })
                    .catch(function(error) {
                        console.error("Erro ao criar grupo: ", error);
                    });
            });
        }
    );
}