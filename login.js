function logFunction(x) {
  x.classList.toggle("in");
}
function goBack() {
  window.history.back();
}

// Login page

const signupBtn = document.getElementById("signup");
const signinBtn = document.getElementById("signin");
const main = document.getElementById("main");


signupBtn.addEventListener("click", () => {
  main.classList.add("right-panel-active");
});
signinBtn.addEventListener("click", () => {
  main.classList.remove("right-panel-active");
});
