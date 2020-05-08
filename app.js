
var scores, roundScores, activePlayer, dice1, dice2;

document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdDice);
document.querySelector('.btn-new').addEventListener('click', newGame);

init();

function init() {
    scores = [0,0];
    roundScores = 0;
    activePlayer = 0;
    document.querySelector('.btn-new').style.visibility = 'visible';
    document.querySelector('.btn-roll').style.visibility = 'hidden';
    document.querySelector('.btn-hold').style.visibility = 'hidden';

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function rollDice(){
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;

    let diceDom1 = document.getElementById('dice-1');
    let diceDom2 = document.getElementById('dice-2');

    let diceImage1 = 'dice-' + dice1 +'.png';
    let diceImage2 = 'dice-' + dice2 +'.png';

    diceDom1.style.display = 'block';
    diceDom2.style.display = 'block';

    diceDom1.src = diceImage1;
    diceDom2.src = diceImage2;

    if (dice1 == 1 || dice2 == 1) {
        document.querySelector('#current-'+activePlayer).textContent = 0;
        dice1 = 0;
        dice2 = 0;
        scores[activePlayer] = 0;
        beep(300);
        setTimeout(() => {holdDice()}, 100);
    } else {
        document.querySelector('#current-'+activePlayer).textContent = dice1 + dice2;
    }
}

function holdDice(){
    scores[activePlayer] += dice1 + dice2;  
    document.querySelector('#score-' + activePlayer).innerHTML = scores[activePlayer];
    dice1 = 0;
    dice2 = 0;
    document.querySelector('#current-'+activePlayer).textContent = 0; 
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    if (scores[activePlayer] >= 20) {
        document.getElementById('name-'+activePlayer).textContent = 'WINNER!'
        reset();
    } else {
        nextPlayer();
    }
}

function nextPlayer() {
    activePlayer = (activePlayer + 1) % 2;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function beep(duration){
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // create Oscillator node
    var oscillator = audioCtx.createOscillator();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(3000, audioCtx.currentTime); // value in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime+duration*0.001);
}

function reset() {
    document.querySelector('.btn-new').style.visibility = 'visible';
    document.querySelector('.btn-hold').style.visibility = 'hidden';
    document.querySelector('.btn-roll').style.visibility = 'hidden';
}

function newGame(){
    document.querySelector('.btn-new').style.visibility = 'hidden';
    document.querySelector('.btn-hold').style.visibility = 'visible';
    document.querySelector('.btn-roll').style.visibility = 'visible';
    document.getElementById('name-'+activePlayer).textContent = 'PLAYER 0' + (activePlayer + 1);
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    scores = [0,0];
}