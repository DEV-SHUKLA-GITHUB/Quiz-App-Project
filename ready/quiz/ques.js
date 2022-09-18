let i = 0;
const questionBar = [
  {
    question: "Which of these is a valid way to alert string message?",
    option1: "window.alert(alert)",
    option2: "document.alert(alert)",
    option3: "system.alert(alert)",
    option4: "console.alert(alert)",
    correct: "document.alert(alert)",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    option1: "script",
    option2: "JS",
    option3: "Message",
    option4: "Hello",
    correct: "script",
  },
  {
    question: "Anand ka favorite",
    option1: "Cricket",
    option2: "Cricket",
    option3: "More Cricket",
    option4: "All of the above",
    correct: "All of the above",
  },
  {
    question: "Whats the default size of body tag in viewport",
    option1: "Full width",
    option2: "Zero",
    option3: "100vh",
    option4: "100vw",
    correct: "Zero",
  },
  {
    question: "What is the main difference between let and var",
    option1: "Scope",
    option2: "initialization",
    option3: "potato pohtato",
    option4: "who cares",
    correct: "initialization",
  },
  {
    question: "whats time complexity",
    option1: "Complex",
    option2: "Time",
    option3: "Complexity of Time",
    option4: "A method to calculate no of loops for code to run",
    correct: "Complex",
  },
  {
    question: "Who is your favorite?",
    option1: "Zeel",
    option2: "Prakash",
    option3: "Saahil",
    option4: "Dushyant",
    correct: "Zeel",
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
  let answerId = document.querySelector(`#${e.srcElement.id}`);
  let scoreElement = document.querySelector("#scorebox");
  if (answerKey === userAnswer.innerHTML) {
    userAnswer.style.backgroundColor = "rgb(76, 218, 76)";
    score = score + 1;
    scoreElement.innerHTML = `${score}`;
  } else {
    userAnswer.style.backgroundColor = "red";
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
