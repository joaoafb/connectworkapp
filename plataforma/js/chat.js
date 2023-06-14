function exibirusuarios() {


    db.collection(localStorage.getItem("empresa") + 'usuarios').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {


            // Criação dos elementos
            var li = document.createElement("li");
            li.classList.add("collection-item", "avatar");

            var i = document.createElement("i");
            i.classList.add("material-icons", "circle", "roxo", "flex", "flex-col");
            i.textContent = "group";
            var span = document.createElement("span");
            span.classList.add("title");
            span.textContent = doc.data().nome
            if (doc.data().nome == localStorage.getItem("nome")) {
                li.style.display = 'none'
            } else {
                span.textContent = doc.data().nome
            }



            var a = document.createElement("a");
            a.href = "#!";
            a.classList.add("secondary-content");

            var i2 = document.createElement("i");
            i2.classList.add("material-icons", "iconroxo");
            i2.textContent = "chat";

            li.onclick = function() {
                document.querySelectorAll('.text-2xl').item(1).innerHTML = doc.data().nome
                setTimeout(() => {
                    enviarmsg(document.querySelectorAll("h4").item(1).textContent)
                }, 100);

            }

            // Anexando os elementos
            a.appendChild(i2);

            li.appendChild(i);
            li.appendChild(span);


            // Obtendo a lista
            var ul = document.querySelector(".collection");

            // Adicionando o item à lista
            ul.appendChild(li);

        });
    });

}






function enviarmsg(nome) {






    document.querySelector("#chat-form").style.display = 'flex'

    const messageRef = firebase.database().ref(localStorage.getItem("empresa") + document.querySelectorAll("h4").item(1).textContent + localStorage.getItem("nome"));
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
                spanMessageText.innerHTML = '<i class="fa-solid fa-file"></i> CLICAR PARA ABRIR'

                spanMessageText.className = 'imgmsg'
                spanMessageText.style.cursor = 'pointer'

                spanMessageText.onclick = function() {
                    window.open(data.mensagem, '_blank');

                }
                divContent.appendChild(spanMessageText);
                setTimeout(() => {
                    scrollToEnd(div);
                }, 100);
            } else {
                const spanMessageText = document.createElement("span");
                spanMessageText.classList.add("message-text");
                spanMessageText.textContent = data.mensagem;
                divContent.appendChild(spanMessageText);
                setInterval(() => {
                    setTimeout(() => {
                        scrollToEnd(div);
                    }, 100);
                }, 100);
            }



            const spanTime = document.createElement("span");
            spanTime.classList.add("time");
            spanTime.textContent = data.timestamp;

            if (data.por === localStorage.getItem("nome")) {
                spanSender.classList.add("sender");
                divContent.className = "mymsg chat-bubble chat-end"
                spanSender.textContent = '';
                spanTime.classList.add("my");
            }



            // Anexando os elementos
            div.appendChild(spanSender);

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

        // Verificar se a mensagem está vazia
        if (message == '') {
            console.log("Digite algo");
        } else {
            // Formatar o horário como uma string "22:22"
            const horario = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const database = firebase.database();
            // Referência para o Realtime Database
            const databaseRef = database.ref(localStorage.getItem("empresa") + document.querySelectorAll("h4").item(1).textContent + localStorage.getItem("nome"));

            // Enviar a mensagem para o destinatário
            const messageData = {
                mensagem: message,
                timestamp: horario,
                por: localStorage.getItem("nome"),
                empresa: localStorage.getItem("empresa"),
                para: document.querySelectorAll("h4").item(1).textContent
            };

            databaseRef.push().set(messageData);

            // Enviar uma cópia da mensagem para o remetente
            const senderRef = database.ref(localStorage.getItem("empresa") + localStorage.getItem("nome") + document.querySelectorAll("h4").item(1).textContent);
            senderRef.push().set(messageData);

        }

        // Enviar a mensagem para o Realtime Database

        // Limpar o campo de entrada de texto após o envio da mensagem
        messageInput.value = "";

    });
}

function scrollToEnd(element) {
    element.scrollTo({
        top: element.scrollHeight,
        behavior: "smooth"
    });
}



function file() {
    Swal.fire({
        title: 'Upload de Imagem',
        html: `
          <input type="file" id="input-imagem" class="file-input file-input-bordered file-input-primary w-full max-w-xs" accept="image/*"><br>
          <button class="btnp" style="width:80%;height:40px;margin:10px;" onclick="enviarImagem()">Enviar</button>
        `,
        showCancelButton: false,
        showConfirmButton: false,
        cancelButtonText: 'Fechar',
        cancelButtonColor: '#dc3545'
    });
}

function enviarImagem() {
    const storage = firebase.storage();
    const inputImagem = document.getElementById('input-imagem');
    const imagemSelecionada = inputImagem.files[0];

    // Enviar a imagem para o Firebase Storage
    const storageRef = firebase.storage().ref();
    const arquivoRef = storageRef.child(imagemSelecionada.name);
    arquivoRef.put(imagemSelecionada)
        .then(() => {
            // Obter o link da imagem no Firebase Storage
            arquivoRef.getDownloadURL()
                .then((url) => {
                    const arquivo = inputImagem.files[0]; // Substitua pelo seu elemento de input de arquivo

                    function obterExtensaoArquivo(arquivo) {
                        const nomeArquivo = arquivo.name;
                        const extensao = nomeArquivo.substring(nomeArquivo.lastIndexOf('.') + 1);
                        return extensao;
                    }

                    const extensaoArquivo = obterExtensaoArquivo(arquivo);
                    console.log('Extensão do arquivo:', extensaoArquivo);

                    document.querySelector("#message-input").value = url + '.' + extensaoArquivo
                    setTimeout(() => {
                        document.querySelector("#enviar").click()
                    }, 100);
                    Swal.close()
                })
                .catch((error) => {
                    console.log('Erro ao obter o link da imagem:', error);
                });
        })
        .catch((error) => {
            console.log('Erro ao enviar a imagem:', error);
        });
}


let mediaRecorder; // Variável para armazenar o objeto MediaRecorder
let chunks = []; // Array para armazenar os fragmentos de áudio gravados


function audio() {
    const storage = firebase.storage();
    document.querySelector("#gravaraudio").style.display = 'none'
    document.querySelector("#stopaudio").style.display = 'block'
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            chunks = [];

            mediaRecorder.addEventListener('dataavailable', function(event) {
                chunks.push(event.data);
            });
        })
        .catch(function(error) {
            console.log('Erro ao acessar o microfone: ', error);
        });
}

function stopmic() {
    document.querySelector("#gravaraudio").style.display = 'block'
    document.querySelector("#stopaudio").style.display = 'none'
    mediaRecorder.stop();

    mediaRecorder.addEventListener('stop', function() {
        const blob = new Blob(chunks, { type: 'audio/webm' });

        // Crie uma referência única para o arquivo de áudio no Firebase Storage
        const audioRef = storage.ref().child('audio/' + Date.now() + '.webm');

        // Faça o upload do arquivo de áudio para o Firebase Storage
        audioRef.put(blob)
            .then(function(snapshot) {
                // Obtenha a URL do arquivo de áudio no Firebase Storage
                audioRef.getDownloadURL()
                    .then(function(url) {
                        document.querySelector("#message-input").value = url
                        setTimeout(() => {
                            document.querySelector("#enviar").click()
                        }, 100);
                    })
                    .catch(function(error) {
                        console.log('Erro ao obter a URL do áudio: ', error);
                    });
            })
            .catch(function(error) {
                console.log('Erro ao enviar o áudio para o Firebase Storage: ', error);
            });
    });
}