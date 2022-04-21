let quizzesObj = [];

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

function exibirQuizz (quizz) {

    const tela2 = document.querySelector(".tela-2");
    tela2.innerHTML = `
    

    `;


}

function entrarQuizz (el) {
    document.querySelector(".container-tela-1").classList.add("hidden");
    document.querySelector(".tela-2").classList.remove("hidden");
    const idQuizz = el.getAttribute("id");
    //console.log(idQuizz);

    const quizz = quizzesObj.filter((quizz) => quizz.id == idQuizz)[0];
    console.log(quizz);
}

buscarQuizzes();