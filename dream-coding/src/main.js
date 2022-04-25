// 1. 사용자가 입력한 텍스트 받아오기
// 2. 새로운 아이템 생성 (텍스트 + 삭제버튼)
// 3. items 컨테이너 안에 새로 만든 아이템 추가
// 4. 인풋 초기화

'use strict';
import Field from "./field.js";

const title = document.querySelector('h2');
const input = document.querySelector('.input');
const submitBtn = document.querySelector('.submit');

const shooting = document.querySelector('.shooting');
const shootingTitle = document.querySelector('.game-main');
const aim = document.querySelector('.aim');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__msg');

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

const gameField = new Field(DOG_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item){
    if(!started){
        return;
    }
    if (item === 'mosquito'){
        score++;
        updateScoreBoard();

        if(score === BUG_COUNT){
            finishGame(true);
        }
    } else if (item === '.corgi'){
        stopGameTimer();
        finishGame(false);
    }
}



function onSubmit(){
    const text = input.value;
    console.log(text);

    const newTitle = createTitle(text);
    title.appendChild(newTitle)

};

function createTitle(text){
    title.innerText = text;
};


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
});


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
    gameScore.innerHTML = scoreText + `${BUG_COUNT}`;
    gameField.init();
}



function finishGame(win){
    started = false;
    showStartPopUp(win ? 'YOU WON 🥳' : 'YOU LOST 😱')
}

function updateScoreBoard(){
    gameScore.innerHTML = scoreText + `${BUG_COUNT - score}`;
}

