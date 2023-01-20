
const loginForm = document.querySelector("#loginForm");
const logIn = document.querySelector(".login-index");
const greeting = document.querySelector("#greeting");

const link = document.querySelector("a");
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function pageNext() {
    window.location.replace('home.html');
}

function handleLoginBtn(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const userName = logIn.value;
    localStorage.setItem(USERNAME_KEY, userName);
    paintGreetings(userName);
}

function paintGreetings(userName) {
  greeting.innerText = `${userName}🤘`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", handleLoginBtn);
} else {
    paintGreetings(savedUserName);
}

function pagePrev() {
    localStorage.clear();
    window.location.replace('index.html');
}

