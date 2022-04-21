function listarQuizzes (response) {
    console.log(response.data);
    const quizzes = document.querySelector(".all-quizzes .quizzes");
    for (let i = 0; i < response.data.length; i++) {
        quizzes.innerHTML += `
        <figure class="quizz-figure">
            <div class="gradient"></div>   
            <img class="quizz-image" src="${response.data[i].image}">
            <h4>${response.data[i].title}</h4>
        </figure>`;
        quizzes.innerHTML += `
        <figure class="quizz-figure">
            <div class="gradient"></div>   
            <img class="quizz-image" src="${response.data[i].image}">
            <h4>${response.data[i].title}</h4>
        </figure>`;
        quizzes.innerHTML += `
        <figure class="quizz-figure">
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

buscarQuizzes();