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
    if (proximaPag === '.questionsQuizz'){renderizarTelaQuestionario(); telaInicialQuiz()}
    if (proximaPag === '.levelQuizz') {renderizarTelaNiveis();
        telaQuestionario()}
    if (proximaPag === '.successQuizz') {
        // renderizarSucessoQuizz(); 
        telaNiveis();
    }
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
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(input);
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

}

function renderizarTelaQuestionario(){
    const divPai = document.querySelector(".infoAnswers div");
    const quantidadeQuestoes = divPai.querySelector("input:nth-child(3)").value;
    let divPaiQuestions = document.querySelector(".container-questoes");
    divPaiQuestions.innerHTML = '';
    for (let i = 0; quantidadeQuestoes > i; i++){
        divPaiQuestions.innerHTML += `
    <li class= "subcontainer${i+1}">
        <div class="questionNumber">
            <h3>Pergunta ${i + 1} </h3>
            <img  onclick= "abrindoQuestionario(this)" src="imagens/edit.png" alt="">
        </div>
        <div class="answersQuizz hidden">
            <input placeholder="Texto da pergunta  "type="text">
            <input placeholder="Cor de fundo da pergunta  "type="color">
            <div class="correctAnswer answer"> 
                <h3>Resposta correta</h3>
                <input placeholder="Resposta correta  "type="text">
                <input placeholder="URL da imagem  "type="url">
            </div>
            <div class="wrongAnswer">
                <h3>Resposta incorretas</h3>
                <div class="answer">
                    <input placeholder="Resposta incorreta 1  "type="text">
                    <input placeholder="URL da imagem 1  "type="url">
                </div>
                <div class="answer">
                    <input class="dividerAnswers" placeholder="Resposta incorreta 2  "type="text">
                    <input placeholder="URL da imagem 2  "type="url">
                </div>
                <div class="answer">
                    <input class="dividerAnswers" placeholder="Resposta incorreta 3  "type="text">
                    <input placeholder="URL da imagem 3  "type="url">
                </div>
            </div>
        </div>
    </li>`
    }

}


function telaQuestionario(){
    const divPai = document.querySelector(".infoAnswers div");
    const quantidadeQuestoes = divPai.querySelector("input:nth-child(3)").value;
    let questao;
    let respostas;
    criandoQuiz.questions = []

    for (let i= 0; quantidadeQuestoes > i; i++){
        let container = document.querySelector(`.subcontainer${i+1}`)
        let titulo = container.querySelector("input:nth-child(1)").value;
        let cor = container.querySelector("input:nth-child(2)").value;
        const respostaCorreta = container.querySelector(".correctAnswer");
        const respostaFalsa = container.querySelector(".wrongAnswer");
        questao = {
                title: titulo, 
                color: cor,
                answers: []
                }

        if (verificarTextoPergunta(titulo)){
                criandoQuiz.questions.push(questao)
            }else {
                return alert("preencha os campos corretamente")
            }
        for (let j=0; container.querySelectorAll(".answer").length > j; j++){
            let textoRespostaCorreta = respostaCorreta.querySelector("input:nth-child(2)").value;
            let urlRespostaCorreta = respostaCorreta.querySelector("input:nth-child(3)").value;

            if (j===0){
            respostas = {
                text: textoRespostaCorreta,
                image: urlRespostaCorreta,
                isCorrectAnswer: true
            }
                if (verificaUmouOutropreenchido(textoRespostaCorreta,  urlRespostaCorreta)) {
                    criandoQuiz.questions[i].answers.push(respostas)
                }
            } else {
                let textoRespostaFalsa1 = respostaFalsa.querySelector(`div:nth-child(${j+1})`);
                let textofalso = textoRespostaFalsa1.querySelector("input:nth-child(1)").value;
                let urlfalso = textoRespostaFalsa1.querySelector("input:nth-child(2)").value;

                respostas = {
                    text: textofalso,
                    image: urlfalso,
                    isCorrectAnswer: false
                }
                if (verificaUmouOutropreenchido(textofalso, urlfalso)) {
                    criandoQuiz.questions[i].answers.push(respostas)
                }
            }
        
        }
        console.log(criandoQuiz)
        if (criandoQuiz.questions[i].answers.length < 2){
            return alert("Preencha os campos corretamente")
        }
    }
    verificador = true;
}

function verificaResposta(text, url) {
    if (text !== '' && url !== ''){
        return true
    }
    return false
}

function verificarTextoPergunta(input){
    if (input.length < 20){
        return false
    }
    return true
}


