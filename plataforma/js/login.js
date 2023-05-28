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


document.getElementById("form-login").addEventListener("submit", function(event) {
    event.preventDefault();


    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    db.collection("usuariosexcluidos").where("email", "==", email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let timerInterval
                Swal.fire({
                    icon: 'error',
                    title: 'Sua Conta Está Desativada',
                    html: '',
                    timer: 2000,
                    timerProgressBar: true,

                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        // Desloga o usuário da conta do Firebase Auth
                        firebase.auth().signOut().then(() => {
                            // Limpa os dados do navegador
                            localStorage.clear();
                            sessionStorage.clear();
                            document.cookie.split(";").forEach((cookie) => {
                                document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                            });

                            // Redireciona para a página principal
                            window.location.href = "login.html";
                        });
                    }
                })
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });


    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(function(user) {
            localStorage.setItem("email", firebase.auth().currentUser.email)
            localStorage.setItem("nome", firebase.auth().currentUser.displayName)
            console.log(firebase.auth().currentUser)

            db.collection("cities").where("capital", "==", true)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });

            Swal.fire({

                icon: 'success',
                title: 'Logado Com Sucesso!',
                text: 'Seja Bem-Vindo Novamente.',
                footer: '',
                showConfirmButton: false,
                showCancelButton: false,
            })
            setTimeout(() => {
                location.href = './index.html'
            }, 1000);



        })
        .catch(function(error) {

            var errorCode = error.code;
            var errorMessage = error.message;

            // Exibe mensagem de erro personalizada de acordo com o código de erro retornado
            if (errorCode === 'auth/wrong-password') {



                Swal.fire({
                    title: 'Oops...',
                    text: 'Sua senha está incorreta!',
                    icon: 'error',
                    customClass: {
                        popup: 'my-custom-popup',
                        title: 'my-custom-title',
                        content: 'my-custom-content',
                        confirmButton: 'my-custom-confirm-button'
                    },
                    showConfirmButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'Fechar'
                });






            } else if (errorCode === 'auth/user-not-found') {
                console.log("Usuário não encontrado. Verifique seu e-mail e tente novamente.")

                Swal.fire({
                    title: 'Oops...',
                    text: 'Usuário não encontrado. Verifique seu e-mail e tente novamente',
                    icon: 'error',
                    customClass: {
                        popup: 'my-custom-popup',
                        title: 'my-custom-title',
                        content: 'my-custom-content',
                        confirmButton: 'my-custom-confirm-button'
                    },
                    showConfirmButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'Fechar'
                });



            } else {
                alert(errorMessage);
            }
        });
});