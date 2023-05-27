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
const database = firebase.database();
const db = firebase.firestore();
// FIM AUTH FIREBASE
//PROCURAR E EXIBIR GRUPOS EM QUE O LOCALSTOREGE.EMAIL PARTICIPA
//PEGAR EMPRESAS

db.collection(localStorage.getItem("empresa") + 'usuarios').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const option = document.createElement("option")
        option.value = doc.data().nome
        document.querySelector("#datauser").appendChild(option)

    });
});


function chat() {


    const messageRef = firebase.database().ref(localStorage.getItem("empresa") + document.querySelector("#userone").value + document.querySelector("#usertwo").value);
    messageRef.on("value", (snapshot) => {
        const messageList = document.querySelector("#message-list");
        messageList.innerHTML = '';

        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();

            // Criação dos elementos
            const div = document.createElement("div");
            div.classList.add("message");

            const spanSender = document.createElement("span");
            spanSender.classList.add("sender");
            spanSender.textContent = data.por;

            const divContent = document.createElement("div");
            divContent.classList.add("content");


            if (data.mensagem.startsWith("http://") || data.mensagem.startsWith("https://")) {

                const spanMessageText = document.createElement("span");
                spanMessageText.textContent = 'Abrir Arquivo'
                spanMessageText.className = 'imgmsg'
                spanMessageText.style.cursor = 'pointer'

                spanMessageText.onclick = function() {
                    window.open(data.mensagem, '_blank');

                }
                divContent.appendChild(spanMessageText);

            } else {
                const spanMessageText = document.createElement("span");
                spanMessageText.classList.add("message-text");
                spanMessageText.textContent = data.mensagem;
                divContent.appendChild(spanMessageText);

            }


            const spanTime = document.createElement("span");
            spanTime.classList.add("time");
            spanTime.textContent = data.timestamp;

            if (data.por === localStorage.getItem("nome")) {
                spanSender.classList.add("sender");
                divContent.classList.add("mymsg");
                spanSender.textContent = '';
                spanTime.classList.add("my");
            }

            // Anexando os elementos
            div.appendChild(spanSender);

            div.appendChild(divContent);
            div.appendChild(spanTime);

            messageList.appendChild(div);

        });
    });
}