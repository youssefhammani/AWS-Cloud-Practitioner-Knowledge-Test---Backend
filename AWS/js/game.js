const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

const resultQuiz = JSON.parse(localStorage.getItem('resultQuiz')) || [];

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let descriptionIncorrect = [];
let stockIndex = [];
let arryStr = [];
var questions ;


getText("file.php");

async function getText(file) {
  let myObject = await fetch(file);
  questions = await myObject.json();
  startGame();
  // questions = JSON.parse(myText)
  console.log("myText", questions);

}


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  arryStr.push(availableQuesions[questionIndex]);

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = e.target.innerText;

    const classToApply =
      selectedAnswer == currentQuestion.correct_ans ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    } else {

      const stockDescription = {
        question: currentQuestion.question,
        answerCorrect: currentQuestion.correct_ans,
        answerIncorrect: selectedAnswer,
        description: currentQuestion.description,
      };

      resultQuiz.push(stockDescription);
      localStorage.setItem('resultQuiz', JSON.stringify(resultQuiz));
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

// startGame();
