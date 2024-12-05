// Imagens de Mario Bros
const images = [
    "assets/mario.png",
    "assets/luigi.png",
    "assets/peach.png",
    "assets/bowser.png",
    "assets/goomba.png",
    "assets/toad.png",
    "assets/yoshi.png",
    "assets/koopa.png"
];

// Duplicar e embaralhar as cartas
const cards = [...images, ...images].sort(() => 0.5 - Math.random());

const gameContainer = document.querySelector(".game-container");
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Criar cartas dinamicamente
cards.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = image;

    const img = document.createElement("img");
    img.src = image;

    card.appendChild(img);
    gameContainer.appendChild(card);

    card.addEventListener("click", flipCard);
});

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
