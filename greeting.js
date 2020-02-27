const form= document.querySelector(".js-form"), input=form.querySelector("input"),
greeting=document.querySelector(".js-greetings");
logout=document.querySelector(".js-logout");
const USER_LS="currentUser", SHOWING_CN="showing";

function saveName(text){
  localStorage.setItem(USER_LS,text);
}
function logout(){

}
function handleSubmit(event){
  event.preventDefault();
  const currentValue=input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
  logout.classList.add(SHOWING_CN);
}

function askForName(){
  form.classList.add(SHOWING_CN);
  form.addEventListener('submit', handleSubmit);
}

function paintGreeting(text){
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerHTML=`Hello ${text}`;
}
function loadname(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser===null){
    askForName();
  }else{
    paintGreeting(currentUser);
    logout.classList.add(SHOWING_CN);
  }
}

function init(){
  loadname();
}

init();
