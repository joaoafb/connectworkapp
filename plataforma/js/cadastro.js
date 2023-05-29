const firebaseConfig = { apiKey: "AIzaSyBKa-Bs_f_Jg80zzeRlMLzrTH_0oWP3Jdo", authDomain: "connectwork-c13b2.firebaseapp.com", projectId: "connectwork-c13b2", storageBucket: "connectwork-c13b2.appspot.com", messagingSenderId: "407759011685", appId: "1:407759011685:web:625201a9a6e0b35aba6b8c", measurementId: "G-TC7VG0QJVX" };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(),
    skillsInput = document.getElementById("skills"),
    skills = skillsInput.value.split(",");

function cadastro() { puxarempresas(), verificarusuario(), verificarsenha() }

function obterParteDoLinkAposHash() { try { let e = window.location.href,
            a = e.indexOf("#"); if (-1 !== a) return e.substring(a + 1); return "" } catch (t) { return Swal.fire("Algo deu errado!", "Solicite outro link para cadastro.", "error"), "" } }
try { let e = obterParteDoLinkAposHash();
    document.querySelector("#empresa").value = e, "" == e && (Swal.fire("Algo deu errado!", "Solicite outro link para cadastro.", "error"), setTimeout(() => { document.body.style.display = "none", document.write("Solicite um novo link ao responsavel pela plataforma em sua empresa. Att ConnectWork") }, 5e3)) } catch (a) { console.error("Erro ao atribuir valor ao elemento 'empresa':", a) }

function puxarempresas() { db.collection("empresas").get().then(e => { e.forEach(e => { var a = document.createElement("option");
            a.textContent = e.data().nome, document.querySelector("#listempresas").appendChild(a) }) }) }

function verificarusuario() { document.getElementById("usuario").addEventListener("input", e => { e.target.value, db.collection(empresa.value + "usuarios").where("usuario", "==", usuario.value).get().then(e => { e.forEach(e => { console.log("Esse Usuario Ja Existe"), document.querySelector("#alertuser").style.display = "block" }) }).catch(e => { console.log("Usuario OK") }) }) }

function verificarsenha() { resenha.addEventListener("input", e => { e.target.value, resenha.value != senha.value ? document.querySelector("#resenhalabel").style.display = "block" : document.querySelector("#resenhalabel").style.display = "none" }) }
document.getElementById("form-cadastro").addEventListener("submit", function(e) { e.preventDefault(); var a = document.getElementById("nome"),
        t = document.getElementById("email"),
        o = document.getElementById("senha");
    document.getElementById("resenha"); var r = document.getElementById("usuario"),
        n = document.getElementById("contato"),
        l = document.getElementById("empresa"),
        i = document.getElementById("cargo"),
        s = document.getElementById("setor"),
        u = document.getElementById("descricao"),
        c = document.getElementById("skills"),
        d = document.getElementById("skillstwo");
    firebase.auth().createUserWithEmailAndPassword(t.value, o.value).then(function(e) { e.user.updateProfile({ displayName: a.value }).then(function() { let e = firebase.firestore.Timestamp.now(),
                o = function e(a) { let t = a.toDate(),
                        o = t.getHours().toString().padStart(2, "0"),
                        r = t.getMinutes().toString().padStart(2, "0"),
                        n = t.getSeconds().toString().padStart(2, "0"); return `${o}:${r}:${n}` }(e);
            console.log(o); let m = firebase.firestore();
            m.collection(l.value + "usuarios").add({ nome: a.value, email: t.value, usuario: r.value, contato: n.value, empresa: l.value, cargo: i.value, setor: s.value, descricao: u.value, habilidadesp: c.value, habilidadess: d.value, data: o, status: "offline", pontos: 0 }).then(function(e) { console.log("Documento adicionado com ID:", e.id), location.href = "login.html" }).catch(function(e) { console.error("Erro ao adicionar documento:", e) }), m.collection("usuarios").add({ nome: a.value, email: t.value, usuario: r.value, contato: n.value, empresa: l.value, cargo: i.value, setor: s.value, descricao: u.value, habilidadesp: c.value, habilidadess: d.value, data: o, status: "offline", pontos: 0 }).then(function(e) { console.log("Documento adicionado com ID:", e.id), location.href = "login.html" }).catch(function(e) { console.error("Erro ao adicionar documento:", e) }), console.log("Usu\xe1rio cadastrado com sucesso!") }).catch(function(e) { console.error(e) }) }).catch(function(e) { console.error(e) }) });