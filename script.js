// BASICO
const main = document.getElementById("main");
const extraKenzie = document.getElementById("extraKenzie");
const msg = document.getElementById("msg");
const movimentos = document.getElementById("movimentos");
const divBase = document.getElementById("base");
const instrutions = document.getElementById("instrutions");

// CRIAÇÃO DAS TORRES
function criarTorres() {
  for (let i = 1; i <= 3; i++) {
    const torre = document.createElement("div");
    torre.classList.add("torre");
    torre.id = "torre" + i;
    main.appendChild(torre);
  }
}

// CRIAÇÃO DOS BLOCOS
function criarBlocos(n) {
  for (let i = 0; i < n; i++) {
    const bloco = document.createElement("div");
    bloco.classList.add("bloco");
    bloco.id = "bloco" + i;
    torre1.appendChild(bloco);
  }
}

// BOTAO NIVEIS DE DIFICULDADE
const tresDiscos = document.getElementById("tresDiscos");
const quatroDiscos = document.getElementById("quatroDiscos");
const cincoDiscos = document.getElementById("cincoDiscos");
const resultsDiv = document.getElementById("results");

const desabilitarBotoes = () => {
  tresDiscos.disabled = true;
  quatroDiscos.disabled = true;
  cincoDiscos.disabled = true;
};

// FUNÇÃO DO DESABILITADO PARA NAO FICAR REPETITIVO
let discos = 2;

tresDiscos.addEventListener("click", function () {
  discos = 3;
  desabilitarBotoes();
  resultsDiv.innerHTML = criarBlocos(3);
});
quatroDiscos.addEventListener("click", function () {
  discos = 4;
  desabilitarBotoes();
  resultsDiv.innerHTML = criarBlocos(4);
});
cincoDiscos.addEventListener("click", function () {
  discos = 5;
  desabilitarBotoes();
  resultsDiv.innerHTML = criarBlocos(5);
});

// RENICIAR O JOGO SEM SAIR DA PÁGINA
const btnRestart = document.getElementById("btn-restart");
const reiniciarJogo = () => {
  torres.forEach((item) => {
    item.innerHTML = "";
  });

  msg.innerText = "";
  count = 0;
  movimentos.innerText = `Movimentos: ${count}`;

  criarBlocos();
  clearInterval(cronometro);
  time();
  main.style.pointerEvents = "visible";
  msg.style.padding = 0;

  tresDiscos.disabled = false;
  quatroDiscos.disabled = false;
  cincoDiscos.disabled = false;
};
btnRestart.addEventListener("click", reiniciarJogo);

// BOTAO DE INICIAR O JOGO + CONTAR OS MOVIMENTOS
const btnStart = document.getElementById("btn-start");
const iniciarJogo = () => {
  btnStart.style.display = "none";
  btnRestart.style.display = "inline-block";
  extraKenzie.style.display = "block";
  divBase.style.display = "block";
  criarTorres();
  criarBlocos();
  movimentos.innerText = `Movimentos: ${count}`;

  torres = document.querySelectorAll(".torre");
  torres.forEach((item) => {
    item.addEventListener("click", escolhaTorre);
  });

  time();
  hiddenInstrutions();
};

function hiddenInstrutions() {
  instrutions.classList.add("hidden");
}

btnStart.addEventListener("click", iniciarJogo);

// LÓGICA DO JOGO
let blocoAtual = "";
let count = 0;

function escolhaTorre(e) {
  const torreEscolhida = e.currentTarget;
  validaJogada(torreEscolhida);
}
function validaJogada(torreEscolhida) {
  if (blocoAtual === "" && torreEscolhida.childElementCount !== 0) {
    blocoAtual = torreEscolhida.firstElementChild;
  }
  if (blocoAtual === "" && torreEscolhida.childElementCount === 0) {
    mensagemErr();
  }
  if (torreEscolhida.childElementCount === 0) {
    torreEscolhida.insertAdjacentElement("afterbegin", blocoAtual);
    count++;
    blocoAtual = "";
  }
  if (torreEscolhida.firstElementChild.clientWidth > blocoAtual.clientWidth) {
    torreEscolhida.insertAdjacentElement("afterbegin", blocoAtual);
    count++;
    blocoAtual = "";
  }
  if (torreEscolhida.firstElementChild.clientWidth < blocoAtual.clientWidth) {
    mensagemErr();
    blocoAtual = "";
  }
  //CONTADOR DE MOVIMENTOS EXECUTADOS
  movimentos.innerText = `Movimentos: ${count}`;
  final();
}

// CONFIGURAÇÃO DE MENSAGENS (DE ERRO E FINAL)
const mensagemErr = () => {
  alert("MOVIMENTO PROIBIDO!!!");
  msg.style.color = "white";
  msg.style.backgroundColor = "red";

  setTimeout(() => {
    msg.innerText = "";
  }, 1000);
};
const mensagemFinal = () => {
  msg.innerHTML = "VITÓRIA!!!";
  msg.style.color = "gold";
  msg.style.backgroundColor = "black";
  msg.style.padding = 20 + "px";
  msg.style.border = "double";
};
// MENSAGEM FINAL DO VENCEDOR
const final = () => {
  if (torres[2].childElementCount === discos) {
    mensagemFinal();
    main.style.pointerEvents = "none";
    clearInterval(cronometro);
  }
};

//CRONOMETRO
const timeContent = document.getElementById("time-content");
let cronometro;

const time = () => {
  let minuto = 0;
  let segundo = 0;
  let cent = 0;

  cronometro = setInterval(() => {
    cent++;
    if (cent === 99) {
      segundo++;
      cent = 0;
      if (segundo === 59) {
        minuto++;
        segundo = 0;
      }
    }

    showTime(minuto, segundo, cent);
  }, 10);
};

const showTime = (min, seg, cen) => {
  if (cen < 10 && seg < 10 && min < 10) {
    timeContent.innerText = `0${min} : 0${seg}`;
  } else if (cen >= 10 && seg < 10 && min < 10) {
    timeContent.innerText = `0${min} : 0${seg}`;
  } else if (cen >= 10 && seg >= 10 && min < 10) {
    timeContent.innerText = `0${min} : ${seg}`;
  } else if (cen >= 10 && seg >= 10 && min >= 10) {
    timeContent.innerText = `${min} : ${seg}`;
  }
};
