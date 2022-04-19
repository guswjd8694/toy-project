// 1. 사용자가 입력한 텍스트 받아오기
// 2. 새로운 아이템 생성 (텍스트 + 삭제버튼)
// 3. items 컨테이너 안에 새로 만든 아이템 추가
// 4. 인풋 초기화

'use strict';

const title = document.querySelector('h2');
const input = document.querySelector('.input');
const submitBtn = document.querySelector('.submit');

const shooting = document.querySelector('.shooting');
const shootingTitle = document.querySelector('.game-main');
const aim = document.querySelector('.aim');
const field = document.querySelector('.field');
const fieldRect = field.getBoundingClientRect();

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__msg');

const DOG_SIZE = 65;
const DOG_COUNT = 5;
const BUG_COUNT = 7;
const GAME_SEC = 5;

const gameBtn = document.querySelector('.startBtn');
const resetBtn = document.querySelector('.resetBtn');
const gameTimer = document.querySelector('.timer');
const gameScore = document.querySelector('.score');
const scoreText = '<img src="/img/mosquito.png" alt="mosquito" class="scoreBug"> : 0'

let started = false;
let score = 0;
let timer = undefined;


function changeTitle(){
    title.innerText = sessionStorage.getItem('title');
    console.log(title.innerText)

    const changeUpper = sessionStorage.getItem('title');
    changeUpper.toUpperCase();

    if(title.innerText === ''){
        title.innerText = 'GAME BOX'
    }
};

// 입력값이 대문자로 나오게



function onSubmit(){
    const text = input.value;
    sessionStorage.setItem('title', text);
    changeTitle();
    return false;

};

window.addEventListener('DOMContentLoaded', () => {
    changeTitle();
});

submitBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit();
    input.value=''
    input.focus();

});

// shooting.addEventListener('mousemove', (e) => {
//     const x = e.clientX;
//     const y = e.clientY;

//     aim.style.top = `${y}px`;
//     aim.style.left = `${x}px`;
// });

const gameStartBtn = () => {
    if(started = true){
        startGame();
        gameBtn.removeEventListener('click', gameStartBtn);
    }
    shootingTitle.style.visibility = 'hidden';
}

gameBtn.addEventListener('click', gameStartBtn);

resetBtn.addEventListener('click', () => {
    popUp.classList.add('pop-up--hide')
    shootingTitle.style.visibility = 'visible';
    stopGame();
    gameBtn.addEventListener('click', gameStartBtn);
    location.reload();
});

field.addEventListener('click', onFieldClick);


function startGame(){
    started = true;
    initGame();
    showTimerAndScore();
    startGameTimer();
}

function stopGame(){
    clearInterval(timer)
    gameTimer.style.visibility = 'hidden';
    gameScore.style.visibility = 'hidden';
}

function showTimerAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
};

function startGameTimer(){
    let reTimeSec = GAME_SEC;
    updateTimerText(reTimeSec);
    timer = setInterval(() => {
        if(reTimeSec <= 0){
            clearInterval(timer);
            finishGame(BUG_COUNT === score)
            return;
        }
        updateTimerText(--reTimeSec);
    }, 1000);
};

function stopGameTimer(){
    clearInterval(timer);
};

function updateTimerText(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `0${minutes} : 0${seconds}`
};

function showStartPopUp(text){
    popUpText.innerText = text;
    popUp.classList.remove('pop-up--hide')
};

function hidePopUp(){
    popUp.classList.add('pop-up--hide')

};

function initGame(){
    field.innerHTML = '';
    gameScore.innerHTML = scoreText + `${BUG_COUNT}`;
    addItem('corgi', 5, '/img/corgi.png')
    addItem('mosquito', 7, '/img/mosquito.png')
}


function onFieldClick(e){
    if(!started){
        return;
    }

    const target = e.target;
    if (target.matches('.mosquito')){
        target.remove();
        score++;
        updateScoreBoard();

        if(score === BUG_COUNT){
            finishGame(true);
        }
    } else if (target.matches('.corgi')){
        stopGameTimer();
        finishGame(false);
    }
}

function finishGame(win){
    started = false;
    showStartPopUp(win ? 'YOU WON 🥳' : 'YOU LOST 😱')
}

function updateScoreBoard(){
    gameScore.innerHTML = scoreText + `${BUG_COUNT - score}`;
}

function addItem(className, count, imgPath){
    const x1= 0;
    const y1 = 0;

    const x2 = fieldRect.width - DOG_SIZE;
    const y2 = fieldRect.height - DOG_SIZE;

    for(let i = 0; i < count; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';

        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max){
    return Math.random() * (max - min) + min;
}