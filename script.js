
//global storage 
let startBtn = document.querySelector('#start');
let timerDisplay = document.querySelector('#timer');
let allQuestionsBox = document.querySelector("#allQuestionsBox");
let question = document.querySelector("#question");
let options = document.querySelector("#options");
let userScoreName = document.querySelector("#userScoreName");
let userScore = document.querySelector("userScore");
let userScoreSubmitBtn = document.querySelector("#userScoreSubmit");
let countDown = 75;
let timerInterval;
let orderedQuestion;
let questionCounter = 0;
let userScoreDisplay = document.querySelector("#userScore");
let welcomeMessage = document.querySelector("#welcome-message");
let answeredRight = document.querySelector("#right-message");
let answeredWrong = document.querySelector("#wrong-message");
let scores = 0;
let scoresDisplay = document.querySelector("#scoresDisplay");
let arrayHighScores = [];
let inputInfo = document.querySelector("#saveInputInfo");
let highScoresContainer = document.querySelector("#highScores");
let clearBtn = document.querySelector("#clearBtn");
let backBtn = document.querySelector("#backBtn");

//store user input initials in local stoarge
localStorage.setItem("inputInfo", userScoreName.value)
// get user input info from local storage
if (localStorage.getItem('inputInfo')) {
    arrayHighScores = JSON.parse(localStorage.getItem('inputInfo'))
    }

startBtn.addEventListener('click', startGame);


// start code quiz game
function startGame() {
    timerInterval = setInterval(timeRun, 1000);

//run function to ask questions
    askQuestionFunc();
    welcomeMessage.style.visibility = "hidden";
    startBtn.style.visibility = "hidden";
}
//function that asks quiz questions
function askQuestionFunc() {
    orderedQuestion = allQuestions[questionCounter];

    question.textContent = orderedQuestion.question;

    orderedQuestion.options.forEach(function (option) {
        let optionsBtn = document.createElement("button");
        optionsBtn.setAttribute('value', option);
        optionsBtn.addEventListener("click", askQuestionClick);
        optionsBtn.textContent = option;

        options.appendChild(optionsBtn);
        optionsBtn.className = "my-options-btn";
    });
}
// function that continues to ask questions as user clicks answers
function askQuestionClick(e) {
//if the user gets question right, score adds 20 points (total points is 100, 5 questions 20 points per question)
    if ((e.target.value) === orderedQuestion.rightAnswer) {
        console.log("correct")
        scores = scores + 20; 
//if user gets question wrong, score does not go up, and time is deducted from timer
        } else {
        console.log("false");
        countDown = countDown - 5;
        }

    questionCounter++;

    if (questionCounter === allQuestions.length) {
        stopGame();
    } else {
        options.innerHTML = '';

        askQuestionFunc();
    }
}
// function to stop game, hide questions and options, and show user score
function stopGame() {
    clearInterval(timerInterval);
    userScoreDisplay.removeAttribute("class");
    options.style.visibility = "hidden";
    question.style.visibility = "hidden";
    console.log(scores);
    scoresDisplay.textContent = `Here Is Your Final Score: ${ scores}`
    
}

// function that holds the time interval that runs as the game is being played
function timeRun() {
    countDown--;
    timerDisplay.textContent = `Time ${ countDown }`

}


// function that records users score, and users input value 
userScoreSubmitBtn.addEventListener('click', function(event){
    event.preventDefault();
    arrayHighScores.push({
        initials: userScoreName.value,
        score: scores,
    });
// set and store score and initial in local storage, and display that information 
    localStorage.setItem("inputInfo", JSON.stringify(arrayHighScores));
    highScoresContainer.classList.remove('hide');
    for (var i = 0; i < arrayHighScores.length; i++) {
        console.log(arrayHighScores[i]);
        const userScore = arrayHighScores[i];
        const div = document.createElement('div');
        div.textContent = `${userScore.initials} - ${userScore.score}`;
        highScoresContainer.appendChild(div);
        userScoreDisplay.style.visibility = "hidden";

    clearBtn.removeAttribute("class");
    backBtn.removeAttribute("class");
    clearBtn.addEventListener("click", function () {highScoresContainer.innerHTML = "";window.localStorage.clear();
})
    backBtn.addEventListener("click", function () {location.href = "index.html";
})

}})
   


