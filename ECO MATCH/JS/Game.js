const grid = document.querySelector('.grid');

const temas = [
    'teste2',
    'teste3',
    'teste4',
    'teste5',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  }  

const createCard = (tema) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../Imagens/${tema}.png')`;

    card.appendChild(front);
    card.appendChild(back);
  
    return card;
}

const loadGame = () => {

    const duplicateTemas = [...temas, ...temas];

    const shuffledArray = duplicateTemas.sort(() => Math.random() - 0.5);
    
    shuffledArray.forEach((tema) => {
        const card = createCard(tema);
        grid.appendChild(card);
    });

  }

  loadGame();