function verificaUmouOutropreenchido(resposta, url){
    if (resposta !== '' && verificaURL(url)){
        return true;
    }
    return false;
}

function renderizarTelaNiveis(){
    const divPai = document.querySelector(".infoAnswers div");
    const quantidadeNiveis = divPai.querySelector("input:nth-child(4)").value;
    let containerNiveis = document.querySelector(".container-niveis");
    containerNiveis.innerHTML = '';
    for (let z = 0; quantidadeNiveis > z; z++){
        console.log(z)
        containerNiveis.innerHTML += `            
        <li class="container${z+1}  ">
            <div class="questionNumber">
                <h3>Nível ${z+1} </h3>
                <img class= "hidden"  onclick= "" src="imagens/edit.png" alt="">
            </div>
            <div class="levelAnswersQuizz">
                <input placeholder="Título do nível"type="text">
                <input placeholder="% de acerto mínima  "type="numeric">
                <input placeholder="URL da imagem do nível  "type="url">
                <input  class= "descricao" placeholder="Descrição do nível  "type="text">
            </div>
        </li>`
    }

}

function telaNiveis(){
    console.log("oi")
    criandoQuiz.levels = []
    const divPai = document.querySelector(".infoAnswers div");
    const quantidadeNiveis = divPai.querySelector("input:nth-child(4)").value;
    for (let i = 0; quantidadeNiveis > i; i++){
        const respostasniveis = document.querySelector(`.container${i+1}`)
        let titulo = respostasniveis.querySelector("input:nth-child(1)").value;
        let porcentagem = respostasniveis.querySelector("input:nth-child(2)").value;
        let url = respostasniveis.querySelector("input:nth-child(3)").value;
        let descricao = respostasniveis.querySelector("input:nth-child(4)").value;
        niveis = {
                title: titulo,
				image: url,
				text: descricao,
				minValue: porcentagem
        }
        console.log("sla")

        if (verificaDescricaoNiveis(descricao) && verificaPorcentagemNiveis(porcentagem) && verificaURL(url) && varificaVazio(titulo, url, descricao, porcentagem)){
            criandoQuiz.levels.push(niveis);
            console.log("ok")
        } else { 
            return alert("preencha corretamente os campos")
        }
    }
    if (verificaPorcentagemZero(quantidadeNiveis)){
        verificador = true;
        publicarQuiz()
    }else {
        alert("Pelo menos um dos campos porcentagem deve ser 0")
    }
}

function varificaVazio(titulo, url, descricao, porcentagem){
    if (titulo !==  '' && verificaURL(url) && descricao !== '' && porcentagem !== ''){
        return true;
    }

}

function verificaTituloNiveis(input){
    if (input.length < 10 || input === ''){
        return false;
    }
    return true;
}

function verificaPorcentagemNiveis(input){
    input = Number(input)
    if (Number(input) > 100 || Number(input) < 0 || input === ''  || !Number.isInteger(input)) {
        return false;
    }
    return true;
}

function verificaDescricaoNiveis(input){
    if (input.length < 30 || input === ''){
        return false
    }
    return true;
}

function verificaPorcentagemZero(quantidadeNiveis){
    for (let i = 0; quantidadeNiveis > i; i++){
        console.log(criandoQuiz.levels[i].minValue)
        if (criandoQuiz.levels[i].minValue === '0'){
            return true;
        }
    }
}


function limpaVariavel(){
    questionarioAberto = '';
    verificador = false;
    criandoQuiz = { 
                    title: '',
                    image: '',
                    questions: [],
                    levels: []
                                    }
    let inputs = document.querySelectorAll("input");
    for (let i = 0; inputs.length > i; i++){
        inputs[i].value = ''
    }                                
}

function renderizarSucessoQuizz(quizzCriado){
    teladeCarregamento()
    verificador = true;
    const containerSucesso = document.querySelector(".successQuizz figure");
    containerSucesso.setAttribute("id", quizzCriado.id);
    containerSucesso.setAttribute("onclick", "entrarQuizz(this)");
    containerSucesso.innerHTML =   `
        <div class="gradient"></div>
        <img src="${quizzCriado.image}" alt="">
        <h4> ${quizzCriado.title} </h4>`;
    buscarQuizzes();
}

function publicarQuiz() {
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", criandoQuiz)
    promise.then(quizzCriadoSucesso);
}

function acessarQuizzCriado () {
    const el = document.querySelector(".successQuizz figure");
    entrarQuizz(el);
    console.log("chamei");
}