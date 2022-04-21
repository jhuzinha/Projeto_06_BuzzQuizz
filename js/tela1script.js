let quizzesObj = [];

function comparador () { 
	return Math.random() - 0.5; 
}

function listarQuizzes (response) {
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

function selecionarResposta (el) {

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
            <figure class="answer-item ${estado}">
                <img src="${quizz.questions[i].answers[j].image}">
                <p class="answer-text">${quizz.questions[i].answers[j].text}</p>
            </figure>`; 
        }

        containerTela2.innerHTML += `
        <section class="question">
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