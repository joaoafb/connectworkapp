var firebaseConfig = { apiKey: "AIzaSyBKa-Bs_f_Jg80zzeRlMLzrTH_0oWP3Jdo", authDomain: "connectwork-c13b2.firebaseapp.com", projectId: "connectwork-c13b2", storageBucket: "connectwork-c13b2.appspot.com", messagingSenderId: "407759011685", appId: "1:407759011685:web:625201a9a6e0b35aba6b8c", measurementId: "G-TC7VG0QJVX" };
firebase.initializeApp(firebaseConfig), db = firebase.firestore(), document.getElementById("form-login").addEventListener("submit", function(e) {
    e.preventDefault();
    var t = document.getElementById("email").value,
        o = document.getElementById("senha").value;
    db.collection("usuariosexcluidos").where("email", "==", t).get().then(e => {
        e.forEach(e => {
            let t;
            Swal.fire({ icon: "error", title: "Sua Conta Est\xe1 Desativada", html: "", timer: 2e3, timerProgressBar: !0, willClose() { clearInterval(t) } }).then(e => { e.dismiss === Swal.DismissReason.timer && firebase.auth().signOut().then(() => { localStorage.clear(), sessionStorage.clear(), document.cookie.split(";").forEach(e => { document.cookie = e.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/") }), window.location.href = "login.html" }) })
        })
    }).catch(e => { console.log("Error getting documents: ", e) }), firebase.auth().signInWithEmailAndPassword(t, o).then(function(e) { localStorage.setItem("email", firebase.auth().currentUser.email), localStorage.setItem("nome", firebase.auth().currentUser.displayName), console.log(firebase.auth().currentUser), db.collection("cities").where("capital", "==", !0).get().then(e => { e.forEach(e => { console.log(e.id, " => ", e.data()) }) }).catch(e => { console.log("Error getting documents: ", e) }), Swal.fire({ icon: "success", title: "Logado Com Sucesso!", text: "Seja Bem-Vindo Novamente.", footer: "", showConfirmButton: !1, showCancelButton: !1 }), setTimeout(() => { location.href = "./index.html" }, 1e3) }).catch(function(e) {
        var t = e.code,
            o = e.message;
        "auth/wrong-password" === t ? Swal.fire({ title: "Oops...", text: "Sua senha est\xe1 incorreta!", icon: "error", customClass: { popup: "my-custom-popup", title: "my-custom-title", content: "my-custom-content", confirmButton: "my-custom-confirm-button" }, showConfirmButton: !1, showCancelButton: !1, confirmButtonText: "Fechar" }) : "auth/user-not-found" === t ? (console.log("Usu\xe1rio n\xe3o encontrado. Verifique seu e-mail e tente novamente."), Swal.fire({ title: "Oops...", text: "Usu\xe1rio n\xe3o encontrado. Verifique seu e-mail e tente novamente", icon: "error", customClass: { popup: "my-custom-popup", title: "my-custom-title", content: "my-custom-content", confirmButton: "my-custom-confirm-button" }, showConfirmButton: !1, showCancelButton: !1, confirmButtonText: "Fechar" })) : "auth/invalid-email" === t ? (console.log("Email Invalido"), Swal.fire({ title: "Oops...", text: "Preencha os dados para o login!", icon: "error", customClass: { popup: "my-custom-popup", title: "my-custom-title", content: "my-custom-content", confirmButton: "my-custom-confirm-button" }, showConfirmButton: !1, showCancelButton: !1, confirmButtonText: "Fechar" })) : alert(o)
    })
});

document.querySelector("#email").value = localStorage.getItem("email")
setTimeout(() => {



    // Verificar o estado de autenticação do usuário
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // O usuário está autenticado
            window.location.href = './index.html'
        } else {

        }
    });



}, 1000);