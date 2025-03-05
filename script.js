let meses = {
    'Janeiro': 0,
    'Fevereiro': 1,
    'Março': 2,
    'Abril': 3,
    'Maio': 4,
    'Junho': 5,
    'Julho': 6,
    'Agosto': 7,
    'Setembro': 8,
    'Outubro': 9,
    'Novembro': 10,
    'Dezembro': 11
};

let botaoEnviar = document.getElementById('enviar');
const dataAtual = new Date();

let anoAtual = dataAtual.getFullYear();
let mesAtual = dataAtual.getMonth(); 
let diaAtual = dataAtual.getDate();

let textoDia = document.getElementById('dia')
let textoMes = document.getElementById('mes')
let textoAno = document.getElementById('ano')

function showCustomAlert(mensagem) {
    document.getElementById("myModal").style.display = "block";
    document.getElementById('mensagemAlerta').innerText = `${mensagem}`;
}

function closeCustomAlert() {
    document.getElementById("myModal").style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        closeCustomAlert('teste');
    }
}

const imgSol = 'imgs/SOL.png'
const imgLua = 'imgs/LUA.png'

let imagem = document.getElementById('img')
let botaoDark = document.getElementById('buttonDark')

let isDark = false;

document.body.style.backgroundColor = isDark ? "#2c3e50" : "#fff";

botaoDark.addEventListener('click', () => {
    if (imagem.src.includes(imgLua)) {
        // Modo Dark ativado
        imagem.src = imgSol;
        document.body.style.backgroundColor = "#333";
        botaoEnviar.style.backgroundColor = "#fff";
        botaoEnviar.style.color = "black"

        textoDia.style.color = '#fff'
        textoMes.style.color = '#fff'
        textoAno.style.color = '#fff'

        isDark = true
    } else {
        // Modo Light ativado
        imagem.src = imgLua;
        document.body.style.backgroundColor = "#fff";
        botaoEnviar.style.backgroundColor = "#333";
        botaoEnviar.style.color = "#fff"

        textoDia.style.color = '#000'
        textoMes.style.color = '#000'
        textoAno.style.color = '#000'

        isDark = false
    }
})

botaoEnviar.addEventListener("click", () => {
    let diaEscolhido = document.querySelector('#diaEscolha').value;
    let mesEscolhido = document.querySelector('#mesEscolha').value;
    let anoEscolhido = document.querySelector('#anoEscolha').value;

    let mesEscolhidoNumero = meses[mesEscolhido]

    if (!anoEscolhido || anoEscolhido <= 0){
        showCustomAlert('Insira um ano válido!');
        return;
    }
    if (anoEscolhido > anoAtual || 
        (anoEscolhido == anoAtual && mesEscolhidoNumero > mesAtual) || 
        (anoEscolhido == anoAtual && mesEscolhidoNumero == mesAtual && diaEscolhido > diaAtual)) {
        showCustomAlert('Essa data é no futuro');
        return;
    }

    let anosPassados = anoAtual - anoEscolhido;
    let mesesPassados = mesAtual - mesEscolhidoNumero;
    let diasPassados = diaAtual - diaEscolhido;

    // Ajustar a diferença de meses e dias
    if (mesesPassados < 0) {
        mesesPassados += 12;
        anosPassados--;
    }
    if (diasPassados < 0) {
        let ultimoDiaDoMes = new Date(anoAtual, mesAtual, 0).getDate(); // Último dia do mês atual
        diasPassados += ultimoDiaDoMes;
        mesesPassados--;
        if (mesesPassados < 0) {
            mesesPassados += 12;
            anosPassados--;
        }
    }
    let dataEscolhida = new Date(anoEscolhido, mesEscolhidoNumero, diaEscolhido);

    let diferencaTempo = dataAtual - dataEscolhida; 

    let diasPassadosTotais = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));


    let mensagem = `Data escolhida: ${diaEscolhido} de ${mesEscolhido} de ${anoEscolhido}. ` +
                `Tempo desde a data escolhida: ${anosPassados} anos, ` +
                `${mesesPassados} meses e ${diasPassados} dias. ` + 
                `Ou, ${diasPassadosTotais} dias totais.`;

    showCustomAlert(mensagem);

});
