// 1. 사용자가 입력한 텍스트 받아오기
// 2. 새로운 아이템 생성 (텍스트 + 삭제버튼)
// 3. items 컨테이너 안에 새로 만든 아이템 추가
// 4. 인풋 초기화

'use strict';

const gameTitle = document.querySelector('h2'); // 게임기 이름
const titleInput = document.querySelector('.input'); // 게임기 이름 적는 인풋
const submitBtn = document.querySelector('.submit'); // 게임기 이름 입력 버튼

const shooting = document.querySelector('.shooting'); // 게임명 분류 - 슈팅 게임
const shootingTitle = document.querySelector('.game-main'); // 슈팅게임 메인 이미지
const aim = document.querySelector('.aim'); // 총 에임인데 안씀
const field = document.querySelector('.field'); // 아이템들(모기랑 강아지) 나오는 구간
const fieldRect = field.getBoundingClientRect(); // getBoundingClientRect() : 뷰포트를 기준으로 특정 엘리먼트(field)의 크기, 위치 값을 DOMRect 객체로 가져옴

const popUp = document.querySelector('.pop-up'); // 승리 또는 패배 시 뜨는 팝업
const popUpText = document.querySelector('.pop-up__msg'); // 승리 또는 패배 시 팝업 안에 넣을 텍스트

const DOG_SIZE = 65; // 강아지 사이즈 65px 강아지가 field 삐져나가는 만큼 빼주기 위함
const DOG_COUNT = 5; // 강아지 수 5로 초기화
const BUG_COUNT = 7; // 모기 수 7로 초기화
const GAME_SEC = 5; // 남은 게임 시간 5초로 초기화

const gameBtn = document.querySelector('.startBtn'); // 게임 시작 버튼
const resetBtn = document.querySelector('.resetBtn'); // 게임 리셋 버튼
const gameTimer = document.querySelector('.timer'); // 타이머 보이는 부분
const gameScore = document.querySelector('.score'); // 점수 보이는 부분
const scoreText = '<img src="/img/mosquito.png" alt="mosquito" class="scoreBug"> : 0' // gameScore에 innerHTML로 넣어줄 html 텍스트

let started = false; // 시작되지 않은 상태가 초기값
let score = 0; // 점수 초기값 0점
let timer = undefined; // 시간초에 아직 값 할당하지 않음




function changeTitle(){ // 게임 제목 바꿔주는 함수
    gameTitle.innerText = sessionStorage.getItem('title').toUpperCase(); // sessionStorage에 저장된 title 변수를 가져와서 대문자로 변환 후 h2에 text로 넣어줌

    if(gameTitle.innerText === ''){ // 변수 title 안에 input value 값이 비어있으면 원래 게임기 이름 GAME BOX를 h2에 넣어줌
        gameTitle.innerText = 'GAME BOX'
    }
};

function onSubmit(){ // 입력 버튼 누르면 제목 바꾸는 함수(changeTitle)가 실행되는 함수
    const inputText = titleInput.value; // input란에 입력한 텍스트들의 값
    sessionStorage.setItem('title', inputText); // sessionStorage의 title 변수에다 inputText(titleInput.value)를 저장
    changeTitle(); // 제목 바꾸는 함수 실행
};

window.addEventListener('DOMContentLoaded', () => { // 브라우저가 HTML을 모두 읽고 DOM 로딩이 완성되면 실행되는 함수
    changeTitle(); // 새로고침 때 마다 제목 바꾸는 함수 실행
});

submitBtn.addEventListener('submit', (e) => { // form을 제출할 때 발생하는 이벤트 submitBtn (button type="submit")
    e.preventDefault(); // 기본으로 정의되어있는 이벤트 막기 (submit 할 때 새로고침 되는 현상)
    onSubmit(); // onSubmit 함수 실행
    titleInput.value='' // 입력을 눌렀으니까 다시 input 값을 빈 값으로 초기화 해줌
    titleInput.focus(); // 포커스가 다시 input 으로 가게 해줌
});





// shooting.addEventListener('mousemove', (e) => {
//     const x = e.clientX;
//     const y = e.clientY;

