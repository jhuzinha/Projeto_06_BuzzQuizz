let acertos = 0;
let cliques = 0;
let idQuizz;
let quizz;

function comparador () { 
	return Math.random() - 0.5; 
}

function iniciarPagina () {
    window.scrollTo(0,0);
    teladeCarregamento();
    buscarQuizzes();
}

function listarQuizzes (response) {
    acertos = 0;
    quizzesObj = response.data;

    verificarExistenciaQuizzUsuario();

    const quizzes = document.querySelector(".all-quizzes .quizzes");
    quizzes.innerHTML = "";
    for (let i = 0; i < response.data.length; i++) {
        quizzes.innerHTML += `
        <figure class="quizz-figure" id="${response.data[i].id}" onclick="entrarQuizz(this)">
            <div class="gradient"></div>   
            <img class="quizz-image" src="${response.data[i].image}">
            <h4>${response.data[i].title}</h4>
        </figure>`;
    }
}

function buscarQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
    promise.then(listarQuizzes);
    promise.catch(function () {
        alert("Erro ao carregar quizzes!");
        window.location.reload();
    });
}

function conferirAcerto (resposta) {
    if (resposta.classList.contains("correto")) {
        return true;
    }
    return false;
}

function marcarResposta(campoRespostas, el) {
    const respostaCorreta = campoRespostas.querySelector(".correto");
    const respostasFalsas = campoRespostas.querySelectorAll(".falso");

    respostaCorreta.querySelector("p").style.color = "#009C22";

    for (let i = 0; i < respostasFalsas.length; i++) {
        respostasFalsas[i].querySelector("p").style.color = "#FF4B4B";
    }

    if (conferirAcerto(el)) {
        acertos++;
    }

    cliques++;
    console.log(acertos);
}

function removerClique (arrRespostas) {
    for (let i = 0; i < arrRespostas.length; i++) {
        arrRespostas[i].removeAttribute("onclick");
    }
}

function calcularNivel () {
    const perguntas = quizz.questions.length;
    const porcentagem = Math.round((acertos/perguntas)*100);
    let nivel;

    for (let i = 0; i < quizz.levels.length; i++) {
        if (porcentagem >= quizz.levels[i].minValue) {
            nivel = i;
        }
    }

    //Caso não haja um nível com minValue = 0;
    if (!nivel) {
        nivel = 0;
    }

    console.log(`nível ${nivel + 1}`);

    const resultadoObj = {porcentagem: porcentagem, nivelIndex: nivel};
    return resultadoObj;
}

function reiniciarQuizz () {
    acertos = 0;
    cliques = 0;
    window.scrollTo({top: 0, behavior: "smooth"});
    buscarQuizz(idQuizz);
    
}

function voltarTelaInicial () {
    quizz = "";
    idQuizz = 0;
    acertos = 0;
    cliques = 0;
    document.querySelector(".container-tela-1").classList.remove("hidden");
    document.querySelector(".tela-2").classList.add("hidden");
    window.scrollTo({top: 0});
    teladeCarregamento();
    buscarQuizzes();
}

function exibirResultado () {
    const resultado = calcularNivel();
    const nivel = quizz.levels[resultado.nivelIndex];
    const containerTela2 = document.querySelector(".container-tela-2");
    containerTela2.innerHTML += `
    <section class="quizz-results">
        <div class="results-title">
            <h5>${resultado.porcentagem}% de acerto: ${nivel.title}</h5>
        </div>
        <div class="level">
            <img src="${nivel.image}">
            <p>${nivel.text}</p>
        </div>
    </section>
    <section class="nav-buttons">
        <button class="button-restart" onclick="reiniciarQuizz()">Reiniciar Quizz</button>
        <button class="button-home" onclick="voltarTelaInicial()">Voltar para home</button>
    </section>`;

    setTimeout(function (){
        document.querySelector(".quizz-results").scrollIntoView({block: "center", behavior: "smooth"});
    }, 1900);
}

function scrollarPergunta (campoPergunta, todasPerguntas) {
    if (cliques === todasPerguntas.length) {
        exibirResultado();
        return;
    }

    for (let i = 0; i < todasPerguntas.length; i++) {
        if (campoPergunta === todasPerguntas[todasPerguntas.length - 1]) {
            return;
        }

        if (campoPergunta === todasPerguntas[i]) {
            setTimeout(function () {
                todasPerguntas[i+1].scrollIntoView({block: "center", behavior: "smooth"});
            }, 1900);
        }
    }
}

function selecionarResposta (el) {
    const campoRespostas = el.parentNode;
    const campoPergunta = campoRespostas.parentNode;
    const todasPerguntas = document.querySelectorAll(".question");
    const arrRespostas = campoRespostas.querySelectorAll("figure");

    for (let i = 0; i < arrRespostas.length; i++) {
        arrRespostas[i].style.opacity = "0.5";
    }
    el.style.opacity = "1";

    removerClique(arrRespostas);
    marcarResposta(campoRespostas, el);
    scrollarPergunta(campoPergunta, todasPerguntas);
}

