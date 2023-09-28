export default function startWS() {
  document.getElementById("run").addEventListener("click", () => handleRun());
}

function handleRun() {
  const uploadedFileJSON = sessionStorage.getItem("uploadedFile");
  const data = JSON.parse(uploadedFileJSON);

  const socket = new WebSocket("ws://localhost:8081");
  logger("Trying to establish connection with the server");

  socket.addEventListener("open", (event) => {
    const log = document.querySelector("#log");
    const message = document.createElement("p");
    const d = new Date();
    const time = `[ ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ]`;
    message.textContent = time + ": Connection with the server is established";
    log.appendChild(message);
  });

  socket.onerror = function (event) {
    logger("Failed to establish connection with the server");
  };

  socket.onmessage = function (event) {
    console.log("Received data: " + event.data);
  };
}

function logger(msg) {
  const log = document.querySelector("#log");
  const message = document.createElement("p");
  const d = new Date();
  const time = `[ ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ]`;
  message.textContent = time + ": " + msg;
  log.appendChild(message);
}
