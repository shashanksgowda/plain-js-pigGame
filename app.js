
var scores, roundScores, activePlayer;

scores = [0,0];
roundScores = 0;
activePlayer = 0;

dice = Math.floor(Math.random() * 6) + 1;
document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-new').style.visibility = 'visible';
document.querySelector('.btn-roll').style.visibility = 'hidden';
document.querySelector('.btn-hold').style.visibility = 'hidden';

document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdDice);
document.querySelector('.btn-new').addEventListener('click', newGame);


function rollDice(){
    dice = Math.floor(Math.random() * 6) + 1;
    let diceDom = document.querySelector('.dice');
    var diceImage = 'dice-' + dice +'.png';
    diceDom.style.display = 'block';
        diceDom.src = diceImage;
    if (dice == 1) {
        document.querySelector('#current-'+activePlayer).textContent = dice;
        dice = 0;
        scores[activePlayer] = 0;
        beep(300);
        setTimeout(() => {holdDice()}, 100);
    } else {
        document.querySelector('#current-'+activePlayer).textContent = dice;
    }
}

function holdDice(){
    scores[activePlayer] += dice;  
    document.querySelector('#score-' + activePlayer).innerHTML = scores[activePlayer];
    dice = 0;
    document.querySelector('#current-'+activePlayer).textContent = 0; 
    document.querySelector('.dice').style.display = 'none';
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