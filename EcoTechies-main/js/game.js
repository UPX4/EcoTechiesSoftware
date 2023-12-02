

const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

const characters = [
  {
    caracter: "agricultura",
    text: "Agricultura Sustentável: Investimentos em práticas agrícolas sustentáveis, como diversificação de cultivos e técnicas de conservação do solo, são essenciais para garantir a produção de alimentos nutritivos.",
  },
  {
    caracter: "desperdicio",
    text: "Desperdício de Alimentos: Aproximadamente um terço de toda a comida produzida é perdida ou desperdiçada, destacando a necessidade de reduzir o desperdício para combater a fome.",
  },
  {
    caracter: "fome",
    text: "Fome e Desnutrição: Cerca de 821 milhões de pessoas sofrem de subnutrição crônica globalmente, com a fome sendo um desafio persistente e complexo.",
  },
  {
    caracter: "internacional",
    text: "Cooperação Internacional: A colaboração entre países, organizações e comunidades é fundamental para enfrentar a fome, compartilhando recursos, conhecimento e tecnologias para fortalecer a segurança alimentar global.",
  },
  {
    caracter: "locais",
    text: "Iniciativas Locais: Programas de alimentação escolar e comunitária desempenham um papel crucial em fornecer nutrição adequada, especialmente para crianças e populações vulneráveis.",
  },
  {
    caracter: "seguranca",
    text: "Segurança Alimentar: Alcançar a segurança alimentar envolve não apenas ter acesso a alimentos, mas também garantir que sejam nutritivos e adequados para uma dieta saudável.",
  },
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const showModal = (character) => {
  const modalContainer = document.getElementById("modal-container");
  const modalText = document.getElementById("modal-text");

  const foundCharacter = characters.find((c) => c.caracter === character);

  if (foundCharacter) {
    modalText.innerHTML = `<p><b>Você acertou!</b> <br> ${foundCharacter.text}</p>`;
    modalContainer.style.display = "flex";
  }
};

const closeModal = () => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.style.display = "none";
};

const finishedGame = () => {
  const finishedBox = document.getElementById("finished")
  const finishedText = document.getElementById("finished-text")
  console.log('oi')
  finishedBox.style.display = "flex";
  finishedText.innerHTML = `<p>Parabéns você Finalizou o jogo!</p>`;
}
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length === 12) {
    clearInterval(this.loop);
    finishedGame()
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";
    showModal(firstCharacter);
    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../images/${character}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character.caracter);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");
  startTimer();
  loadGame();
};
