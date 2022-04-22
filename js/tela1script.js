let quizzesObj = [];
let acertos = 0;

function comparador () { 
	return Math.random() - 0.5; 
}

function listarQuizzes (response) {
    acertos = 0;
    quizzesObj = response.data;
    console.log(quizzesObj);

    const quizzes = document.querySelector(".all-quizzes .quizzes");
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
    console.log(acertos);
}

function removerClique (arrRespostas) {
    for (let i = 0; i < arrRespostas.length; i++) {
        arrRespostas[i].removeAttribute("onclick");
    }
}

function selecionarResposta (el) {
    const campoRespostas = el.parentNode;
    const arrRespostas = campoRespostas.querySelectorAll("figure");
    for (let i = 0; i < arrRespostas.length; i++) {
        arrRespostas[i].style.opacity = "0.5";
    }
    el.style.opacity = "1";

    removerClique(arrRespostas);
    marcarResposta(campoRespostas, el);
}

function exibirQuizz (quizz) {
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

function entrarQuizz (el) {
    document.querySelector(".container-tela-1").classList.add("hidden");
    document.querySelector(".tela-2").classList.remove("hidden");
    const idQuizz = el.getAttribute("id");
    //console.log(idQuizz);

    const quizz = quizzesObj.filter((quizz) => quizz.id == idQuizz)[0];
    //console.log(quizz);
    window.scrollTo(0, 0);
    exibirQuizz(quizz);
}

buscarQuizzes();