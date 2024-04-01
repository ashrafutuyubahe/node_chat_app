// client.js

const socket = io("http://localhost:5000");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("chat-container");

let userName = prompt("What is your name");

if (userName) {
  appendMessage("You joined");
  socket.emit("new-user", userName);

  socket.on("chat-message", (data) => {
    appendMessage(`${data.userName}: ${data.message}`);
  });

  socket.on("user-connected", (name) => {
    appendMessage(`${name} connected`);
  });

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(` you: ${message}`);

    socket.emit("send-chat-message", { message: message, userName: userName });
    messageInput.value = "";
  });
} else {
  alert("You must enter a username to join the chat.");
}

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
