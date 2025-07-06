let random =parseInt(Math.random() * 100  + 1);
const userInput = document.querySelector('#guessField');
const guesses = document.querySelector('.guesses');
const lowOrHi = document.querySelector('.lowOrHi');
const remain = document.querySelector('.lastResult');
const submit = document.querySelector('#subt');
const replay =document.querySelector('.resultParas');
const p = document.createElement('p');

const wrongAnswer = new Audio('wrongAnswer.mp3');
const correctAnswer = new Audio('win.mp3');
const gameOver =  new Audio ('gameOver.mp3');
const gameTheme = new Audio ('gameTheme.mp3');


let game = true;
let preNum =[];
let round = 1;

//This Function Plays the sound.
function playSound(sound){
  sound.currentTime=0;
  sound.play();
};
//This point Starts the Game.
if(game){
submit.addEventListener('click',function(e){
e.preventDefault();
const input = parseInt(userInput.value.trim());
checkIn(input);
})};

// region This Function checks the user-input is valid or not.
function checkIn (input){
  
if(isNaN(input)||input < 1||input>100){
playSound(wrongAnswer);
alertMessage(`Please Enter the valid number.`);
userInput.value=' ';
}
else{
  preNum.push(input);
  if(round>=10){
    playSound(gameOver);
    alertMessage(`Game Over,The number was ${random}`);
    EndGame();
  }
  else{
    DisplayPreGuess(input);
    resultCheck(input);
  }
  
}
};

//This function alerts throws alert.
function alertMessage(alertMessage){
alert(`${alertMessage}`);
};

//This Function Checks the number guesses.
function resultCheck(input){
if(input===random){
  playSound(correctAnswer);
  displayResult(`You Guesses the Right Number,${input}`);
  EndGame();
}
else if(input > random ){
  playSound(wrongAnswer);
  displayResult(`Number is Too big........Try Again.`);
}
else if(input<random){
  playSound(wrongAnswer);
  displayResult(`Number is Too small.......Try Guessing Again.`)
}
};

//This Function will display the previous guesses and the remaining limits.
function DisplayPreGuess(input){
userInput.value='';
guesses.innerHTML +=`${input}, `;
round++;
remain.innerHTML =`${11-round}`;
};

//This Function Displays the Results.
function displayResult(message){
lowOrHi.innerHTML=`<h2 style="color:rgb(215,215,215); font-size:30px;">${message}</h2>`;
};

//This Function ends the Game and exits.
function EndGame(){
userInput.value='';
userInput.setAttribute('disabled', ' ')
p.classList.add('button');
p.innerHTML=`<h2 id="replay" style="   background-color: #007BFF;
    color: white;
    width: 80%;
    padding: 5px;
    font-size: 18px;
    margin-left:40px;
    border-radius: 30px;
    border: none";>Play Again ? Click me!</h2>`;
replay.appendChild(p);
game=false;
Restart();
};

//This Function will Restart the game from the start.
function Restart(){
    const newgame = document.querySelector('#replay');
    newgame.addEventListener('click',function (e){
    random =parseInt(Math.random() * 100  + 1);
    preNum =[];
    round = 1;
    guesses.innerHTML='';
    remain.innerHTML=`${11-round}`;
    lowOrHi.innerHTML='';
    userInput.removeAttribute('disabled');
    replay.removeChild(p);
    game=true;
  })
};