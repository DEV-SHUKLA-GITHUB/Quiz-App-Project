let i = 0;
const questionBar = [
  {
    question: "Which film features a young wizard named Harry Potter",
    option1: "The Lord of the Rings",
    option2: "The Matrix",
    option3: "Harry Potter and the sorcerer's stone",
    option4: "Star wars: A New Hope",
    correct: "Harry Potter and the sorcerer's Stone",
  },
  {
    question: "In the movie Jurassic Park, what kind of creatures do the characters encounter?",
    option1: "Zombies",
    option2: "Aliens",
    option3: "Dinosaurs",
    option4: "Dragons",
    correct: "Dinosaurs",
  },
  {
    question: " In the movie The Matrix, what is Neo's real name?",
    option1: "Morpheus",
    option2: "Trinity",
    option3: "Neo",
    option4: "Agent Smith",
    correct: "Neo",
  },
  {
    question: "Who directed the movie The Shawshank Redemption?",
    option1: "Steven Spielberg",
    option2: "Quentin Tarantino",
    option3: "Frank Darabont",
    option4: "Christopher Nolan",
    correct: "Frank Darabont",
  },
  {
    question: " Who played the character of Tony Stark in the Iron Man movies?",
    option1: "Chris Hemsworth",
    option2: "Robert Downey Jr.",
    option3: "Chris Evans",
    option4: "Mark Ruffalo",
    correct: "Robert Downey Jr.",
  },
  {
    question: "Who played the character of Jack Dawson in the movie Titanic?",
    option1: "Leonardo DiCaprio",
    option2: "Tom Cruise",
    option3: "Brad Pitt",
    option4: "Johnny Depp",
    correct: "Leonardo DiCaprio",
  },
  {
    question: "Which film features a superhero with a suit that can shrink to the size of an ant?",
    option1: "Iron Man",
    option2: "Ant Man",
    option3: "Spider Man",
    option4: "Thor",
    correct: "Ant Man",
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
