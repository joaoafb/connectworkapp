const sidebarDiv = document.createElement('div');
sidebarDiv.className = 'sidebarcss';

sidebarDiv.innerHTML = `
  <div><br>
    <ul class="side-nav">
      <span class="side-nav__header">Menu</span>
      <li onclick="home()" class="side-nav__item">
       
        <span>Daskboard</span>
      </li>
      <li onclick="chat()"  class="side-nav__item   text-gray-400">
        
        <span>Chat</span>
      </li>
      <li onclick="grupos()" class="side-nav__item   dropdown text-gray-400">
       
        <span>Chat Grupos</span>
      </li>

      <li onclick="usuario()" class="side-nav__item   text-gray-400">
      
        <span>Configurações</span>
      </li>
      <li onclick="admin()" id="admin"  class="side-nav__item">
        
        <span>Admin</span>
      </li>
      <li onclick="noturno()" id="notur" class="side-nav__item">
        
      <span>Modo Noturno</span>
    </li>
    <li onclick="claro()" id="claro"  class="side-nav__item">
        
    <span>Modo Claro</span>
  </li>
    </ul>
  </div>
  <div class="profile-card">
  <div class="profile-image">
    <img src="../imgs/ft.png" alt="Foto de Perfil">
  </div>
  <div class="profile-info">
    <h3 class="profile-name">Aguardando</h3>
    <p class="profile-message">Recado do Perfil</p>
  </div>
</div>
<ul>   <li onclick="deslogar()" class="side-nav__item last-item">
        
<span>Deslogar</span>
</li>


</ul>

`;

document.querySelector("#menu").appendChild(sidebarDiv);
document.title = localStorage.getItem("empresa") + " | Connect Work", document.querySelector(".side-nav__header").innerText = "| " + localStorage.getItem("empresa") + " " + localStorage.getItem("nome")

if (window.innerWidth <= 768) {
    closemenu()
}

function closemenu() {
    const menu = document.querySelector("#menu");
    const closeBtn = document.querySelector(".closemenu");
    const openBtn = document.querySelector(".openmenu");
    const mainContent = document.querySelector(".bottom-container");
    document.querySelector(".user-name").style.display = 'block'
    mainContent.classList.remove("desfoque")
    menu.style.transition = "transform 0.3s ease";
    closeBtn.style.transition = "opacity 0.3s ease";
    openBtn.style.transition = "opacity 0.3s ease";

    menu.style.transform = "translateX(-100%)";
    setTimeout(() => {
        menu.style.display = 'none'
    }, 100);
    closeBtn.style.opacity = "0";
    openBtn.style.opacity = "1";
}

function openmenu() {
    document.querySelector(".user-name").style.display = 'none'
    const menu = document.querySelector("#menu");
    const closeBtn = document.querySelector(".closemenu");
    const openBtn = document.querySelector(".openmenu");
    const mainContent = document.querySelector(".bottom-container");

    if (window.innerWidth <= 768) {
        mainContent.classList.add("desfoque")

    }
    setTimeout(() => {
        menu.style.display = 'block'
    }, 100);
    menu.style.transition = "transform 0.3s ease";
    closeBtn.style.transition = "opacity 0.3s ease";
    openBtn.style.transition = "opacity 0.3s ease";

    menu.style.transform = "translateX(0)";
    closeBtn.style.opacity = "1";
    openBtn.style.opacity = "0";
}

document.querySelectorAll(".side-nav__item")[0].classList.add("side-nav__item-active");
//href


function home() {
    document.querySelector("#index").style.display = 'flex'
    document.querySelector("#chat").style.display = 'none'
    document.querySelector("#chatgrupo").style.display = 'none'
    document.querySelectorAll(".side-nav__item")[0].classList.add("side-nav__item-active");
    document.querySelectorAll(".side-nav__item")[1].classList.remove("side-nav__item-active");
    document.querySelectorAll(".side-nav__item")[2].classList.remove("side-nav__item-active");
    document.querySelectorAll(".side-nav__item")[3].classList.remove("side-nav__item-active");
}

function chat() {
    document.querySelector("#grupos").innerHTML = ''
    document.querySelector("#index").style.display = 'none'
    document.querySelector("#chat").style.display = 'block'
    document.querySelector("#chatgrupo").style.display = 'none'
    document.querySelectorAll(".side-nav__item")[1].classList.add("side-nav__item-active");
    document.querySelectorAll(".side-nav__item")[0].classList.remove("side-nav__item-active");
    document.querySelectorAll(".side-nav__item")[2].classList.remove("side-nav__item-active");
    document.querySelectorAll(".side-nav__item")[3].classList.remove("side-nav__item-active");
    setTimeout(() => {
        exibirusuarios()
    }, 100);

}

function grupos() {
    document.querySelector("#gruposlista").innerHTML = ''
    document.querySelector("#index").style.display = 'none'
    document.querySelector("#chat").style.display = 'none'
    document.querySelector("#chatgrupo").style.display = 'block'
    document.querySelectorAll(".side-nav__item")[2].classList.add("side-nav__item-active");
    document.querySelectorAll(".side-nav__item")[0].classList.remove("side-nav__item-active");
    document.querySelectorAll(".side-nav__item")[1].classList.remove("side-nav__item-active");
    document.querySelectorAll(".side-nav__item")[3].classList.remove("side-nav__item-active");

    setTimeout(() => {
        exibirgrupos()
    }, 100);
}

function usuario() {
    document.querySelector("#index").style.display = 'none'
    document.querySelector("#chat").style.display = 'none'
    document.querySelector("#chatgrupo").style.display = 'none'
    document.querySelectorAll(".side-nav__item")[3].classList.add("side-nav__item-active");
    document.querySelectorAll(".side-nav__item")[0].classList.remove("side-nav__item-active");
    document.querySelectorAll(".side-nav__item")[1].classList.remove("side-nav__item-active");
    document.querySelectorAll(".side-nav__item")[2].classList.remove("side-nav__item-active");
}
document.querySelector("#claro").style.display = 'none'
document.querySelector("#chatgrupo").style.display = 'none'

function noturno() {

    document.querySelector("#notur").style.display = 'none'
    document.querySelector("body").style.background = '#111827'
    document.querySelector("#claro").style.display = 'block'
    $('body').css('background-color', '#111827');

    $('.sidebarcss, .box, .section-header, .price, .profile-message, .side-nav__item').css({
        'background-color': '#1f2937',
        'color': '#fff'
    });

    $('.side-nav__header').css('color', 'white');

    setInterval(() => {
        document.querySelector(".swal2-popup").style.background = '#111827'
        document.querySelector(".swal2-popup").style.color = 'white'
    }, 100);
}

function claro() {
    document.querySelector("#notur").style.display = 'block'

    document.querySelector("#claro").style.display = 'none'
    $('body').css('background-color', '');
    $('.sidebarcss, .box, .section-header, .price, .profile-message, .side-nav__item').css({
        'background-color': '',
        'color': ''
    });
    $('.side-nav__header').css('color', '');

}
// Função para aplicar a alteração desejada