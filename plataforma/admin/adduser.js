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

var db = firebase.firestore();



function procurarusuarios() {
    db.collection(localStorage.getItem("empresa") + "usuarios").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var option = document.createElement('option');
            option.setAttribute('value', doc.data().nome);
            option.textContent = doc.data().nome;
            var select = document.getElementById('usuarioslist');
            select.appendChild(option);


        });
    });
}
procurarusuarios()

function procurargrupos() {
    db.collection(localStorage.getItem("empresa") + "grupos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var option = document.createElement('option');
            option.setAttribute('value', doc.data().nome);
            option.textContent = doc.data().nome;
            var select = document.getElementById('gruposlist');
            select.appendChild(option);


        });
    });
}
procurargrupos()

const form = document.querySelector('#my-form');

form.addEventListener('submit', function(event) {

    event.preventDefault();
    //pegar infor de gps

    db.collection(localStorage.getItem("empresa") + 'grupos').where("nome", "==", document.querySelector("#grupos").value)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                    //salvar infors do gp no user
                    // Add a new document in collection "cities"
                db.collection(localStorage.getItem("empresa") + 'grupos' + document.querySelector("#usuarios").value).add({
                        nome: data.nome,
                        empresa: localStorage.getItem("empresa"),
                    })
                    .then(() => {

                        Swal.fire(
                            'Good job!',
                            'Usuario Adicionado Com Sucesso',
                            'success'
                        )
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });

            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
})