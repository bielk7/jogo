const grid = document.querySelector('.grid');

const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');


const characters = [

'amor1',
'amor2',
'amor3',
'amor4',
'mao1',
'mao2',
'biel1',
'biel2',
'biel3',
'biel4',
    
];

const createElement = (tag,className) => {
const element = document.createElement(tag);
element.className = className;
return element;
}

let firstcard = '';
let secoundcard = '';

const checkEndGame = () => {
    const disablecards = document.querySelectorAll('.disable-card');

    if (disablecards.length === 20){
        alert(`Parabéns meu amor! Você conseguiu! Seu tempo foi de ${timer.innerHTML}`);
        clearInterval(this.loop);
    }
}

const checkCards = () => {

    const secoundcharacters = secoundcard.getAttribute('data-characters');
    const firstcharacters = firstcard.getAttribute('data-characters');


    if (firstcharacters === secoundcharacters){

        firstcard.firstChild.classList.add('disable-card');
        secoundcard.firstChild.classList.add('disable-card');
        
        
        firstcard = '';
        secoundcard = '';
        
        checkEndGame();

    }else{

        setTimeout(() => {
        firstcard.classList.remove('reveal-card');
        secoundcard.classList.remove('reveal-card');

        firstcard = '';
        secoundcard = '';

    }, 500);
    

}

}
const revealcard = ({target}) => {
   
    if (target.parentNode.className.includes('reveal-card')){
        return;
    }

    if(firstcard === ''){
        target.parentNode.classList.add('reveal-card');
        firstcard = target.parentNode;

    }else if (secoundcard === ''){
        target.parentNode.classList.add('reveal-card');
        secoundcard = target.parentNode;

        checkCards();

    }


}




const createcard = (characters) => {

    const card = createElement('div','card')
    const front = createElement('div','face front');
    const back = createElement('div','face back');

    front.style.backgroundImage = `url('${characters}.jpeg')`;

    card.appendChild(front);
    card.appendChild(back);
      
    card.addEventListener('click',revealcard);
    card.setAttribute('data-characters', characters)

    return card;

}

const loadGame = () => {
 
    const duplicatecharacters = [...characters,...characters];
    const shuffledArray = duplicatecharacters.sort(() => Math.random() - 0.5  );
    
    duplicatecharacters.forEach((characters) => {

        const card = createcard(characters);
        grid.appendChild(card);


    });


}

const startTimer = () => {

    this.loop = setInterval(() => {

        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;


    }, 1000);

}

window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');
    loadGame();
    startTimer();

}