function exibirQuizz (response) {
    quizz = response.data;
    const quizzBanner = document.querySelector(".quizz-banner");
    quizzBanner.innerHTML = "";
    quizzBanner.innerHTML += `
    <div class="gradient-banner"></div>
    <img src="${quizz.image}">
    <h2>${quizz.title}</h2>`;

    const containerTela2 = document.querySelector(".container-tela-2");
    containerTela2.innerHTML = "";
    for (let i = 0; i < quizz.questions.length; i++) {
    //Percorrendo as perguntas
        let respostas = ""; 
        quizz.questions[i].answers.sort(comparador);
        for (let j = 0; j < quizz.questions[i].answers.length; j++) {
            //Percorrendo as respostas da pergunta
            const ehCorreta = quizz.questions[i].answers[j].isCorrectAnswer;
            let estado;
            if (ehCorreta) {
                estado = "correto";
            } else {
                estado = "falso";
            }
            respostas += `
            <figure class="answer-item ${estado}" onclick="selecionarResposta(this)">
                <img src="${quizz.questions[i].answers[j].image}">
                <p class="answer-text">${quizz.questions[i].answers[j].text}</p>
            </figure>`; 
        }

        containerTela2.innerHTML += `
        <section class="question question-number-${i + 1}">
            <div class="question-title" style="background-color:${quizz.questions[i].color};">
                <h5>${quizz.questions[i].title}</h5>
            </div>
            <div class="answers">
                ${respostas}
            </div>
        </section>`;
    }
}

function buscarQuizz (id) {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/" + id);
    promise.then(exibirQuizz);
}

function entrarQuizz (el) {
    window.scrollTo(0,0);
    teladeCarregamento();
    document.querySelector(".container-tela-1").classList.add("hidden");
    document.querySelector(".successQuizz").classList.add("hidden");
    document.querySelector(".tela-2").classList.remove("hidden");
    idQuizz = el.getAttribute("id");
    console.log(idQuizz);

    buscarQuizz(idQuizz);
}

function redirecionarCriacao () {
    teladeCarregamento();
    document.querySelector(".container-tela-1").classList.add("hidden");
    document.querySelector(".infoQuizz").classList.remove("hidden");
}

//  Quizzes do usuário

function verificarExistenciaQuizzUsuario () {
    //Se houver algum quizz no local storage, o html deverá ser alterado
    const quizzesUsuarioVazio = document.querySelector(".empty-user-quizzes");
    const quizzesUsuarioPreenchido = document.querySelector(".filled-user-quizzes");

    if (localStorage.length === 0) {
        quizzesUsuarioVazio.classList.remove("hidden");
        quizzesUsuarioPreenchido.classList.add("hidden");
    }
    if (localStorage.length != 0) {
        listarQuizzesUsuario();
        quizzesUsuarioVazio.classList.add("hidden");
        quizzesUsuarioPreenchido.classList.remove("hidden");
    }
}

function exibirQuizzesUsuario (response) {
    document.querySelector(".filled-user-quizzes .quizzes").innerHTML += `
    <figure class="quizz-figure" id="${response.data.id}" onclick="entrarQuizz(this)">
        <div class="gradient"></div>   
        <img class="quizz-image" src="${response.data.image}">
        <h4>${response.data.title}</h4>
    </figure>`;
}

function listarQuizzesUsuario () {

    const quizzesDoUsuario = document.querySelector(".filled-user-quizzes .quizzes");
    quizzesDoUsuario.innerHTML = "";

    const quizzesUsuario = JSON.parse(localStorage.getItem("quizzesUsuario"));
    console.log(quizzesUsuario);

    for (let i = 0; i < quizzesUsuario.length; i++) {
        const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/" + quizzesUsuario[i]);
        promise.then(exibirQuizzesUsuario);
    }
}

//Essa função vai na promise.then do quizz criado
function quizzCriadoSucesso (response) {
    salvarLocalStorage(response.data.id);
    renderizarSucessoQuizz(response.data);
}

function salvarLocalStorage (idQuizzCriado) {
    let quizzesUsuario;
    
    //Buscar a lista de quizzes criados pelo usuário
    if (!localStorage.getItem("quizzesUsuario")) {
        //Se não houver quizz, criar uma array vazia;
        quizzesUsuario = [];
    } else {
        //Se houver algum quizz, transformar a string em array;
        quizzesUsuario = JSON.parse(localStorage.getItem("quizzesUsuario"));
    }

    //Adicionar o quizz ao local storage
    quizzesUsuario.push(idQuizzCriado);
    localStorage.setItem("quizzesUsuario", JSON.stringify(quizzesUsuario));
}


function teladeCarregamento(){
    const pagCarremento = document.querySelector(".telaCarregamento")
    pagCarremento.classList.remove("hidden")
    document.querySelector("html").style.overflow = "hidden"
    setTimeout(() => {pagCarremento.classList.add("hidden"); document.querySelector("html").style.overflow = "auto" }, 3000)
}

iniciarPagina();





