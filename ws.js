export default function startWS() {
    const socket = new WebSocket("ws://localhost:8081");
  
    socket.addEventListener("open", (event) => {
      console.log("connected to ws server");
    });
  
    socket.onmessage = function (event) {
      console.log("Received data: " + event.data);
    };
  }