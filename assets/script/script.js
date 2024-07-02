const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
let musica = document.querySelector("#end");
const doh = document.getElementById("doh");
const uhu = document.getElementById("uhu");

let cheatsEnabled = false;

startGame();

function startGame() {
  initializaCards(game.createCardsFromInstruments());
}

function initializaCards(cards) {
  let gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  game.cards.forEach((card) => {
    let cardElement = document.createElement("div");
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;

    createCardContent(card, cardElement);

    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement("div");
  cardElementFace.classList.add(face);
  if (face == FRONT) {
    let iconElement = document.createElement("img");
    iconElement.classList.add(ICON);
    iconElement.src = "./assets/" + card.icon + ".png";
    cardElementFace.appendChild(iconElement);
  } else {
    let iconElement = document.createElement("img");
    iconElement.classList.add(ICON);
    iconElement.src = "./assets/" + "fundo" + ".png";
    cardElementFace.appendChild(iconElement);
  }
  element.appendChild(cardElementFace);
}

function flipCard() {
  if (!cheatsEnabled) {
    if (game.setCard(this.id)) {
      this.classList.add("flip");
      if (game.secondCard) {
        if (game.checkMatch()) {
          playSound(uhu);
          game.clearCards();
          if (game.checkGameOver()) {
            let music = document.querySelector("#bgm");
            music.pause();

            confettiIntervalId = setInterval(() => {
              confetti({
                particleCount: 100,
                angle: 90,
                spread: 360,
                startVelocity: 30,
                origin: { x: Math.random(), y: Math.random() },
                gravity: 0.5,
                ticks: 200,
              });
            }, 800);

            let gameOverLayer = document.getElementById("gameOver");
            gameOverLayer.style.display = "flex";
            let musica = document.querySelector("#end");
            musica.play();
            playingTheme = false;
          }
        } else {
          setTimeout(() => {
            let firstCardView = document.getElementById(game.firstCard.id);
            let secondCardView = document.getElementById(game.secondCard.id);
            firstCardView.classList.remove("flip");
            secondCardView.classList.remove("flip");
            playSound(doh);
            game.unflipCards();
          }, 1000);
        }
      }
    }
  }
}

function restart() {
  game.clearCards();
  startGame();
  let gameOverLayer = document.getElementById("gameOver");
  gameOverLayer.style.display = "none";
  let musica = document.querySelector("#end");
  musica.pause();
  musica.currentTime = 0;
  clearInterval(confettiIntervalId);
}

function openNever() {
  window.open("https://www.youtube.com/watch?v=UNuogmk7oEA", "_blank");
}

function openXanural() {
  window.open("https://www.yout-ube.com/watch?v=9z-Mh9Qeinw", "_blank");
}

function enableCheats(event) {
  if (event.key === '"') {
    let input = prompt("Digite o comando:");
    if (input === "bagre") {
      flipAllCards();
    } else if (input === "never") {
      openNever();
    } else if (input === "xanural") {
      openXanural();
    }
  }
}

document.addEventListener("keypress", enableCheats);
