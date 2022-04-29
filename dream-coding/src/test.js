'use strict';

const gameTitle = document.querySelector('h2');
const titleInput = document.querySelector('.input');
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
    gameTitle.innerText = sessionStorage.getItem('title').toUpperCase();

    if(gameTitle.innerText === ''){
        gameTitle.innerText = 'GAME BOX'
    }
};

function onSubmit(){
    const inputText = titleInput.value;
    sessionStorage.setItem('title', inputText);
    changeTitle();
};

window.addEventListener('DOMContentLoaded', () => {
    changeTitle();
});

submitBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit();
    titleInput.value=''
    titleInput.focus();
});




// shooting.addEventListener('mousemove', (e) => {
//     const x = e.clientX;
//     const y = e.clientY;

//     aim.style.top = `${y}px`;
//     aim.style.left = `${x}px`;
// });




const gameStartBtn = () => {

    if(started == false){
        startGame();
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




function startGame(){
    started = true;
    initGame();
    showTimerAndScore();
    // startGameTimer(); //시간초 재는 함수 실행
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

function updateTimerText(time){ //
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `0${minutes} : 0${seconds}`
};




function showFinishPopUp(textInPopUp){
    popUpText.innerText = textInPopUp;
    popUp.classList.remove('pop-up--hide')
};

function hidePopUp(){
    popUp.classList.add('pop-up--hide')
};




function initGame(){
    field.innerHTML = '';
    gameScore.innerHTML = scoreText + `${BUG_COUNT}`;
    addItem('item corgi', 5, './img/corgi.png')
    addItem('item mosquito', 7, './img/mosquito.png')
}



function addItem(className, count, imgPath){
    const minWidth = 0;
    const minHeight = 0;

    const fieldWidth = fieldRect.width - DOG_SIZE;
    const fieldHeight = fieldRect.height - DOG_SIZE;

    for(let i = 0; i < count; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.setAttribute('draggable', 'true')
        item.style.position = 'absolute';

        const randomX = randomNumber(minWidth, fieldWidth);
        const randomY = randomNumber(minHeight, fieldHeight);

        item.style.left = `${randomX}px`;
        item.style.top = `${randomY}px`;

        field.append(item);
    }

}

function randomNumber(min, max){
    return Math.random() * (max - min) + min;
}

let picked = null;
const item = document.querySelector('.item');

field.addEventListener("dragstart", e => {

    picked = e.target

    const pickedIndex = [...picked.parentNode.children].indexOf(e.target)

    console.log(e.offsetX, e.offsetY)

});

field.addEventListener("dragover", e => {
    e.preventDefault();
});

field.addEventListener("drop", e => {

    picked.style.left = e.offsetX - picked.offsetWidth/2 + 'px'
    picked.style.top = e.offsetY - picked.offsetHeight/2 + 'px'

    console.log(e.offsetX, e.offsetY)

    //picked가 field가 아니라 요소 위에 놓여지면 다른데감

});



field.addEventListener('click', onFieldClick);

function onFieldClick(e){
    if(!started){
        return;
    }

    const target = e.target;

    if (target.matches('.mosquito')){
        // target.remove();
        // score++;
        updateScoreBoard();

        if(score === BUG_COUNT){
            // finishGame(true);
        }
    } else if (target.matches('.corgi')){ 
        stopGameTimer();
        // finishGame(false);
    }
}

function finishGame(win){
    started = false;
    showFinishPopUp(win ? 'YOU WON 🥳' : 'YOU LOST 😱')
}

function updateScoreBoard(){
    gameScore.innerHTML = scoreText + `${BUG_COUNT - score}`;
}






const games = document.querySelector('.game-list');
const gameAll = document.querySelectorAll('.game-list__item');
const game = document.querySelector('.game-list__item');

const gameWidth = game.offsetWidth;
const gameCount = gameAll.length;

const btnCross = document.querySelector('.btn01');
const btnPrev = document.querySelector('.btn__left');
const btnNext = document.querySelector('.btn__right');

let curIndex = 0;

games.style.width = gameWidth * gameCount + 'px';



btnNext.addEventListener('click', () => {

    if(curIndex < gameCount){
        games.style.transform = 'translate3d(-' + gameWidth * (curIndex + 1) + 'px, 0px, 0px'
        curIndex++;
    }

    if(curIndex >= gameCount){
        games.style.transform = 'translate3d(-0px, 0px, 0px)'
        curIndex = 0;
    }

});


btnPrev.addEventListener('click', () => {
    if(curIndex > 0){
        games.style.transform = 'translate3d(-' + gameWidth * (curIndex - 1) + 'px, 0px, 0px'
    }
    curIndex--;

    if(curIndex < 0) {
        curIndex = 3
        games.style.transform = 'translate3d(-' + gameWidth * (curIndex) + 'px, 0px, 0px'
    }
    
});























// const gameWrap = document.querySelector('.game-list'); // 슬라이드 전체 감싸주는애
// const gameMain = document.querySelector('.game-list__item'); // 슬라이드 하나 하나
// const gameMainAll = document.querySelectorAll('.game-list__item'); // 슬라이드들 모두선택
// const gameCnt = gameMainAll.length; // 슬라이드 아이템 갯수
// const gameMainWidth = gameMain.offsetWidth; // 슬라이드의 가로값
// const leftBtn = document.querySelector('.btn__left'); // 이전 버튼
// const rightBtn = document.querySelector('.btn__right'); // 다음 버튼
// const slideSpeed = 200; // 트랜지션 속도
// let curIndex = 0; // 인덱스는 0으로 시작

// gameWrap.style.width = gameMainWidth * (gameCnt + 1) + 'px'; // gameWrap 자식 노드 마지막에 자식 둘 복사해줘서 카운트 + 2


// let firstChild = gameWrap.firstElementChild; // gameWrap의 첫 번째 자식 (이따가 자식 맨 뒤에 1번 슬라이드 복사하려고)
// let copyFirstItem = firstChild.cloneNode(true); // 첫 번째 자식(슈팅겜)의 자식 노드 까지 같이(true) 복사함

// gameWrap.appendChild(copyFirstItem) // 복사한 첫 번째 자식을 gameWrap 자식 노드의 맨 뒤에 붙여줌


// rightBtn.addEventListener('click', () => {
//     gameWrap.style.transition = slideSpeed + 'ms';
//     gameWrap.style.transform = 'translate3d(-' + gameMainWidth * (curIndex + 1) + 'px, 0px, 0px'; // 한 장씩 넘어가니까 가로값에 1,2,3 ~ 슬라이드갯수 없어질 때 까지 곱해줌
//     curIndex++; // 0에다 계속 1씩 더해줘서 한 슬라이드 길이씩만 움직임

//     if(curIndex === gameCnt){ // 슬라이드 갯수랑 인덱스랑 같아지면 인덱스 다시 0으로 초기화
//         setTimeout(function(){ // 
//             gameWrap.style.transition = '0ms';
//             gameWrap.style.transform = 'translate3d(0px, 0px, 0px)';
//         }, slideSpeed)
//         curIndex = 0;
//     }
// });















// let startNum = 0;

// let firstChild = gameWrap.firstElementChild;
// let lastChild = gameWrap.lastElementChild;
// let copyFirst = firstChild.cloneNode(true); //
// let copyLast = lastChild.cloneNode(true);

// gameWrap.appendChild(copyFirst); // gameWrap의 자식 노드 리스트 마지막에 copyFirst 추가
// gameWrap.insertBefore(copyLast, firstChild); //gameWrap의 첫 번째 자식 앞에 copyLast 추가

// gameWrap.style.width = gameMainWidth * (gameCnt + 2) + 'px'; // gameWrap 앞 뒤에 자식이 두 개 더 추가됐으니까 + 2
// gameWrap.style.transform = "translate3d(-" + (gameMainWidth * (startNum + 1)) + "px, 0px, 0px)";

// let curIndex = startNum;
// let curSlide = gameMainAll[curIndex];


// rightBtn.addEventListener('click', () => {
//     if(curIndex <= gameCnt -1 ){
//         gameWrap.style.transition = "300ms";
//         gameWrap.style.transform = "translate3d(-" + (gameMainWidth * (curIndex + 2)) + "px, 0px, 0px)";
//     }

//     if(curIndex === gameCnt -1){
//         setTimeout(function(){
//             gameMain.style.transition = "0ms";
//             gameMain.style.transform = "translate3d(-" + gameMainWidth + "px, 0px, 0px)";
//         }, 300);
//         curIndex = -1;
//     }
//     curSlide = gameMainAll[++curIndex];
// });

// leftBtn.addEventListener('click', () => {
//     if(curIndex >= 0 ){
//         gameWrap.style.transition = "300ms";
//         gameWrap.style.transform = "translate3d(-" + (gameMainWidth * curIndex) + "px, 0px, 0px)";
//     }

//     if(curIndex === 0){
//         setTimeout(function(){
//             gameMain.style.transition = "0ms";
//             gameMain.style.transform = "translate3d(-" + (gameMainWidth + gameCnt) + "px, 0px, 0px)";
//         }, 300);
//         curIndex = gameCnt;
//     }
//     curSlide = gameMainAll[--curIndex];
// });



