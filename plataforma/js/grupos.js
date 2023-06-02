function scrollToEnd(n) { n.scrollTo({ top: n.scrollHeight, behavior: "smooth" }) }
const firebaseConfig = { apiKey: "AIzaSyBKa-Bs_f_Jg80zzeRlMLzrTH_0oWP3Jdo", authDomain: "connectwork-c13b2.firebaseapp.com", projectId: "connectwork-c13b2", storageBucket: "connectwork-c13b2.appspot.com", messagingSenderId: "407759011685", appId: "1:407759011685:web:625201a9a6e0b35aba6b8c", measurementId: "G-TC7VG0QJVX" };
firebase.initializeApp(firebaseConfig);
const database = firebase.database(),
    db = firebase.firestore();
db.collection(localStorage.getItem("empresa") + "grupos" + localStorage.getItem("nome")).get().then(n => {
    n.forEach(n => {


        var i = document.createElement("li"),
            r, u, f, t, e;
        i.classList.add("collection-item", "avatar");
        r = document.createElement("i");
        r.classList.add("material-icons", "circle", "roxo");
        r.textContent = "group";
        u = document.createElement("span");
        u.classList.add("title");
        u.textContent = n.data().nome;

        f = document.createElement("p");
        f.textContent = "";
        t = document.createElement("a");
        t.href = "#!";
        t.classList.add("secondary-content");
        e = document.createElement("i");
        e.classList.add("material-icons", "iconroxo");
        e.textContent = "chat";


        //apagar gp excluido


        function handleClick() {
            document.querySelector(".contatos").style.width = '0px';
            document.querySelector(".boxchat").style.transition = 'width 0.3s ease';
            setTimeout(() => {
                document.querySelector(".contatos").style.transition = 'width 0.3s ease'

                document.querySelector(".boxchat").style.width = '70%';
                document.querySelector(".iconm").style.display = 'block';

            }, 100);
            // Adicione aqui as ações que deseja realizar quando o botão for clicado
        }

        // Exemplo de uso: adicionando o evento de clique a um botão específico
        const meuBotao = t
        meuBotao.addEventListener("click", handleClick);
        t.onclick = function() {



            document.querySelectorAll("h4").item(1).innerHTML = n.data().nome
            document.querySelector("#chat-form").style.display = "flex";

            document.querySelector("#message-list").innerHTML = "";
            let t = firebase.database().ref(localStorage.getItem("empresa") + n.data().nome + "mensagens")
            t.on("value", n => {
                let t = document.querySelector("#message-list");
                t.innerHTML = "";
                n.forEach(n => {
                    let u = n.val(),
                        i = document.createElement("div");
                    i.classList.add("message");
                    let r = document.createElement("span");
                    r.classList.add("sender");
                    r.textContent = u.por;
                    let f = document.createElement("div");
                    f.classList.add("content");
                    let o = document.createElement("span");
                    o.classList.add("message-text");
                    o.textContent = u.mensagem;
                    let e = document.createElement("span");
                    e.classList.add("time");
                    e.textContent = u.timestamp;
                    u.por === localStorage.getItem("nome") && (r.classList.add("sender"), f.classList.add("mymsg"), r.textContent = "", e.classList.add("my"));
                    i.appendChild(r);
                    f.appendChild(o);
                    i.appendChild(f);
                    i.appendChild(e);
                    t.appendChild(i);
                    setTimeout(() => { scrollToEnd(t) }, 100)
                })
            });
            let i = document.querySelector("#chat-form");
            i.addEventListener("submit", t => {
                t.preventDefault();
                let i = document.querySelector("#message-input"),
                    r = i.value,
                    u = new Date,
                    f = u.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                "" == document.querySelector("#message-input").value ? console.log("Digite Algo") : database.ref(localStorage.getItem("empresa") + document.querySelectorAll("h4").item(1).textContent + "mensagens").push().set({ mensagem: r, timestamp: f, por: localStorage.getItem("nome"), empresa: localStorage.getItem("empresa"), para: document.querySelectorAll("h4").item(1).textContent });
                i.value = ""
            })
        };
        t.appendChild(e);
        f.appendChild(t);
        i.appendChild(r);
        i.appendChild(u);
        i.appendChild(f);
        document.querySelector(".collection").appendChild(i)
    })
});
document.querySelector(".iconm").style.display = 'none';

function backmsg() {
    document.querySelector(".contatos").style.width = '350px'
    document.querySelector(".iconm").style.display = 'none';
    document.querySelector(".boxchat").style.width = '600px';
    document.querySelector(".boxchat").style.transition = 'width 0.3s ease';
}

function excluir(nome) {
    db.collection(localStorage.getItem("empresa") + 'gruposexcluidos').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            db.collection(localStorage.getItem("empresa") + 'grupos' + localStorage.getItem("nome")).where("nome", "==", nome)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        db.collection(localStorage.getItem("empresa") + 'grupos' + localStorage.getItem("nome")).doc(doc.id).delete().then(() => {

                            location.reload()

                        }).catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });

        });
    });

}