import log from "./src/logger";

export default function startWS() {
  document.getElementById("run").addEventListener("click", () => handleRun());
}

function handleRun() {
  const uploadedFileJSON = sessionStorage.getItem("uploadedFile");
  sessionStorage.removeItem("downloadFile");

  const socket = new WebSocket("ws://localhost:8081");
  log("Trying to establish connection with the server");

  socket.addEventListener("open", (event) => {
    log("Connection with the server is established");

    socket.send(
      JSON.stringify({
        eventName: "analyze",
        payload: uploadedFileJSON,
      })
    );
  });

  socket.onerror = function (event) {
    log("Failed to establish connection with the server");
  };

  socket.onmessage = function (event) {
    try {
      const results = JSON.parse(event.data).payload;
      sessionStorage.setItem("downloadFile", JSON.stringify(results));
      document.getElementById("btn-download").disabled = false;
      document.getElementById("btn-visualize-results").disabled = false;
      document.getElementById("btn-log-results").disabled = false;
      log("Received the results from the server");
    } catch (error) {
      console.log(event.data);
    }
  };
}
