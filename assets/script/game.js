let playingTheme = false;

let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,

  setCard: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0];

    if (card.flipped || this.lockMode) {
      return false;
    }

    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflipCards() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver() {
    return this.cards.filter((card) => !card.flipped).length == 0;
  },

  instruments: [
    "trompete",
    "tuba",
    "acordeon",
    "clarinete",
    "trombone",
    "tenor",
    "alto",
    "souza",
  ],

  cards: null,

  createCardsFromInstruments: function () {
    this.cards = [];
    this.instruments.forEach((instrument) => {
      this.cards.push(this.createPairFromInstrument(instrument));
    });
    this.cards = this.cards.flatMap((pair) => pair);
    this.shuffleCards();
    return this.cards;
  },

  createPairFromInstrument: function (instrument) {
    return [
      {
        id: this.createIdWithInstrument(instrument),
        icon: instrument,
        flipped: false,
      },

      {
        id: this.createIdWithInstrument(instrument),
        icon: instrument,
        flipped: false,
      },
    ];
  },
  createIdWithInstrument: function (instrument) {
    return instrument + parseInt(Math.random() * 1000);
  },
  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.cards[randomIndex], this.cards[currentIndex]] = [
        this.cards[currentIndex],
        this.cards[randomIndex],
      ];
    }
  },
};

//musicas*/

let music = document.querySelector("#bgm");

function playSound(audio) {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
  audio.volume = 0.3;
}

function toggleMusic() {
  if (playingTheme) {
    music.pause();
    music.currentTime = 0;
    playingTheme = false;
  } else {
    let musicNote = document.getElementById("play");
    musicNote.classList.add("stop-animation");
    playSound(music);
    playingTheme = true;
  }
}
