let i = 0;
const questionBar = [
  {
    question: "Which of these is an indoor sport",
    option1: "cricket",
    option2: "basketball",
    option3: "chess",
    option4: "football",
    correct: "chess",
  },
  {
    question: "In which sport do players use a shuttlecock?",
    option1: "Table Tennis",
    option2: "Badminton",
    option3: "Volleyball",
    option4: "Cricket",
    correct: "Badminton",
  },
  {
    question: "What is the maximum number of players on a basketball court at one time for a team?",
    option1: "5",
    option2: "6",
    option3: "7",
    option4: "8",
    correct: "5",
  },
  {
    question: "What is the main object in the game of cricket that the bowler tries to hit?",
    option1: "Goal",
    option2: "Hoop",
    option3: "Wicket",
    option4: "Net",
    correct: "Wicket",
  },
  {
    question: "Hockey is the national sport of which country",
    option1: "China",
    option2: "Japan",
    option3: "Russia",
    option4: "India",
    correct: "India",
  },
  {
    question: "What is the object of the game in the sport of archery?",
    option1: "Score goals",
    option2: "Knock down pins",
    option3: "Hit a target with arrows",
    option4: "cross the finish line",
    correct: "Hit a target with arrows",
  },
  {
    question: "which sport is played with Bowlers, batters, fielders and wicketkeepers?",
    option1: "Hockey",
    option2: "Baseball",
    option3: "Soccer",
    option4: "Cricket",
    correct: "Cricket",
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
