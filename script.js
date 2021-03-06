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
let inputInfo = document.querySelector("saveInputInfo");


localStorage.setItem("inputInfo", userScoreName.value)

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

userScoreSubmitBtn.addEventListener('click',function(){ 
    localStorage.setItem("inputInfo", userScoreName.value)
})