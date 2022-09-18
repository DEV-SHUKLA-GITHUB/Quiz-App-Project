function refreshScore() {
  var first = document.querySelector("#first");
  var firstScore = document.querySelector("#firstScore");
  var second = document.querySelector("#second");
  var secondScore = document.querySelector("#secondScore");
  var third = document.querySelector("#third");
  var thirdScore = document.querySelector("#thirdScore");
  var fourth = document.querySelector("#fourth");
  var fourthScore = document.querySelector("#fourthScore");
  var fifth = document.querySelector("#fifth");
  var fifthScore = document.querySelector("#fifthScore");

  var docRef = db.collection("scores");
  docRef.onSnapshot((snapshot) => {
    // console.log(snapshot);
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push(doc.data());
    });
    console.log(items);
    first.innerHTML = items[0].name;
    firstScore.innerHTML = items[0].score;
    second.innerHTML = items[1].name;
    secondScore.innerHTML = items[1].score;
    third.innerHTML = items[2].name;
    thirdScore.innerHTML = items[2].score;
    fourth.innerHTML = items[3].name;
    fourthScore.innerHTML = items[3].score;
    fifth.innerHTML = items[4].name;
    fifthScore.innerHTML = items[4].score;

    console.log(items);
  });
}
refreshScore();
