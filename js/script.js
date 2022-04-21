let questionarioAberto = '';
let verificador = false;
let criandoQuiz = { 
                    title: '',
                    image: '',
                    questions: [],
                    levels: []
                                    }

// TELA 3 - BOTOES

function verificaParaQualTelaVai(proximaPag){
    if (proximaPag === '.questionsQuizz'){telaInicialQuiz(); renderizarTelaQuestionario();}
}


function trocarTela(elemento, proximaPag){
    verificaParaQualTelaVai(proximaPag)
    // if (proximaPag === '.levelQuizz'){}
    if (verificador === false){
        return 
    }
    verificador = false;
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

function verificaTitulo(input) {
    const minCaracteres = 20;
    const maxCaracteres = 65;
    if ((input.length <= minCaracteres) || (input.length >= maxCaracteres)){
        return false;
    }
    return true;
}

function verificaURL(input){
    const tiposImagem1 = input.includes("jpg")
    const tiposImagem2 = input.includes("jpeg")
    const tiposImagem3 = input.includes("png")
    const tiposImagem4 = input.includes("svg")
    const tiposImagem5 = input.includes("bitmap")
    const tiposImagem6 = input.includes("gif")

    if (tiposImagem1 || tiposImagem2 || tiposImagem3 || tiposImagem4 || tiposImagem5|| tiposImagem6){
        return true;
    }
    return false;
    
}

function verificaQuantidadeQuestoes(input){
    const numMinQuestoes = 3;
    if (input >= numMinQuestoes){
        return true;
    }
    return false;
}

function verificaQuantidadeNiveis(input){
    const numMinNiveis = 2;
    if (input >= numMinNiveis){
        return true;
    }
    return false;  
}

function verificaTela1(quantidadeQuestoes, quantidadeNiveis, titulo, URL){
    if (verificaQuantidadeQuestoes(quantidadeQuestoes) && verificaQuantidadeNiveis(quantidadeNiveis) && verificaTitulo(titulo) && verificaURL(URL)){
        console.log('aaaaaaaaaaaaaa')
        verificador = true;
        return
    }
    else{
        alert ("PREENCHA OS CAMPOS CORRETAMENTE")
    }
}

function telaInicialQuiz() {
    const divPai = document.querySelector(".infoAnswers div")
    const titulo = divPai.querySelector("input:nth-child(1)").value;
    criandoQuiz.title = titulo
    const URL= divPai.querySelector("input:nth-child(2)").value;
    criandoQuiz.image = URL
    const quantidadeQuestoes = divPai.querySelector("input:nth-child(3)").value;
    const quantidadeNiveis = divPai.querySelector("input:nth-child(4)").value;
    verificaTela1(quantidadeQuestoes, quantidadeNiveis, titulo, URL);
    console.log(criandoQuiz)
}

function renderizarTelaQuestionario(){
    const divPai = document.querySelector(".infoAnswers div");
    const quantidadeQuestoes = divPai.querySelector("input:nth-child(3)").value;
    const divPaiQuestions = document.querySelector(".container-questoes");
    divPaiQuestions.innerHTML = '' ;
    for (let i = 0; quantidadeQuestoes > i; i++){
        divPaiQuestions.innerHTML += `
    <li>
        <div class="questionNumber">
            <h3>Pergunta ${i + 1} </h3>
            <img  onclick= "abrindoQuestionario(this)" src="imagens/edit.png" alt="">
        </div>
        <div class="answersQuizz hidden">
            <input placeholder="Texto da pergunta  "type="text">
            <input placeholder="Cor de fundo da pergunta  "type="color">
            <h3>Resposta correta</h3>
            <input placeholder="Resposta correta  "type="text">
            <input placeholder="URL da imagem  "type="url">
            <h3>Resposta incorretas</h3>
            <input placeholder="Resposta incorreta 1  "type="text">
            <input placeholder="URL da imagem 1  "type="url">
            <input class="dividerAnswers" placeholder="Resposta incorreta 2  "type="text">
            <input placeholder="URL da imagem 2  "type="url">
            <input class="dividerAnswers" placeholder="Resposta incorreta 3  "type="text">
            <input placeholder="URL da imagem 3  "type="url">
        </div>
    </li>`
    }
}