//     aim.style.top = `${y}px`;
//     aim.style.left = `${x}px`;
// });





const gameStartBtn = () => { // 게임 시작 버튼 함수
    if(started = true){ // started가 true가 되면 ??? 언제 ture가 되지???
        startGame(); // 게임 시작하는 함수 실행하고
        gameBtn.removeEventListener('click', gameStartBtn); // 중복 시작 못하게 gameBtn에 있는 gameStartBtn 클릭 이벤트 제거
    }
    shootingTitle.style.visibility = 'hidden'; // 슈팅 게임 메인도 안보이게 hidden처리
}

gameBtn.addEventListener('click', gameStartBtn); // 게임 시작 버튼 클릭하면 gameStartBtn 함수 실행

resetBtn.addEventListener('click', () => { // 리셋 버튼 클릭시 실행
    popUp.classList.add('pop-up--hide') // popUp에 hide 클래스 추가
    shootingTitle.style.visibility = 'visible'; // 슈팅 게임 타이틀 다시 visible
    stopGame(); // 게임 멈추는 함수 실행
    gameBtn.addEventListener('click', gameStartBtn); //gameBtn에 gameStartBtn 클릭 이벤트 줌
    location.reload(); // 새로고침
});




function startGame(){ // 게임 시작 함수
    started = true; // started = true 할당
    initGame(); // initGame() 함수 실행
    showTimerAndScore(); // 시간초랑 점수에 visibility = "visible" 해주는 함수 실행
    startGameTimer(); //시간초 재는 함수 실행
}

function stopGame(){ // 게임 끝 함수
    clearInterval(timer) // setInterval로 timer 반복하고 있는 거 멈춤
    gameTimer.style.visibility = 'hidden'; // 게임 끝났으니까 시간초 안보이게
    gameScore.style.visibility = 'hidden'; // 게임 끝났으니까 점수 안보이게
}




function showTimerAndScore(){ // 시간초랑 점수에 visibility 스타일 주는 함수
    gameTimer.style.visibility = 'visible'; // 시간초 다시 보이게
    gameScore.style.visibility = 'visible'; // 점수 다시 보이게
};

function startGameTimer(){  // 게임 시간초 재기 시작하는 함수
    let reTimeSec = GAME_SEC; // reTimeSec은 내가 설정한 GAME_SEC (5초)
    updateTimerText(reTimeSec); // 시간초 텍스트를 바꿔주는 함수에 reTimeSec을 인자로 보내줌
    timer = setInterval(() => { // timer에다 1초(1000ms) 간격으로 실행하는 함수 넣어줌
        if(reTimeSec <= 0){ // reTimeSec(5)가 0과 같거나 작아지면
            clearInterval(timer); // timer interver하던 거 멈추고
            finishGame(BUG_COUNT === score) // 게임 완료 함수에 벌레 숫자랑 점수 숫자랑 같다는 인자 보내줌
            return; // if문 종료 ?????????맞나 ??????
        }
        updateTimerText(--reTimeSec); // updateTimerText에 1초 마다 reTimeSec -1 되는 거 인자로 보내줌
    }, 1000);
};

function stopGameTimer(){ // 게임 시간초 재기 끝내는 함수
    clearInterval(timer); // timer 인터벌 멈추기
};

function updateTimerText(time){ //
    const minutes = Math.floor(time / 60); // 소수점 이하 버림 5/60 = 0.08 어쩌고니까 minutes = 0
    const seconds = time % 60; // ??????????????
    gameTimer.innerText = `0${minutes} : 0${seconds}` // 이제 위에 구한거를 게임 타이머 innerText에 넣어줌
};




function showFinishPopUp(textInPopUp){ // 게임 끝나면 보여주는 팝업에 파라미터로 textInPopUp 보내줌
    popUpText.innerText = textInPopUp; // textInPopUp은 팝업 메세지에 들어간 텍스트
    popUp.classList.remove('pop-up--hide') // 팝업에 하이드 클래스 지워줌
};

