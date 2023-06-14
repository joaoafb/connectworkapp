// Verificar o estado de autenticação do usuário
firebase.auth().onAuthStateChanged((user) => {
    if (user) {

    } else {
        window.location.href = './login.html'
    }
});


function load() {
    pegarempresa();
    null == localStorage.getItem("nome") && (Swal.fire({ icon: "error", title: "Oops...", text: "Você precisa estar logado", footer: "", showConfirmButton: !1 }), setTimeout(() => { location.href = "./login.html" }, 1e3))
}

function pegarempresa() {
    db.collection("usuarios").where("email", "==", localStorage.getItem("email")).get().then(n => { n.forEach(n => { localStorage.setItem("empresa", n.data().empresa) }) }).catch(n => { console.log("Error getting documents: ", n) });
    setTimeout(() => { "null | ConnectWork" == document.title && location.reload() }, 1e3)
}


function admin() { db.collection("admin").where("email", "==", localStorage.getItem("email")).get().then(n => { n.forEach(() => { location.href = "./admin" }) }).catch(n => { console.log("Error getting documents: ", n) }) }

function deslogar() {

    Swal.fire({
        title: 'Realmente deseja deslogar a conta?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: `Não`,
        showCancelButton: false
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            setTimeout(() => { firebase.auth().signOut().then(() => { localStorage.clear(), sessionStorage.clear(), document.cookie.split(";").forEach(n => { document.cookie = n.replace(/^ +/, "").replace(/=.*/, "=;expires=" + (new Date).toUTCString() + ";path=/") }), window.location.href = "login.html" }) }, 500)

        } else if (result.isDenied) {
            Swal.fire('Bom trabalho!', '', 'success')
        }
    })
}

function ranking() {
    db.collection(localStorage.getItem("empresa") + "usuarios").get().then(n => {
        let t = [];
        n.forEach(n => {
            let i = { nome: n.data().nome, pontos: n.data().pontos };
            t.push(i)
        });
        t.sort((n, t) => t.pontos - n.pontos);
        let i = t.map(n => `<li>${n.nome}: ${n.pontos}</li>`).join("");
        Swal.fire({ title: "Ranking de Pontos", html: `<ul>${i}</ul>`, icon: "info", customClass: { container: "swal-modal-container", content: "swal-modal-content", title: "swal-modal-title", htmlContainer: "swal-modal-html-container", closeButton: "swal-modal-close-button" } }).then(n => { n.isConfirmed && Swal.close() })
    }).catch(n => { console.error("Erro ao buscar documentos:", n) })
}
document.addEventListener("DOMContentLoaded", function() {
    var n = document.querySelectorAll(".sidenav");
    M.Sidenav.init(n, {})
});
db.collection("admin").where("email", "==", localStorage.getItem("email")).get().then(n => { n.forEach(() => { document.getElementById("admin").style.display = "flex" }) }).catch(n => { console.log("Error getting documents: ", n) });