/* delcara a constante cartas como a classe card e as variaeis que vão determinar qual carta está sendo virada, a primeira carta da jogada, a segunda e a pontuação(points)*/
const cartas = document.querySelectorAll(".card");
let cartaVirada = false;
let firstCard, secondCard, points;
let congelarJogo = false;

function virar() {
  if (congelarJogo) return;

  /*o objeto selecionado vai ter sua classe adicionada o termo 'vira' assim que a function for ativada*/
  this.classList.add("vira");

  if (!cartaVirada) {
    cartaVirada = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  cartaVirada = false;
  igualdade();
}

function igualdade() {
  /*se o data-card da first card e da second card forem iguais, a função irá desabilitar as cartas do jogo e somar 1 à pontuação*/
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards();
    points += 1;
    return;
  }

  desvirar();
}
/*a função irá inativar as cartas no jogo retirando o ouvidor de eventos do objeto após serem combinadas com seu respectivo par*/
function disableCards() {
  firstCard.removeEventListener("click", virar);
  secondCard.removeEventListener("click", virar);
  reset();
}

/*retirar a classe 'vira' do objeto, fazendo ela retornar face abaixo*/
function desvirar() {
  congelarJogo = true;

  setTimeout(() => {
    firstCard.classList.remove("vira");
    secondCard.classList.remove("vira");
    reset();
  }, 700);
}
/*para cada carta um ouvidor de eventos 'click' que irá executar a function 'virar' quando exigida*/
cartas.forEach((card) => {
  card.addEventListener("click", virar);
});

/*tentando fazer executar uma menssagem de congratulação quando o usuario terminar o jogo ainda sem conseguir fazer funcionar.*/
if (points === 6) {
  window.alert("parabens vc ganhou");
}

function reset() {
  [cartaVirada, congelarJogo] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function embaralhar() {
  cartas.forEach((card) => {
    let position = Math.floor(Math.random() * 12);
    card.style.order = position;
  });
})();
