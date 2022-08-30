// Задание 2.
// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 
// Удачи!

const wsUri = "wss://echo-ws-service.herokuapp.com";

function pageLoaded () {
  const socketStatus = document.querySelector('.socketStatus');
  const chatField = document.querySelector('.chatField');
  const inputField = document.querySelector('input');
  const sendBtn = document.querySelector('.sendButton');
  const geoBtn = document.querySelector('.geoButton');

  let socket = new WebSocket(wsUri);

  socket.onopen = () => {
    socketStatus.innerText = "Соединение установлено";
  }

  socket.onerror = () => {
    socketStatus.innerText = "При передаче данных произошла ошибка";
  }

  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  }

  socket.onclose = () => {
    socketStatus.innerText = "Соединение заакрыто... Обновите страницу.";
  }

  sendBtn.addEventListener('click', sendMessage);

  function sendMessage() {
    if (!inputField.value) {return;}
    else {
    socket.send(inputField.value);
    writeToChat(inputField.value, false);
    inputField.value = "";
  }}
  
  function writeToChat(message, isRecieved) {
    let newMessage = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    chatField.innerHTML += newMessage;
    chatField.scrollTop = chatField.scrollHeight;  
  }

geoBtn.addEventListener('click', sendLocation);

function sendLocation() {

  if ("geolocation" in navigator) {
    let locationOptions = {
      enableHighAccuracy: true
    };

    navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
  } else {
    chatField.innerHTML += `<div class="sent">"Ваш браузер не поддерживает функцию определения местоположения"</div>`;
    chatField.scrollTop = chatField.scrollHeight;  
  }


function locationSuccess(data) { 
  chatField.innerHTML += `<div class="sent"> <a href='https://www.openstreetmap.org/?mlat=${data.coords.latitude}&mlon=${data.coords.longitude}#map=13/${data.coords.latitude}/${data.coords.longitude}' target="_blank"><b>гео-локация<b></a></div>`;
  chatField.scrollTop = chatField.scrollHeight;  
  }

function locationError() {
  chatField.innerHTML += `<div class="sent">"При получении местоположения произошла ошибка"</div>`;
  chatField.scrollTop = chatField.scrollHeight;  
  }

}

}

document.addEventListener("DOMContentLoaded", pageLoaded);