const loginPage = document.querySelector(".loginPage");
var closeBtn = loginPage.contentWindow.document.querySelector(".closeBtn");
const maincontainer = document.getElementsByClassName("home-container03")[0];
var logContainer = loginPage.contentWindow.document.querySelector("#main");

closeBtn.addEventListener("click", () => {
  maincontainer.classList.toggle("pupUp");
  logContainer.classList.remove("right-panel-active");
});

function toggleLogin() {
  logContainer.classList.remove("right-panel-active");
  maincontainer.classList.toggle("pupUp");
}

function toggleRegister() {
  logContainer.classList.add("right-panel-active");
  maincontainer.classList.toggle("pupUp");
}
