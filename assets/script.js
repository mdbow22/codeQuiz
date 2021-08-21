//Element Selectors
let start = document.querySelector('#startQuiz');
let secLeft = document.querySelector('.time');

//global variables
let timer;

//Load in high scores from localStorage on page load
function init() {
    getScores();
}

function startQuiz() {
    setTimer();
    genQuestion(0);
}

//Generate each question onto the page
function genQuestion(qNum) {

}

//Set the timer and check if quiz is over
function setTimer() {
    timer = 90;
    let time = setInterval(function() {
        timer--;
        secLeft.textContent = timer;
        if (timer === 0) {
            clearInterval(time);
            quizEnd();
        }
    }, 1000);
}

function checkAnswer(option) {

}

function showHighScores() {

}

function addScore(score) {

}
//All Event Listeners

//Check if "Start Game" button has been pushed
start.addEventListener('click', function(event) {
    //Prevent page from reloading
    event.preventDefault;
    startQuiz();
});

//Check if an option has been selected - goes to func to determine if answered correctly

//Check if wants to view high scores

//Check to go back to to start quiz