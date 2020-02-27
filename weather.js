const weather = document.querySelector(".js-weather");

const COORDS = 'coords';
const API_KEY='4932d73befc2f5165e2155405c2f71dd';

function getWeather(lat,lng){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(resonse){
    return resonse.json();
  }).then(function(json){
    const temperature = json.main.temp;
    const place=json.name;
    weather.innerHTML=`${temperature}℃ @ ${place}`;
  });
}


function saveCoords(coordsObj){
  localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude=position.coords.latitude;
  const longitude=position.coords.longitude;
  const coordsObj={
    latitude:latitude,
    longitude:longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude,longitude);

}

function handleGeoError() {
  console.log(`cant access location`);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCoords();
  } else {
    const parseCoord=JSON.parse(loadedCords);
    getWeather(parseCoord.latitude,parseCoord.longitude);
  }
}

function init() {
  loadCoords();
}

init();
