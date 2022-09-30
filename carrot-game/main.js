'use strict'

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const GAME_DURATION = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game-timer')
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up')
const popUpText = document.querySelector('.pop-up__message')
const popUpRefresh = document.querySelector('.pop-up__refresh')
const carrotSound = new Audio('sound/carrot_pull.mp3');
const bgSound = new Audio('sound/bg.mp3');
const alertSound = new Audio('sound/alert.wav');
const bugSound = new Audio('sound/bug_pull.mp3');
const winSound = new Audio('sound/game_win.mp3');


let started = false;
let score = 0;
let timer = undefined;


field.addEventListener('click', (e) => onFieldClick(e));

gameBtn.addEventListener('click', () => {
    if(started){
        stopGame();
    } else{
        startGame();
    }
})

popUpRefresh.addEventListener('click', () => {
    startGame();
    hidePopup();
    // playSound(bgSound);
})


function hidePopup() {
    popUp.classList.add('pop-up--hide');
    gameBtn.style.visibility = 'visible';
    icon.classList.add('fa-play')
}

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerandScore();
    startGameTimer();
    playSound(bgSound);
}


function startGameTimer(){
    let remainingTime = GAME_DURATION;
    updateTimerText(remainingTime);
    timer = setInterval(() => {
        if(remainingTime <= 0){
            clearInterval(timer);
            finishGame(CARROT_COUNT === score)
            return;
        }
        updateTimerText(--remainingTime);
    }, 1000)
}


function stopGameTimer() {
    clearInterval(timer);
}


function finishGame(win){
    started = false;
    hideGameButton();
    if(win){
        playSound(winSound);
    }else{
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopup(win ? 'YOU WON' : 'YOU LOST');
}

function updateTimerText (time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes} : ${seconds}`
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopup('Replay ?');
    playSound(alertSound);
    stopSound(bgSound);
}



function showStopButton() {
    const icon = gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}



function showTimerandScore(){
    gameTimer.style.visibility = 'visible'; // css 파일에서 처음에 노드 트리를 그릴 때,화면에 보이지 않을 뿐 위치는 자리잡고 있어야 하기때문에 visibility 속성을 활용한다.
    gameScore.style.visibility = 'visible'
}

function showPopup(text) {
    popUpText.innerHTML = text; 
    popUp.classList.remove('pop-up--hide')
}


const initGame = () => {
    score = 0;
    field.innerHTML = ''; // 새로추가할 때마다 reset 되면서 추가되어 당근과 벌레들이 쌓이지않을 것.
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFieldClick(e){
    if(!started){
        return;
    }

    const target = e.target;
    if(target.matches('.carrot')){ // css 셀렉터가 맞는지 확인하는 
        target.remove(); // target에 해당하는 노드를 삭제가능
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if(score === CARROT_COUNT){
            finishGame(true);
        }
    }else if (target.matches('.bug')){
        finishGame(false);
    }
}


function playSound(sound){
    sound.currentTime = 0;
    sound.play()
}

function stopSound(sound){
    sound.pause()
}


function updateScoreBoard(){
    gameScore.innerText = CARROT_COUNT - score;
}

// field의 position을 relative로 해야함
function addItem(className, count, imgPath) {
    const field = document.querySelector('.game__field');
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for(let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position= 'absolute';
        const x = randomNumber(x1,x2);
        const y = randomNumber(y1,y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`
        field.appendChild(item);
    }
}

function randomNumber(min,max){
    return Math.random() * (max - min) + min;
}

