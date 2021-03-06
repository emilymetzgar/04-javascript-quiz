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


localStorage.setItem("inputInfo", userScoreName.value)

if (localStorage.getItem('inputInfo')) {
    arrayHighScores = JSON.parse(localStorage.getItem('inputInfo'))
    }
// start code quiz game
function startGame() {
    timerInterval = setInterval(timeRun, 1000);
    //run function to ask questions

    askQuestionFunc();
    welcomeMessage.style.visibility = "hidden";
    startBtn.style.visibility = "hidden";
}

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

function askQuestionClick(e) {

    if ((e.target.value) === orderedQuestion.rightAnswer) {
        console.log("correct")
        scores = scores + 20; 

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

function stopGame() {
    clearInterval(timerInterval);
    userScoreDisplay.removeAttribute("class");
    options.style.visibility = "hidden";
    question.style.visibility = "hidden";
    console.log(scores);
    scoresDisplay.textContent = `Here Is Your Final Score: ${ scores}`
    
}



function timeRun() {
    countDown--;
    timerDisplay.textContent = `Time ${ countDown }`

}


startBtn.addEventListener('click', startGame);

userScoreSubmitBtn.addEventListener('click', function(event){
    event.preventDefault();
    arrayHighScores.push({
        initials: userScoreName.value,
        score: scores
    });
    localStorage.setItem("inputInfo", JSON.stringify(arrayHighScores));
    highScoresContainer.classList.remove('hide');
    for (var i = 0; i < arrayHighScores.length; i++) {
        console.log(arrayHighScores[i]);
        const userScore = arrayHighScores[i];
        const div = document.createElement('div');
        div.textContent = `${userScore.initials} - ${userScore.score}`;
        highScoresContainer.appendChild(div);
    }
    userScoreDisplay.style.visibility = "hidden";
    clearBtn.removeAttribute("class");
    backBtn.removeAttribute("class");
    backBtn.addEventListener("click", function () {    location.href = "index.html";});
    clearBtn.addEventListener("click", function () {highScoresContainer.innerHTML = "";window.localStorage.clear();
    });
});
