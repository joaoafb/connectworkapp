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
db.collection(localStorage.getItem("empresa") + 'grupos' + localStorage.getItem("nome")).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {


        // Criação dos elementos
        var li = document.createElement("li");
        li.classList.add("collection-item", "avatar");

        var i = document.createElement("i");
        i.classList.add("material-icons", "circle", "roxo");
        i.textContent = "group";

        var span = document.createElement("span");
        span.classList.add("title");
        span.textContent = doc.data().nome

        var p = document.createElement("p");
        p.textContent = "Empresa " + doc.data().empresa

        var a = document.createElement("a");
        a.href = "#!";
        a.classList.add("secondary-content");

        var i2 = document.createElement("i");
        i2.classList.add("material-icons", "iconroxo");
        i2.textContent = "chat";
        a.onclick = function() {

            document.querySelector("#chat-form").style.display = 'flex'
            document.querySelector("#message-list").innerHTML = ''
            const messageRef = firebase.database().ref(localStorage.getItem("empresa") + doc.data().nome + 'mensagens');
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

                    const spanMessageText = document.createElement("span");
                    spanMessageText.classList.add("message-text");
                    spanMessageText.textContent = data.mensagem;

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
                    divContent.appendChild(spanMessageText);
                    div.appendChild(divContent);
                    div.appendChild(spanTime);

                    messageList.appendChild(div);
                    setTimeout(() => {
                        scrollToEnd(messageList);
                    }, 100);
                });
            });


            //enviar msg
            const chatForm = document.querySelector('#chat-form')
            chatForm.addEventListener("submit", (e) => {

                e.preventDefault();

                // Capturar a mensagem do usuário
                const messageInput = document.querySelector("#message-input");
                const message = messageInput.value;
                const localTime = new Date();

                // Formatar o horário como uma string "22:22"
                const horario = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                if (document.querySelector("#message-input").value == '') {
                    console.log("Digite Algo")
                } else {

                    database.ref(localStorage.getItem("empresa") + doc.data().nome + 'mensagens').push().set({
                        mensagem: message,
                        timestamp: horario,
                        por: localStorage.getItem("nome"),
                        empresa: localStorage.getItem("empresa"),
                        para: doc.data().nome
                    });

                }
                // Enviar a mensagem para o Realtime Database

                // Limpar o campo de entrada de texto após o envio da mensagem
                messageInput.value = "";

            });

        }

        // Anexando os elementos
        a.appendChild(i2);
        p.appendChild(a);
        li.appendChild(i);
        li.appendChild(span);
        li.appendChild(p);

        // Obtendo a lista
        var ul = document.querySelector(".collection");

        // Adicionando o item à lista
        ul.appendChild(li);

    });
});

function scrollToEnd(element) {
    element.scrollTo({
        top: element.scrollHeight,
        behavior: "smooth"
    });
}