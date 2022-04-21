let questionarioAberto = '';

// TELA 3 - BOTOES

function trocarTela(elemento, proximaPag){
    const paiElemento = elemento.parentNode;
    paiElemento.classList.add("hidden")
    const perguntasQuizz = document.querySelector(proximaPag)
    perguntasQuizz.classList.remove("hidden")
}

function abrindoQuestionario(elemento){
    elemento.classList.add("hidden");
    const paiElemento2 = elemento.parentNode.parentNode;
    segundaDiv = paiElemento2.querySelector("div:nth-child(2)").classList.remove("hidden");
    if (questionarioAberto !== elemento && questionarioAberto !== ''){
        questionarioAberto.classList.remove("hidden");
        const paiElemento1 = questionarioAberto.parentNode.parentNode;
        adicionarSegundaDiv = paiElemento1.querySelector("div:nth-child(2)").classList.add("hidden");
    }
    questionarioAberto = elemento;
}