function hidePopUp(){ // 팝업에 하이드 클래스 추가해주는 함수
    popUp.classList.add('pop-up--hide')
};




function initGame(){ // 게임 초기 세팅 해주는 함수
    field.innerHTML = ''; // field를 깔꼼하게 비워주고
    gameScore.innerHTML = scoreText + `${BUG_COUNT}`; // 점수란에 scoreText(0) + 초기 세팅된 모기 숫자 해줌 0+7 = 7이 들으감
    addItem('corgi', 5, './img/corgi.png') // addItem 함수에 인자들(className, count, imgPath) 넣어주고 실행
    addItem('mosquito', 7, './img/mosquito.png')
}

function addItem(className, count, imgPath){
    const minWidth = 0;
    const minHeight = 0;

    const fieldWidth = fieldRect.width - DOG_SIZE; // field의 width에서 item 사이즈를 빼줌 왜냐하면 기준점 때문에 아이템이 필드를 넘어가버림
    const fieldHeight = fieldRect.height - DOG_SIZE; // 얘도 마찬가지로 height에서 빼줌 모기는 작아서 강아지로 뺌

    for(let i = 0; i < count; i++){
        const item = document.createElement('img'); // <img> 요소 만듦
        item.setAttribute('class', className); // item의 class 속성 값에 className(corgi, mosquito) 넣어줌
        item.setAttribute('src', imgPath); // item의 src 속성 값에 imgPath(./img/어쩌고) 넣어줌
        item.style.position = 'absolute'; // 떠서 여기저기 위치해야 하니까 포지션 앱솔루트줌 기준점은 field에

        const randomX = randomNumber(minWidth, fieldWidth); // 0과 필드사이즈 사이에서 랜덤 숫자 뽑아서 변수에 넣기
        const randomY = randomNumber(minHeight, fieldHeight);

        item.style.left = `${randomX}px`; // 아이템들 무작위로 배치되게 탑과 레프트에 난수 변수 넣어줌
        item.style.top = `${randomY}px`;

        field.appendChild(item); // 아이템들을 field의 자식 노드에 넣어줌
    }
}

function randomNumber(min, max){ // 난수 만드는 함수
    return Math.random() * (max - min) + min; // 최솟값과 최댓값(포함x) 사이 임의의 숫자 만들기
}




field.addEventListener('click', onFieldClick); // field를 클릭하면 onFieldClick 함수 실행

function onFieldClick(e){
    if(!started){
        return;
    }

    const target = e.target; // 내가 클릭한 타겟

    console.log('target')
    if (target.matches('.mosquito')){ // target에 .mosquito가 있는지 확인하고 ture / false 반환
        target.remove(); // 모기 있으면 target 지워
        score++; // 그리고 점수에 +1 하고
        updateScoreBoard(); // 점수판 업데이트 해주는 함수 실행

        if(score === BUG_COUNT){ // 그리고 점수랑 벌레 갯수가 같아지면
            finishGame(true); // finishGame함수에 true 인자 넘김
        }
    } else if (target.matches('.corgi')){ // .corgi 유무에 true / false 반환
        stopGameTimer(); // 코기 있으면 게임타이머 멈추는 함수 실행하고
        finishGame(false); // 게임끝 함수에 false 넘겨줌
    }
}

function finishGame(win){ // 게임 끝내고 onFieldClick 함수에서 받아온 인자에 따라 승패 갈리는 함수
    started = false; // 시작 안 한 상태
    showFinishPopUp(win ? 'YOU WON 🥳' : 'YOU LOST 😱') // 완료 팝업창 띄워주는 함수
}

function updateScoreBoard(){
    gameScore.innerHTML = scoreText + `${BUG_COUNT - score}`;
}




const gameWrap = document.querySelector('.game-list');
const gameMain = document.querySelector('.game-list__item');
const gameMainW = gameMain.offsetWidth;
const leftBtn = document.querySelector('.btn__left');
const rightBtn = document.querySelector('.btn__right');

console.log(gameMainW)


rightBtn.addEventListener('click', () => {
    gameWrap.style.right = `${gameMainW + gameMainW}px`
});
