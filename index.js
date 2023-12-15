function clickHandler(type) {
  console.log(type)
  localStorage.setItem("type" ,type)
  location.href = "./ready/ready.html";
}

