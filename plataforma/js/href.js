function load() {
    adminfunc()
    pegarempresa()
    if (localStorage.getItem("nome") == null) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Você precisa estar logado',
            footer: '',
            showConfirmButton: false
        })
        setTimeout(() => {
            location.href = './login.html'
        }, 1000);
    }


}

function pegarempresa() {
    db.collection("usuarios").where("email", "==", localStorage.getItem("email"))
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                localStorage.setItem("empresa", doc.data().empresa)
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    setTimeout(() => {
        if (document.title == 'null | ConnectWork') {
            location.reload()
        }
    }, 1000);
}

function adminfunc() {
   db.collection('admin').where("email", "==", localStorage.getItem("email"))
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                document.getElementById("admin").style.display = 'flex'
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}


function home() {
    setTimeout(() => {
        location.href = 'dash.html'
    }, 500);
}

function dash() {
    setTimeout(() => {
        location.href = 'index.html'
    }, 500);
}


function grupos() {
    setTimeout(() => {
        location.href = 'grupos.html'
    }, 500);
}

function tarefas() {
    setTimeout(() => {
        location.href = 'tarefas.html'
    }, 500);
}

function tarefasgrupo() {
    setTimeout(() => {
        location.href = 'tarefasemgrupo.html'
    }, 500);
}

function usuario() {
    setTimeout(() => {
        location.href = 'usuario.html'
    }, 500);

}



function admin() {
    location.href = './admin'

}

function deslogar() {




    setTimeout(() => {

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
    }, 500);
}; // Oculta o conteúdo da página enquanto está carregando


function ranking() {
    db.collection(localStorage.getItem("empresa") + 'usuarios').get().then((querySnapshot) => {
            const usuariosArray = [];

            querySnapshot.forEach((doc) => {
                const usuario = {
                    nome: doc.data().nome,
                    pontos: doc.data().pontos
                };
                usuariosArray.push(usuario);
            });

            // Ordenar o array de usuários em ordem decrescente de pontos
            usuariosArray.sort((a, b) => b.pontos - a.pontos);

            // Criar uma lista em ordem decrescente
            const lista = usuariosArray.map(usuario => `<li>${usuario.nome}: ${usuario.pontos}</li>`).join('');

            // Exibir a lista em uma janela de diálogo SweetAlert
            Swal.fire({
                title: 'Ranking de Pontos',
                html: `<ul>${lista}</ul>`,
                icon: 'info',
                customClass: {
                    container: 'swal-modal-container',
                    content: 'swal-modal-content',
                    title: 'swal-modal-title',
                    htmlContainer: 'swal-modal-html-container',
                    closeButton: 'swal-modal-close-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.close();
                }
            });
        })
        .catch((error) => {
            console.error('Erro ao buscar documentos:', error);
        });

}
