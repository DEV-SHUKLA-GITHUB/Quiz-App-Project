let i = 0;
const questionBar = [
  {
    question: "What is the capital city of France?",
    option1: "Madrid",
    option2: "Berlin",
    option3: "Rome",
    option4: "Paris",
    correct: "Paris",
  },
  {
    question: " Which planet is known as the Red Planet?",
    option1: "Venus",
    option2: "Mars",
    option3: "Jupiter",
    option4: "Saturn",
    correct: "Mars",
  },
  {
    question: "What is the largest mammal in the world?",
    option1: "Elephant",
    option2: "Blue Whale",
    option3: "Giraffe",
    option4: "Gorilla",
    correct: "Blue Whale",
  },
  {
    question: " Which country is known as the Land of the Rising Sun?",
    option1: "China",
    option2: "Japan",
    option3: "India",
    option4: "South Korea",
    correct: "Japan",
  },
  {
    question: "Who is known as the Father of Modern Physics?",
    option1: "Isaac Newton",
    option2: "Albert Einstein",
    option3: "Galileo Galilei",
    option4: "Stephen Hawking",
    correct: "Albert Einstein",
  },
  {
    question: "What is the national currency of India",
    option1: "Rupee",
    option2: "Rupiah",
    option3: "Paisa",
    option4: "None of the above",
    correct: "Rupee",
  },
  {
    question: "Which Indian state is known as the Land of Five Rivers?",
    option1: "Punjab",
    option2: "Haryana",
    option3: "Himanchal Pradesh",
    option4: "Uttarakhand",
    correct: "Punjab",
  },
];
var timer = document.querySelector("#timer");

function resetQuizColor() {
  document.querySelector("#ans1").style.backgroundColor = "aqua";
  document.querySelector("#ans2").style.backgroundColor = "aqua";
  document.querySelector("#ans3").style.backgroundColor = "aqua";
  document.querySelector("#ans4").style.backgroundColor = "aqua";
}
function displayQuestion(i) {
  setTimer(15, timer);
  if (i === questionBar.length) {
    return;
  }
  resetQuizColor();
  var questionBox = document.querySelector("#questionbox");
  var ans1 = document.querySelector("#ans1");
  var ans2 = document.querySelector("#ans2");
  var ans3 = document.querySelector("#ans3");
  var ans4 = document.querySelector("#ans4");
  questionBox.innerHTML = `${questionBar[i].question}`;
  ans1.innerHTML = `${questionBar[i].option1}`;
  ans2.innerHTML = `${questionBar[i].option2}`;
  ans3.innerHTML = `${questionBar[i].option3}`;
  ans4.innerHTML = `${questionBar[i].option4}`;
  return questionBar[i].correct;
}

let answerKey = displayQuestion(i);
let score = 0;

function quizEnd() {
  clearInterval(counter);
  var userScore = document.querySelector("#userScore");
  var scoreCard = document.getElementById("quizEnd");
  var pointsEarned = document.querySelector("#points");
  let box = document.querySelector("#box");
  box.style.display = "none";
  userScore.innerHTML = score;
  scoreCard.style.display = "flex";
}
function answerChecked(e) {
  e.preventDefault();
  let userAnswer = document.querySelector(`#${e.srcElement.id}`);
  let option1 = document.querySelector('#ans1').textContent;
  let option2 = document.querySelector('#ans2').textContent;
  let option3 = document.querySelector('#ans3').textContent;
  let option4 = document.querySelector('#ans4').textContent;
  if (option1 ===answerKey){
    answerId=document.querySelector('#ans1');
  }
  if (option2 ===answerKey){
    answerId=document.querySelector('#ans2');
  }
  if (option3 ===answerKey){
    answerId=document.querySelector('#ans3');
  }
  if (option4 ===answerKey){
    answerId=document.querySelector('#ans4');
  }
  console.log(answerId)
  let scoreElement = document.querySelector("#scorebox");
  if (answerKey === userAnswer.innerHTML) {
    userAnswer.style.backgroundColor = "rgb(76, 218, 76)";
    score = score + 1;
    scoreElement.innerHTML = `${score}`;
  } else {
    userAnswer.style.backgroundColor = "red";
    answerId.style.backgroundColor = "rgb(76, 218, 76)";
    answerId=""
  }
  i = i + 1;
  if (i === questionBar.length) {
    setTimeout(() => {
      // quizEnd();
    }, 1000);
    return;
  }

  setTimeout(() => {
    clearInterval(counter);
    answerKey = displayQuestion(i);
  }, 1000);
}

function setTimer(time, x) {
  counter = setInterval(timer, 1000);
  function timer() {
    if (i === questionBar.length) {
      quizEnd();
      return;
    }
    x.innerHTML = `${time}`;
    time--;
    if (time < 0) {
      clearInterval(counter);
      i = i + 1;
      displayQuestion(i);
    }
  }
}

function getItems() {
  var docRef = db.collection("scores");

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

function nameHandler(e) {
  e.preventDefault();
  var name = document.querySelector("#username").value;
  document.querySelector("#username").value = " ";
  db.collection("scores").add({
    name: ` ${name}`,
    score: `${score}`,
  });
}
