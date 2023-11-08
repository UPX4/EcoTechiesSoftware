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

  let firstCard = '';
  let secondCard = '';

  const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 8) {
        alert('Parabéns');

      }

  }

  const checkCards = () => {

    const firstTema = firstCard.getAttribute('data-tema');
    const secondTema = secondCard.getAttribute('data-tema');

    if (firstTema === secondTema) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {     
        setTimeout(() => {

        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        firstCard = '';
        secondCard = '';

        }, 500);
    

    }
}


const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
      }

      if (firstCard === '') {
    
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    
      } else if (secondCard === '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }
}

const createCard = (tema) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../Imagens/${tema}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-tema', tema)
  
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