function home() {
    location.href = 'index.html'
}

function criargrupos() {
    location.href = 'cadgrupo.html'
}

function criartarefas() {
    location.href = 'criartarefas.html'
}

function criargrupo() {
    location.href = 'cadgrupo.html'
}

function user() {
    location.href = '../'
}

function tarefasgrupo() {
    location.href = 'tarefagrupo.html'
}

function tarefasusuario() {
    location.href = 'tarefasusuario.html'
}

function adduser() {
    location.href = 'adduser.html'
}

function usuario() {
    location.href = 'usuario.html'

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
            window.location.href = "../login.html";
        });
    }, 1000);
};

function ranking() {
    // Exibir modal de carregamento
    Swal.fire({
        title: 'Carregando...',
        allowOutsideClick: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });

    // Promessa para buscar os dados
    const fetchData = new Promise((resolve, reject) => {
        db.collection(localStorage.getItem("empresa") + 'usuarios')
            .get()
            .then((querySnapshot) => {
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

                resolve(usuariosArray);
            })
            .catch((error) => {
                reject(error);
            });
    });

    // Executar a promessa e exibir os dados
    fetchData
        .then((usuariosArray) => {
            // Criar uma lista em ordem decrescente
            const lista = usuariosArray.map(usuario => `<li>${usuario.nome}: ${usuario.pontos}</li>`).join('');

            // Fechar o modal de carregamento
            Swal.close();

            // Exibir os dados em uma janela de diálogo SweetAlert
            Swal.fire({
                title: 'Pontos dos Usuários',
                html: `<ul>${lista}</ul>`,
                icon: 'info',
                customClass: {
                    container: 'swal-modal-container',
                    content: 'swal-modal-content',
                    title: 'swal-modal-title',
                    htmlContainer: 'swal-modal-html-container',
                    closeButton: 'swal-modal-close-button'
                }
            });
        })
        .catch((error) => {
            console.error('Erro ao buscar documentos:', error);
            // Exibir uma mensagem de erro caso ocorra algum problema
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu um erro ao carregar os dados.',
                icon: 'error'
            });
        });


}