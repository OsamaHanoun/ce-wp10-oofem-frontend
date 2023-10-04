export default function startWS() {
  document.getElementById("run").addEventListener("click", () => handleRun());
}

function handleRun() {
  const uploadedFileJSON = sessionStorage.getItem("uploadedFile");
  sessionStorage.removeItem("downloadFile");

  const socket = new WebSocket("ws://localhost:8081");
  logger("Trying to establish connection with the server");

  socket.addEventListener("open", (event) => {
    const log = document.querySelector("#log");
    const message = document.createElement("p");
    const d = new Date();
    const time = `[ ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ]`;
    message.textContent = time + ": Connection with the server is established";
    log.appendChild(message);

    socket.send(
      JSON.stringify({
        eventName: "analyze",
        payload: uploadedFileJSON,
      })
    );
  });

  socket.onerror = function (event) {
    logger("Failed to establish connection with the server");
  };

  socket.onmessage = function (event) {
    try {
      const results = JSON.parse(event.data).payload;
      sessionStorage.setItem("downloadFile", JSON.stringify(results));
      document.getElementById("btn-download").disabled = false;
      document.getElementById("btn-visualize-results").disabled = false;
      document.getElementById("btn-log-results").disabled = false;
    } catch (error) {
      console.log(event.data);
    }
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
