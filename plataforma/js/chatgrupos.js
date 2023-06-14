function exibirgrupos() {
    db.collection(localStorage.getItem("empresa") + "grupos" + localStorage.getItem("nome")).get().then((querySnapshot) => {
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
            var ul = document.querySelector("#gruposlista");

            // Adicionando o item à lista
            ul.appendChild(li);

        });
    });




}