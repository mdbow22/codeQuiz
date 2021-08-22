//Element Selectors
let intro = document.querySelector('.intro');
let qBox = document.querySelector('.qBox');
let finished = document.querySelector('.quizEnd');
let start = document.querySelector('#startQuiz');
let secLeft = document.querySelector('.time');
let quesContent = document.querySelector('.question');
let optionList = document.querySelector('.options');
let options = optionList.querySelectorAll('li');
let userScore = document.querySelector('.score');
let userInitials = document.querySelector('#initials');
let scoreSubmit = document.querySelector('.scoreForm');
let scoreView = document.querySelector('.highScores');
let viewScores = document.querySelector('.viewScores');
let scoreTable = document.querySelector('#scoreTable');

//global variables
let timer;
let time;
let score = 0;
let quizPosition;
let highScores = [];

//Load in high scores from localStorage on page load
getScores();

//Get high scores from local storage
function getScores() {
    let allScores = JSON.parse(localStorage.getItem('highScores'));

    if (allScores != null) {
        highScores = allScores;
    }
    renderHighScores();
}

function startQuiz() {
    quizPosition = 0;
    intro.style.display = 'none';
    qBox.style.display = 'block';
    setTimer();
    genQuestion(quizPosition);
}

//Generate each question onto the page
function genQuestion(qNum) {
    quesContent.textContent = questions[qNum].question;
    for (let i = 0; i < options.length; i++) {
        options[i].textContent = questions[qNum].options[i];
    }
}

//Set the timer and check if quiz is over
function setTimer() {
    timer = 90;
    time = setInterval(function() {
        timer--;
        secLeft.textContent = timer;
        if (timer === 0) {
            clearInterval(time);
            quizEnd();
        }
    }, 1000);
}

//check if user's choice matches answer, change score, generate next question
function checkAnswer(choice) {
    if (choice === questions[quizPosition].answer) {
        score++;
    } else {
        score--;
        timer = timer - 5;
    }
    nextQuestion();
}

//Check if user is finished with quiz, if not, go to next question
function nextQuestion() {
    quizPosition++;
    if (quizPosition === questions.length) {
        clearInterval(time);
        quizEnd();
    } else {
        genQuestion(quizPosition);
    }
}

//When quiz is over, let user submit their high score
function quizEnd() {
    qBox.style.display = 'none';
    finished.style.display = 'block';

    userScore.textContent = score;
}

function renderHighScores() {

    //generate table with scores from saved highScores
    for (let i = 0; i < highScores.length; i++) {
        //Generate a new table row
        let newRow = document.createElement('tr');
        //generate cells for initials and score
        let initialCell = document.createElement('td');
        initialCell.textContent = highScores[i].initials;
        let scoreCell = document.createElement('td');
        scoreCell.textContent = highScores[i].score;
        //append cells to table row then row to table
        newRow.appendChild(initialCell);
        newRow.appendChild(scoreCell);
        scoreTable.appendChild(newRow);
    }
}

function scoreKeep() {
    //Create object with users initials and score
    let newScore = {
            initials: userInitials.value,
            score: score
        }
        //add their score to the highScores array
    highScores.push(newScore);
    //set the highScores to localStorage
    localStorage.setItem('highScores', JSON.stringify(highScores));
    //add new score to highScores table and show to user
    let newRow = document.createElement('tr');
    let newInitials = document.createElement('td');
    newInitials.textContent = userInitials.value;
    let addedScore = document.createElement('td');
    addedScore.textContent = score;
    newRow.appendChild(newInitials);
    newRow.appendChild(addedScore);
    scoreTable.appendChild(newRow);
    finished.style.display = 'none';
    scoreView.style.display = 'block';
}

//All Event Listeners

//Check if "Start Game" button has been pushed
start.addEventListener('click', function(event) {
    //Prevent page from reloading
    event.preventDefault;
    startQuiz();
});

//Check if an option has been selected - goes to func to determine if answered correctly
optionList.addEventListener('click', function(event) {
    let response = event.target.textContent;
    checkAnswer(response);
});

//Submission of initials for score keeping
scoreSubmit.addEventListener('submit', function(event) {
    event.preventDefault();
    scoreKeep();
})

//Check if user wants to view high scores
viewScores.addEventListener('click', function() {
    intro.style.display = 'none';
    qBox.style.display = 'none';
    scoreView.style.display = 'flex';
    if (timer > 0) {
        clearInterval(time);
    }
})

//Check to go back to start quiz