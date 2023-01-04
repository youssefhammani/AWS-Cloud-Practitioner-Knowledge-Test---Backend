const resultList = document.getElementById("resultList");
const resultQuiz = JSON.parse(localStorage.getItem("resultQuiz")) || [];
let   btn        = document.getElementById("play-again");

resultList.innerHTML = resultQuiz
  .map(resultQuiz => {
    return `<div class="result-question"> 
                <var> Question : ${resultQuiz.question} </var>
                <p class="answerIncorrect"> ${resultQuiz.answerIncorrect} </p>
                <p class="answerCorrect"> ${resultQuiz.answerCorrect} </p>
                <p class="description"> Description <br> <br> ${resultQuiz.description} </p>
            </div>`;
  })
  .join("");


btn.addEventListener("click", function() {
  localStorage.clear(resultQuiz);
});
